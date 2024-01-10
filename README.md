# appcharge-checkout-vuejs-sdk

Welcome to Appcharge's Checkout Solution, run it in a few easy steps

## Getting Started

1. Install it as dependency in your project.

   ```bash
   # NPM
   npm install appcharge-checkout-vuejs-sdk
   ```

2. Import and use components.

   Use static import for components without expensive third-party libraries.

   ```html
   <!-- Component.vue -->
   <template>
     <AppchargeCheckout 
        :domain="domain"
        :sessionToken="sessionToken"
        :onInitialLoad="onOrderCreated"
     />
   </template>

   <script lang="ts">
     import { AppchargeCheckout } from 'appcharge-checkout-vuejs-sdk';
   </script>
   ```
