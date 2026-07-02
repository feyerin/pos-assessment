<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useToastStore } from "../../stores/toast"

const toast = useToastStore()
const { toasts } = storeToRefs(toast)
</script>

<template>
  <div class="fixed right-4 top-4 z-9999 space-y-3">
    <TransitionGroup name="toast">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="min-w-65 rounded-xl px-4 py-3 text-sm shadow-lg text-white flex items-center justify-between"
        :class="{
          'bg-green-600': t.type === 'success',
          'bg-red-600': t.type === 'error',
          'bg-blue-600': t.type === 'info',
          'bg-yellow-500': t.type === 'warning',
        }"
      >
        <span>{{ t.message }}</span>

        <button
          class="ml-4 opacity-70 hover:opacity-100"
          @click="toast.removeToast(t.id)"
        >
          ✕
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>