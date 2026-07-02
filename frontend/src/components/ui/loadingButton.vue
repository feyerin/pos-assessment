<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  loading?: boolean
  disabled?: boolean
  type?: "button" | "submit"
  variant?: "primary" | "danger" | "ghost"
  size?: "sm" | "md" | "lg"
}>()

const baseClass =
  "inline-flex items-center justify-center gap-2 font-medium transition rounded-xl disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
  danger:
    "bg-red-600 text-white hover:bg-red-700 shadow-sm",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100",
}

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-sm",
  lg: "px-6 py-4 text-base",
}

const classes = computed(() => {
  return [
    baseClass,
    variants[props.variant || "primary"],
    sizes[props.size || "md"],
  ].join(" ")
})
</script>

<template>
  <button
    :type="type || 'button'"
      :disabled="loading || disabled"
    :class="classes"
  >
    <!-- Spinner -->
    <svg
      v-if="loading"
      class="h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>

    <!-- Content -->
    <span :class="{ 'opacity-70': loading }">
      <slot />
    </span>
  </button>
</template>