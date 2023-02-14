import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import StaticCesiumUtil from "@/utils/ViewerUtils";

Vue.config.productionTip = false;
// 绑定viewer工具类
Vue.prototype.$cesium = new StaticCesiumUtil();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
