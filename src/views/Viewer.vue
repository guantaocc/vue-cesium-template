<template>
  <div class="cesium-container-wrapper">
    <div id="cesiumContainer" ref="viewer"></div>
    <slot></slot>
  </div>
</template>

<script>
import {
  createMap,
  destoryMap,
  createTiandituImageryProvider,
  tiandituToken,
} from "@/utils/ViewerUtils";
export default {
  data() {
    return {};
  },
  mounted() {
    // 初始化 map
    let refEl = this.$refs.viewer;
    createMap(refEl, {
      imageryProvider: createTiandituImageryProvider(tiandituToken),
      debugShowFramesPerSecond: true,
    });
  },
  beforeDestroy() {
    destoryMap();
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
