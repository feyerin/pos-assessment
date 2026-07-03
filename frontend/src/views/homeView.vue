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
    <main class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">

      <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">

        <!-- Left Content -->
        <section class="md:col-span-7 lg:col-span-8">

          <HeaderBar />

          <div class="mb-6">
            <SearchBar v-model="productStore.search" />
          </div>

          <div>
            <div
              class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 class="text-2xl font-bold text-slate-800">
                  Categories
                </h2>
              </div>
            </div>
            
            <CategoryList />

          </div>

          <div class="mt-6">
            <ProductGrid />
          </div>

        </section>

        <!-- Cart -->
        <aside class="md:col-span-5 lg:col-span-4">
            <div class="lg:sticky lg:top-6">
            <CartSidebar />
          </div>
        </aside>

      </div>

    </main>
  </div>
</template>