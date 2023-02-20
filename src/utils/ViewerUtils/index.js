// 全局变量存储地图的操作，变量等
const Cesium = window.Cesium;

/**
 * 全局实例化后的 instance
 * 只有单个地图可以操作，为了方便操作地图实例
 */
let MapInstance = null;

class Camera {
  constructor(viewer) {
    this._viewer = viewer;
  }
  // 设置视点
  setView(position) {}
  // 获取 地图当前视角 经纬度，海拔，中心点
  getView() {}
}

// 弹窗管理类
class PopupManager {
  constructor(el, options) {}
}

// 图层管理类
class LayerManager {}

// map地图类
class Map {
  constructor(element, mapOptions) {
    this._element = element;
    this._options = mapOptions;
    this._viewer = null;
    this.initViewer();
    // 初始化弹窗
    this._popup = new PopupManager(this._viewer);
    // 相机管理
    this._camera = new Camera(this._viewer);

    // 全局的地图实例
    MapInstance = this;
  }

  get camera() {
    return this._camera;
  }
  get viewer() {
    return this._viewer;
  }

  destroy() {
    this._viewer && this._viewer.destroy();
    this._viewer = null;
  }

  closePopup() {}

  initViewer() {
    this._viewer = new Cesium.Viewer(this._element, this._options);
  }
  openPopup(position, content, options) {}
}

class Util {
  static fetchJson(options) {
    let url = options.url;
    return fetch(url).then((res) => res.json());
  }
  static destroy() {
    MapInstance && MapInstance.destroy();
  }
}

export { Map, Util };

export default {
  Map,
  Util,
};
