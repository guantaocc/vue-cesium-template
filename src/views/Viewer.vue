<template>
  <div class="cesium-container-wrapper">
    <div id="cesiumContainer" ref="viewer"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // 初始化 map
    new this.$mapCesium.Map(this.$refs.viewer, {});
  },
  beforeDestroy() {
    this.$mapCesium.Util.destroy();
  },
};
</script>
<style lang="less" scoped>
.cesium-container-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  #cesiumContainer {
    height: 100%;
  }
}
</style>
