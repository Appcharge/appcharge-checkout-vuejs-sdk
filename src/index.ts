import Vue from 'vue';
import AppchargeCheckout from '../src/components/ui/AppchargeCheckout/index.vue';

const install = () => {
    Vue.component('AppchargeCheckout', AppchargeCheckout);
};

export default {
    install,
};