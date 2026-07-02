<script setup lang="ts">
import { computed } from "vue"

import {
  UtensilsCrossed,
  Beef,
  CupSoda,
  CakeSlice,
  Pizza,
  Coffee
} from "lucide-vue-next"

import { useProductStore } from "../../stores/product"
import CategoryCard from "./categoryCard.vue"

const productStore = useProductStore()

const categories = computed(() => [
  {
    key: "all",
    title: "All Menu",
    total: productStore.products.length,
    icon: UtensilsCrossed,
  },
  {
    key: "food",
    title: "Food",
    total: productStore.products.filter(
      (p) => p.category === "food"
    ).length,
    icon: Beef,
  },
  {
    key: "drink",
    title: "Drinks",
    total: productStore.products.filter(
      (p) => p.category === "drink"
    ).length,
    icon: CupSoda,
  },
  {
    key: "dessert",
    title: "Dessert",
    total: productStore.products.filter(
      (p) => p.category === "dessert"
    ).length,
    icon: CakeSlice,
  },
  {
    key: "pizza",
    title: "Pizza",
    total: productStore.products.filter(
      (p) => p.category === "pizza"
    ).length,
    icon: Pizza,
  },
  {
    key: "coffee",
    title: "Coffee",
    total: productStore.products.filter(
      (p) => p.category === "coffee"
    ).length,
    icon: Coffee,
  },
])
</script>

<template>
  <section class="mb-8">

    <div class="mb-5 flex items-center justify-between">

      <div>
        <h2 class="text-2xl font-bold text-slate-800">
          Categories
        </h2>

        <p class="text-sm text-slate-500">
          Browse menu by category
        </p>
      </div>

    </div>

    <div
      class="flex gap-4 overflow-x-auto pb-3 scrollbar-hide"
    >
      <button
        v-for="category in categories"
        :key="category.key"
        type="button"
        @click="productStore.category = category.key"
        class="min-w-60 text-left"
      >
        <CategoryCard
          :title="category.title"
          :total="category.total"
          :icon="category.icon"
          :active="productStore.category === category.key"
        />
      </button>
    </div>

  </section>
</template>