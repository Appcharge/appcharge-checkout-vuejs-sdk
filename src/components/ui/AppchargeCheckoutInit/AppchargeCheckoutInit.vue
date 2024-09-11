<template>
  <iframe
    :src="`https://checkout-v2${$data.env}.appcharge.com/handshake?checkout-token=${$props.checkoutToken}`"
    class="iframe-transparent"
    title="checkout-transparent"
    style="
      width: 0px;
      height: 0px;
      visibility: hidden;
      position: absolute;
      top: -9999px;
      left: -9999px;
    "
  ></iframe>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppchargeCheckoutInit",
  props: {
    domain: {
      type: String,
      default: window.location.host,
    },
    environment: {
      type: String,
      default: "sandbox",
    },
    checkoutToken: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      env: this.environment === "prod" ? "" : `-${this.environment}`,
    };
  },
  created() {
    if (!this.checkoutToken) {
      throw Error(
        "checkoutToken prop is missing in AppchargeCheckoutInit component"
      );
    }
  },
});
</script>
