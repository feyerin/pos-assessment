<script setup lang="ts">
import ToastContainer from "./components/ui/toastContainer.vue"
import ReceiptModal from "./components/cart/receiptModal.vue"

</script>

<template>
  <ToastContainer />
  <router-view />
  <ReceiptModal />
</template>