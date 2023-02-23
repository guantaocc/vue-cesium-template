import { mergeViewerOptions } from "./config";

/**
 * 业务中只创建一个的地图实例，为了操作方便
 */
export class Map {
  static instance = null;
  constructor(element, mapOptions) {
    if (Map.instance) {
      return Map.instance;
    }
    this._element = element;
    this._options = mapOptions;
    this._viewer = null;

    // 底图layers
    this._layers = [];

    // 存储超图 倾斜影像图层
    this._superMapQXLayers = [];

    // 存储高分影像的图层
    this._highRatioLayers = [];

    // dataSource GeoJson图源
    this._dateSources = [];

    // 信息所图书馆地图点位
    this._XinXiSuoCollection = [];

    // 初始化三方插件
    this.initPlugins = [];

    this.initViewer();
    Map.instance = this;
  }

  get layers() {
    return this._layers;
  }

  get viewer() {
    return this._viewer;
  }

  addLayer(layer) {
    this._layers.push(layer);
  }

  destroy() {
    this._viewer && this._viewer.destroy();
    this._viewer = null;
  }

  initViewer() {
    this._viewer = new Cesium.Viewer(this._element, this._options);
    this._viewer.cesiumWidget.creditContainer.style.display = "none";
    this.flyHomeView();
  }

  // 基础目标区域
  flyHomeView() {
    this._viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        113.2609138954192,
        35.190953503678095,
        8000.0
      ),
      //设置相机朝向：俯仰角、倾角
      orientation: {
        heading: Cesium.Math.toRadians(350),
        pitch: Cesium.Math.toRadians(-50),
        roll: 0.0,
      },
    });
  }

  // 添加entity colleaction
  addEntityCollection(collection) {
    this._viewer.entities.add(collection);
  }

  initPlugins() {}
}

export function createMap(el, options = {}) {
  const map = new Map(el, mergeViewerOptions(options));
  window.__CesiumMap__ = map;
  return map;
}

// 获取单例
export function getSingleMapInstance() {
  if (Map.instance) return Map.instance;
  return null;
}

export function destroyMap() {
  if (getSingleMapInstance()) {
    Map.instance.destroy();
    Map.instance = null;
  } else {
    console.warn(`you must create map instance before call destory`);
  }
}
