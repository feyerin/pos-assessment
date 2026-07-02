<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

import {
  CalendarDays,
  Clock3,
  ShoppingBag,
  UserRound
} from "lucide-vue-next"

const currentDate = ref("")
const currentTime = ref("")

let timer: number

const updateClock = () => {
  const now = new Date()

  currentDate.value = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  currentTime.value = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

onMounted(() => {
  updateClock()
  timer = window.setInterval(updateClock, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <header class="mb-8">
    <div class="flex flex-wrap items-center justify-between gap-5">

      <!-- LEFT -->
      <div class="flex flex-wrap items-center gap-4">

        <!-- Date -->
        <div
          class="flex items-center gap-4 rounded-3xl bg-white px-6 py-4 shadow-sm"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100"
          >
            <CalendarDays
              :size="22"
              class="text-blue-600"
            />
          </div>

          <div>
            <p class="text-sm text-slate-400">
              Today
            </p>

            <h2 class="font-semibold text-slate-800">
              {{ currentDate }}
            </h2>
          </div>
        </div>

        <!-- Time -->
        <div
          class="flex items-center gap-4 rounded-3xl bg-white px-6 py-4 shadow-sm"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100"
          >
            <Clock3
              :size="22"
              class="text-orange-500"
            />
          </div>

          <div>
            <p class="text-sm text-slate-400">
              Current Time
            </p>

            <h2 class="text-xl font-bold text-slate-800">
              {{ currentTime }}
            </h2>
          </div>
        </div>

      </div>

      <!-- RIGHT -->
      <div class="flex items-center gap-4">

        <!-- Status -->
        <div
          class="flex items-center gap-3 rounded-full bg-emerald-50 px-5 py-3"
        >
          <ShoppingBag
            :size="18"
            class="text-emerald-600"
          />

          <span class="font-medium text-emerald-700">
            Open Order
          </span>
        </div>

        <!-- Cashier -->
        <div
          class="flex items-center gap-3 rounded-3xl bg-white px-4 py-3 shadow-sm"
        >
          <div
            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100"
          >
            <UserRound
              :size="20"
              class="text-blue-600"
            />
          </div>

          <div>
            <p class="text-xs text-slate-400">
              Cashier
            </p>

            <h3 class="font-semibold text-slate-800">
              Admin
            </h3>
          </div>
        </div>

      </div>

    </div>
  </header>
</template>