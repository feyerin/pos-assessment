<script setup lang="ts">
import type { CartItem } from "../../types/cart"
import { useCartStore } from "../../stores/cart"
import { useFormatter } from "../../composables/useFormatter"

defineProps<{
  item: CartItem
}>()

const cart = useCartStore()

const { formatCurrency } = useFormatter()
</script>

<template>
  <div
    class="rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-sm"
  >
    <!-- Header -->
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0 flex-1">
        <h3 class="truncate text-sm font-semibold text-slate-900">
          {{ item.product.name }}
        </h3>

        <p class="mt-1 text-sm text-slate-500">
          {{ formatCurrency(item.product.price) }} / item
        </p>
      </div>

      <button
        @click="cart.remove(item.product.id)"
        class="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
      >
        ✕
      </button>
    </div>

    <!-- Footer -->
    <div class="mt-4 flex items-center justify-between">

      <!-- Quantity -->
      <div
        class="flex items-center rounded-lg border border-slate-200 bg-slate-50"
      >
        <button
          @click="cart.decrease(item.product.id)"
          class="flex h-9 w-9 items-center justify-center rounded-l-lg transition hover:bg-slate-200"
        >
          −
        </button>

        <span
          class="flex h-9 min-w-11 items-center justify-center text-sm font-semibold"
        >
          {{ item.quantity }}
        </span>

        <button
          @click="cart.increase(item.product.id)"
          :disabled="item.quantity >= item.product.stock"
          class="flex h-9 w-9 items-center justify-center rounded-r-lg transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>

      <!-- Subtotal -->
      <div class="text-right">
        <p class="text-xs text-slate-500">
          Subtotal
        </p>

        <p class="font-semibold text-slate-900">
          {{ formatCurrency(item.product.price * item.quantity) }}
        </p>
      </div>

    </div>
  </div>
</template>