<script setup lang="ts">
import type { Component } from "vue"

defineProps<{
  title: string
  total: number
  icon: Component
  active?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'group flex items-center gap-4 rounded-[28px] border p-5 transition-all duration-300',
      active
        ? 'border-blue-500 bg-slate-50 shadow-md'
        : 'border-transparent bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg'
    ]"
  >
    <!-- Icon -->
    <div
      :class="[
        'flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl transition',
        active
          ? 'bg-blue-600 text-white'
          : 'bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-600'
      ]"
    >
      <component
        :is="icon"
        :size="30"
      />
    </div>

    <!-- Content -->
    <div class="flex flex-1 items-center justify-between">

      <div>
        <h3 class="text-lg font-bold text-slate-800">
          {{ title }}
        </h3>

        <p class="mt-1 text-sm text-slate-400">
          {{ total }} Items
        </p>
      </div>

      <!-- Indicator -->
      <div
        v-if="active"
        class="h-3 w-3 rounded-full bg-blue-500"
      />
    </div>

  </div>
</template>