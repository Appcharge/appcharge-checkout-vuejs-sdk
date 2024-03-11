<template>
  <iframe
    :src="url"
    class="iframe"
    style="
      border: 0;
      width: 100vw;
      height: 100vh;
      height: 100svh;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9999;
    "
    title="checkout"
    allow="payment *"
    @load="handleLoad"
    ref="iframeRef"
  ></iframe>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { EFEEvent, EventParams, FEMessage } from "./types";

const sendIframeMessage = (
  iframe: HTMLIFrameElement,
  message: FEMessage
): void => {
  iframe.contentWindow?.postMessage(message, "*");
};

export default defineComponent({
  name: "AppchargeCheckout",
  props: {
    checkoutUrl: String,
    sessionToken: String,
    onClose: {
      type: Function,
      required: false,
    },
    onOpen: {
      type: Function,
      required: false,
    },
    onInitialLoad: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onOrderCreated: {
      type: Function as PropType<(params: Partial<EventParams>) => void>,
      required: false,
    },
    onPaymentIntentFailed: {
      type: Function as PropType<(params: Partial<EventParams>) => void>,
      required: false,
    },
    onPaymentIntentSuccess: {
      type: Function as PropType<(params: Partial<EventParams>) => void>,
      required: false,
    },
    onOrderCompletedFailed: {
      type: Function as PropType<(params: Partial<EventParams>) => void>,
      required: false,
    },
    onOrderCompletedSuccessfully: {
      type: Function as PropType<(params: Partial<EventParams>) => void>,
      required: false,
    },
  },
  data() {
    return {
      url: `${this.checkoutUrl}/${this.sessionToken}`,
    };
  },
  methods: {
    eventHandler(event: MessageEvent<FEMessage>): void {
      if (event.origin !== this.checkoutUrl) return;
      const { params, event: eventType } = event.data;
      switch (eventType) {
        case EFEEvent.ORDER_CREATED:
          this.onOrderCreated?.(params);
          break;
        case EFEEvent.ORDER_COMPLETED_FAILED:
          this.onOrderCompletedFailed?.(params);
          break;
        case EFEEvent.ORDER_COMPLETED_SUCCESS:
          this.onOrderCompletedSuccessfully?.(params);
          break;
        case EFEEvent.PAYMENT_INTENT_FAILED:
          this.onPaymentIntentFailed?.(params);
          break;
        case EFEEvent.PAYMENT_INTENT_SUCCESS:
          this.onPaymentIntentSuccess?.(params);
          break;
        case EFEEvent.CLOSE_CHECKOUT:
          this.onClose?.();
          break;
        case EFEEvent.CHECKOUT_OPENED:
          this.onOpen?.();
          break;
      }
    },
    handleLoad() {
      this.$refs.iframeRef &&
        sendIframeMessage(this.$refs.iframeRef as HTMLIFrameElement, {
          event: EFEEvent.APPCHARGE_THEME,
          params:
            localStorage.getItem("ac_co_theme") &&
            JSON.parse(localStorage.getItem("ac_co_theme") || "null"),
        });
      if (typeof this.onInitialLoad === "function") {
        this.onInitialLoad();
      }
    },
  },
  mounted() {
    this.url = `${this.checkoutUrl}/${this.sessionToken}`;
    window.addEventListener("message", this.eventHandler);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.eventHandler);
  },
});
</script>

<style lang="scss" scoped>
.iframe {
  border: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>
