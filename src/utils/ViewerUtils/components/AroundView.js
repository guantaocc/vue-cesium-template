/**
 * @description: 绕地旋转
 */
class AroundView {
  constructor(viewer, amount) {
    this._viewer = viewer;
    this._amount = amount;
  }

  // 绑定事件
  _bindEvent() {
    this._viewer.clock.onTick.addEventListener(this._aroundView, this);
  }

  // 解除绑定
  _unbindEvent() {
    // 解除 lookAt 的绑定
    this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    this._viewer.clock.onTick.removeEventListener(this._aroundView, this);
  }

  // 开始
  start() {
    this._viewer.clock.shouldAnimate = true;
    this._unbindEvent();
    this._bindEvent();
    return this;
  }

  // 停止
  stop() {
    this._unbindEvent();
    return this;
  }

  // 相机绕地旋转函数
  _aroundView() {
    let heading = this._viewer.camera.heading;
    let pitch = this._viewer.camera.pitch;
    let roll = this._viewer.camera.roll;

    heading += Cesium.Math.toRadians(this._amount);
    if (heading >= Math.PI * 2 || heading <= -Math.PI * 2) {
      heading = 0;
    }

    this._viewer.camera.setView({
      orientation: {
        heading: heading,
        pitch: pitch,
        roll: roll,
      },
    });
  }
}
