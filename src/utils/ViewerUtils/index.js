// 全局变量存储地图的操作，变量等
const Cesium = window.Cesium;

class StaticCesiumUtil {
  constructor() {
    this.el = null;
    this.viewer = null;
    this.Cesium = Cesium;
  }
  initViewer(el) {
    this.el = el;
  }
}

export default StaticCesiumUtil;
