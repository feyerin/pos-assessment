<script setup lang="ts">
import { storeToRefs } from "pinia"

import {
  ShoppingBag,
  ShoppingCart,
  ReceiptText,
  CreditCard,
  CircleCheckBig,
} from "lucide-vue-next"

import CartItem from "./cartItem.vue"
import LoadingButton from "../ui/loadingButton.vue"

import { useCartStore } from "../../stores/cart"
import { useCheckoutStore } from "../../stores/checkout"
import { useFormatter } from "../../composables/useFormatter"
import { useToastStore } from "../../stores/toast.ts"

const cart = useCartStore()
const checkout = useCheckoutStore()

const { formatCurrency } = useFormatter()
const toast = useToastStore()

const {
  items,
  total,
  totalItems,
} = storeToRefs(cart)

const {
  loading,
  receipt,
  error,
} = storeToRefs(checkout)

const handleCheckout = async () => {
  const result = await checkout.processCheckout({
    items: cart.items,
    total: cart.total,
  })

  if (result.ok) {
    toast.success("Checkout success")
    cart.clear()
  } else {
    toast.error(result.message || error.value || "Checkout failed")
  }
}
</script>

<template>
  <aside class="sticky top-6 overflow-hidden rounded-[30px] bg-white shadow-xl ring-1 ring-slate-200">

    <div class="border-b border-slate-100 p-6">
      <div class="flex items-center justify-between">

        <div class="flex items-center gap-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
            <ShoppingBag :size="22" class="text-blue-600" />
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-800">
              Current Order
            </h2>
            <p class="text-sm text-slate-400">
              Active Transaction
            </p>
          </div>
        </div>

        <div class="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          {{ totalItems }}
        </div>

      </div>
    </div>

    <div
      v-if="receipt"
      class="flex flex-col items-center justify-center px-8 py-24"
    >
      <div class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
        <CircleCheckBig :size="48" class="text-green-600" />
      </div>

      <h2 class="text-xl font-bold text-slate-800">
        Payment Successful
      </h2>

      <p class="mt-2 text-center text-slate-500">
        Preparing next transaction...
      </p>
    </div>

    <div
      v-else-if="!items.length"
      class="flex flex-col items-center justify-center px-8 py-20"
    >
      <div class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
        <ShoppingCart :size="40" class="text-slate-400" />
      </div>

      <h3 class="text-lg font-semibold text-slate-700">
        Cart is Empty
      </h3>

      <p class="mt-2 text-center text-sm text-slate-400">
        Select products to start an order.
      </p>
    </div>

    <div
      v-else
      class="max-h-130 space-y-4 overflow-y-auto p-6"
    >
      <CartItem
        v-for="item in items"
        :key="item.product.id"
        :item="item"
      />
    </div>

    <div
      v-if="items.length && !receipt"
      class="border-t border-slate-100 bg-slate-50 p-6"
    >

      <div class="space-y-4">

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <ReceiptText :size="18" class="text-slate-400" />
            <span class="text-sm text-slate-500">Items</span>
          </div>
          <span class="font-semibold">{{ totalItems }}</span>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <ReceiptText :size="18" class="text-slate-400" />
            <span class="text-sm text-slate-500">Subtotal</span>
          </div>
          <span class="font-semibold">{{ formatCurrency(total) }}</span>
        </div>

        <div class="border-t border-dashed pt-4">
          <div class="flex items-center justify-between">
            <span class="text-lg font-semibold text-slate-800">
              Total
            </span>
            <span class="text-2xl font-bold text-blue-600">
              {{ formatCurrency(total) }}
            </span>
          </div>
        </div>

      </div>

      <LoadingButton
        variant="primary"
        :loading="loading"
        :disabled="!items.length || loading"
        class="mt-6 h-14 w-full rounded-2xl text-base font-semibold transition hover:scale-[1.02] hover:shadow-lg active:scale-100"
        @click="handleCheckout"
      >
        <div class="flex items-center justify-center gap-2">
          <CreditCard :size="20" />
          <span>Checkout</span>
        </div>
      </LoadingButton>

    </div>

  </aside>
</template>