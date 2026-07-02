<script setup lang="ts">
import { onMounted } from "vue"

import { useProductStore } from "../stores/product.ts"

import HeaderBar from "../components/layout/headerBar.vue"
import CategoryList from "../components/product/categoryList.vue"
import SearchBar from "../components/layout/searchBar.vue"
import ProductGrid from "../components/product/productGrid.vue"
import CartSidebar from "../components/cart/cartSidebar.vue"

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})

</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <main class="mx-auto max-w-7xl p-6">

      <HeaderBar />

      <CategoryList />

      <div class="my-8">
        <SearchBar v-model="productStore.search" />
      </div>

      <div class="grid gap-6 lg:grid-cols-12">

        <section class="lg:col-span-8 xl:col-span-8">
          <ProductGrid />
        </section>

        <aside class="lg:col-span-4 xl:col-span-4">
          <div class="sticky top-6">
            <CartSidebar />
          </div>
        </aside>

      </div>

    </main>
  </div>

</template>