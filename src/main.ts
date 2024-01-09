import Vue from "vue";
import AppchargeCheckout from "./components/ui/AppchargeCheckout/AppchargeCheckout.vue";

const install = () => {
  Vue.component("AppchargeCheckout", AppchargeCheckout);
};

export default {
  install,
};
