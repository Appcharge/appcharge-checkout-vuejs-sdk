<template>
  <iframe
    :src="`https://checkout-v2${$data.env}.appcharge.com/handshake`"
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
  },
  data() {
    return {
      env: this.environment === "prod" ? "" : `-${this.environment}`,
    };
  },
  mounted() {
    this.fetchAppchargeData();
  },
  methods: {
    fetchAppchargeData() {
      const apiUrl = `https://api${this.env}.appcharge.com/checkout/v1/${this.domain}/boot`;

      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem(
            "ac_co_theme",
            JSON.stringify({ theme: data?.theme, pks: data?.pks })
          );
        })
        .catch((err) => {
          localStorage.removeItem("ac_co_theme");
        });
    },
  },
  watch: {
    domain: "fetchAppchargeData",
    env: "fetchAppchargeData",
  },
});
</script>
