<template>
  <div class="layer-controllers"></div>
</template>

<script>
export default {
  inject: ["map"],
  mounted() {
    console.log("map", this.map);
  },
};
</script>

<style lang="scss" scoped></style>
