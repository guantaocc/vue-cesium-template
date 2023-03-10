import { mergeOptions } from "./utils";

export const baseViewerOptions = {
  // 显示地名查找控件
  animation: false, //是否创建动画小器件，左下角仪表
  baseLayerPicker: false, //是否显示图层选择器
  fullscreenButton: false, //是否显示全屏按钮
  geocoder: false, //是否显示geocoder小器件，右上角查询按钮
  homeButton: false, //是否显示Home按钮
  infoBox: false, //是否显示信息框
  sceneModePicker: false, //是否显示3D/2D选择器
  selectionIndicator: false, //是否显示选取指示器组件
  timeline: false, //是否显示时间轴
  navigationHelpButton: false, //是否显示右上角的帮助按钮
  scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
};

export function mergeViewerOptions(options) {
  return mergeOptions(baseViewerOptions, options);
}

export const tiandituToken = "825fe12904c410012af61f3da2784af1";
