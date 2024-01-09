<template>
  <iframe
      :src="url"
      class="iframe"
      title="checkout"
      allow="payment *"
      @load="onInitialLoad"
  ></iframe>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {EFEEvent, EventParams, FEMessage} from './types';

export default Vue.extend({
  props: {
    domain: String,
    sessionToken: String,
    onClose: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onOpen: {
      type: Function as PropType<() => void>,
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
      url: `${this.domain}/${this.sessionToken}`,
    };
  },
  methods: {
    eventHandler(event: MessageEvent<FEMessage>): void {
      if (event.origin !== this.domain) return;
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
  },
  mounted() {
    this.url = `${this.domain}/${this.sessionToken}`;
    window.addEventListener('message', this.eventHandler);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.eventHandler);
  },
});
</script>

<style lang="scss" scoped>
@import "./styles.scss";
</style>
