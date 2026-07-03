<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

import {
  CalendarDays,
  Clock3,
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
  <header class="mb-6 md:mb-8">
    <div
      class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <!-- LEFT -->
      <div class="flex flex-col gap-4 sm:flex-row sm:flex-wrap">

        <!-- Date -->
        <div
          class="flex flex-1 items-center gap-4 rounded-3xl bg-white px-5 py-4 shadow-sm sm:flex-none sm:px-6"
        >
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100"
          >
            <CalendarDays
              :size="22"
              class="text-blue-600"
            />
          </div>

          <div class="min-w-0">
            <p class="text-sm text-slate-400">
              Today
            </p>

            <h2 class="truncate font-semibold text-slate-800">
              {{ currentDate }}
            </h2>
          </div>
        </div>

        <!-- Time -->
        <div
          class="flex flex-1 items-center gap-4 rounded-3xl bg-white px-5 py-4 shadow-sm sm:flex-none sm:px-6"
        >
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100"
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

            <h2 class="text-lg font-bold text-slate-800 sm:text-xl">
              {{ currentTime }}
            </h2>
          </div>
        </div>

      </div>

      <!-- RIGHT -->
      <div
        class="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end"
      >

        <!-- Cashier -->
        <div
          class="flex items-center gap-3 rounded-3xl bg-white px-4 py-3 shadow-sm"
        >
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100"
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