import { getSingleMapInstance } from "./Map";

export function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export function mergeOptions(defaultOptions, options) {
  function deep(value, newValue) {
    const tmpObj = {};
    for (let key in value) {
      tmpObj[key] = value[key];
      for (let newKey in newValue) {
        if (key === newKey) {
          if (isPlainObject(value[key]) && isPlainObject(value[newKey])) {
            tmpObj[key] = deep(value[key], newValue[key]);
          }
        } else {
          tmpObj[newKey] = newValue[newKey];
        }
      }
    }
    return tmpObj;
  }
  return deep(defaultOptions, options);
}

// 创建天地图图层
export function createTiandituImageryProvider(token) {
  return new Cesium.WebMapTileServiceImageryProvider({
    url: `http://t0.tianditu.gov.cn/img_w/wmts?tk=${token}`,
    layer: "img",
    style: "default",
    tileMatrixSetID: "w",
    format: "tiles",
    maximumLevel: 18,
  });
}

// 创建天地图文字图层
export function createTiandituChineseProvider(url, token) {
  return new Cesium.WebMapTileServiceImageryProvider({
    // url: "http://t0.tianditu.gov.cn/img_w/wmts?tk=825fe12904c410012af61f3da2784af1",
    url: url,
    layer: "img",
    style: "default",
    tileMatrixSetID: "w",
    format: "tiles",
    maximumLevel: 18,
  });
}

// 向viewer中增加一个图层
export function addMapLayer(layer) {
  const instance = getSingleMapInstance();
  instance.addMapLayer(layer);
}

/**
 * 创建单个 Entity POI 信息点实例
 */
export function createSingleEntityPOI(POI) {
  // 判断 POI 等级
  const imgUrl = "greenMarker";
  const { lon, lat, name } = POI;
  if (!lon || !lat) {
    throw new Error(`点位必须拥有lon,lat属性`);
  }
  const entity = new Cesium.Entity({
    // 世界坐标
    position: Cesium.Cartesian3.fromDegress(lon, lat, 0.0),
    billboard: {
      image: require("../../../public/static/imgs/home/" +
        `${imgUrl}` +
        ".png"),
      width: 24,
      height: 24,
    },
    label: {
      text: name,
      font: "12px Helvetica",
      fillColor: Cesium.Color.DEEPSKYBLUE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      pixelOffset: new Cesium.Cartesian2(15, 5),
    },
    show: false, //是否显示实体
  });
  return entity;
}

/**
 * 相机飞到指定位置
 */
export function makeCameraFlyTo(lon, lat, height = 1500) {
  getSingleMapInstance()._viewer.scene.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
  });
}

/**
 * 相机飞到点位
 * @param {WGS84世界坐标} positionWGS84
 */
export function moveCameraToPosition(positionWGS84, viewer) {
  let cartographic =
    viewer.scene.globe.ellipsoid.cartesianToCartographic(positionWGS84);

  let lat = Cesium.Math.toDegrees(cartographic.latitude);
  let lng = Cesium.Math.toDegrees(cartographic.longitude);
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      Number(lng.toString().match(/^\d+(?:\.\d{0,4})?/)),
      Number(lat.toString().match(/^\d+(?:\.\d{0,4})?/)),
      8000.0
    ),
  });
}

// 相机飞到entity的中心点位

export function moveCameraToBillbardCenter(billboard, viewer) {
  const billboardPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
    viewer.scene,
    billboard.position
  );
  const canvas = viewer.canvas;
  const camera = viewer.camera;
  const xOffset = canvas.clientWidth / 2 - billboardPosition.x;
  const yOffset = canvas.clientHeight / 2 - billboardPosition.y;
  // 获取当前相机的位置、朝向和上方向
  let cameraPosition = camera.position.clone();
  let cameraDirection = camera.direction.clone();
  let cameraUp = camera.up.clone();

  camera.lookAt(billboard.position);

  // 向屏幕中心偏移相机位置
  const offsetVector = cameraDirection
    .multiplyByScalar(-xOffset)
    .add(cameraUp.multiplyByScalar(-yOffset));

  cameraPosition = cameraPosition.add(offsetVector);
  camera.position = cameraPosition;

  // 将相机的朝向和上方向还原为原始值
  camera.direction = cameraDirection;
  camera.up = cameraUp;
}

/**
 * 监控地图信息
 */
export function monitorCameraPos(viewer) {
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction(function (event) {
    let viewRectangle = viewer.camera.computeViewRectangle();
    console.log(viewRectangle);
    computedTilesLevel(viewRectangle);
  }, Cesium.ScreenSpaceEventType.WHEEL);
}

/**
 * 计算底图 tiles层级
 */
export function computedTilesLevel(Rectangle) {}

/**
 * 控制点位显示和隐藏
 */
export function setPOIVisible(points, visible = true) {
  let len = points.length - 1;
  while (len >= 0) {
    points[len--]._show = visible;
  }
}

/**
 * 为信息点添加鼠标点击事件
 * 批量添加
 * 单个添加
 */

export function addMouseClickEntityPOI(callback) {
  const viewer = getSingleMapInstance()._viewer;
  const canvas = viewer.scene.canvas;
  const handler = new Cesium.ScreenSpaceEventHandler(canvas);
  handler.setInputAction(function (click) {
    // TODO: 隐藏已经显示的 Pover
    const pickedFeature = viewer.scene.pick(click.position);
    if (!Cesium.defined(pickedFeature)) {
      return false;
    }
    if (callback && typeof callback === "function") {
      callback(pickedFeature);
    }
    // move camera position
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
