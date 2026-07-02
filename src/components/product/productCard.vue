<script setup lang="ts">
import type { Product } from "../../types/product"

import { ShoppingCart, Heart, Package } from "lucide-vue-next"

import { useCartStore } from "../../stores/cart"
import { useFormatter } from "../../composables/useFormatter"

defineProps<{
  product: Product
}>()

const cart = useCartStore()
const { formatCurrency } = useFormatter()
</script>

<template>
  <div
    class="group overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    <!-- IMAGE -->
    <div class="relative h-56 overflow-hidden">

      <img
        :src="product.image"
        :alt="product.name"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-110"
      >

      <!-- Favorite -->

      <button
        class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-md transition hover:scale-110"
      >
        <Heart
          :size="18"
          class="text-slate-500"
        />
      </button>

      <!-- Stock -->

      <div
        class="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold"
        :class="
          product.stock > 0
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-red-100 text-red-700'
        "
      >
        {{ product.stock > 0 ? `${product.stock} Left` : "Sold Out" }}
      </div>

    </div>

    <!-- CONTENT -->

    <div class="p-5">

      <!-- Category -->

      <div class="mb-2 flex items-center gap-2">

        <Package
          :size="14"
          class="text-slate-400"
        />

        <span class="text-xs uppercase tracking-wide text-slate-400">
          {{ product.category }}
        </span>

      </div>

      <!-- Name -->

      <h2 class="line-clamp-2 text-lg font-bold text-slate-800">
        {{ product.name }}
      </h2>

      <!-- Footer -->

      <div class="mt-6 flex items-center justify-between">

        <div>

          <p class="text-xs text-slate-400">
            Price
          </p>

          <h3 class="text-2xl font-bold text-blue-600">
            {{ formatCurrency(product.price) }}
          </h3>

        </div>

        <button
          @click="cart.addToCart(product)"
          :disabled="product.stock === 0"
          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg transition hover:scale-105 hover:bg-blue-700 disabled:bg-slate-300 disabled:shadow-none"
        >
          <ShoppingCart :size="22" />
        </button>

      </div>

    </div>

  </div>
</template>