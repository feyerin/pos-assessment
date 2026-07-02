<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useProductStore } from "../../stores/product.ts"

import ProductCard from "./productCard.vue"

const store = useProductStore()

const {
  filteredProducts,
  loading,
  error,
} = storeToRefs(store)
</script>

<template>
  <div
    v-if="loading"
    class="text-center py-10"
  >
    Loading...
  </div>

  <div
    v-else-if="error"
    class="text-red-500"
  >
    {{ error }}
  </div>

  <div
    v-else
    class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
  >
    <ProductCard
      v-for="product in filteredProducts"
      :key="product.id"
      :product="product"
    />
  </div>
</template>