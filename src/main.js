import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as mapCesium from "@/utils/ViewerUtils";

Vue.config.productionTip = false;
// 绑定viewer工具类
Vue.prototype.$mapCesium = mapCesium;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
