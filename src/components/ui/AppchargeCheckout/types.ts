export interface Product {
    name: string;
    sku: string;
    amount: string | number;
}

export interface EventParams {
    orderId: string;
    orderExternalId: string;
    date: string;
    sessionId: string;
    purchaseInvoiceId: string;
    appChargePaymentId: string;
    bundleName: string;
    bundleId: string;
    bundleSKU: string;
    products: Product[];
    totalSum: number;
    totalSumCurrency: string;
    paymentMethodName: string;
    userId?: string;
    userCountry?: string;
    reason?: string;
}

export enum EFEEvent {
    ORDER_CREATED = 'appcharge_order_created',
    PAYMENT_INTENT_SUCCESS = 'appcharge_payment_intent_success',
    PAYMENT_INTENT_FAILED = 'appcharge_payment_intent_failed',
    ORDER_COMPLETED_SUCCESS = 'appcharge_order_completed_success',
    ORDER_COMPLETED_FAILED = 'appcharge_order_completed_failed',
    CLOSE_CHECKOUT = 'appcharge_close_checkout',
    CHECKOUT_OPENED = 'appcharge_checkout_opened',
}

export interface FEMessage {
    event: EFEEvent;
    params: any;
}