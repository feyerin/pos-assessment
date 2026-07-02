<script setup lang="ts">
import { ref, watch } from "vue"
import { Search, X } from "lucide-vue-next"

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>()

const props = defineProps<{
  modelValue: string
}>()

const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (value) => {
    localValue.value = value
  }
)

watch(localValue, (value) => {
  emit("update:modelValue", value)
})

const clear = () => {
  localValue.value = ""
}
</script>

<template>
  <div class="relative w-full">

    <!-- Search Icon -->
    <div
      class="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2"
    >
      <Search
        :size="22"
        class="text-slate-400"
      />
    </div>

    <!-- Input -->
    <input
      v-model="localValue"
      type="text"
      placeholder="Search food, drinks..."
      class="h-16 w-full rounded-3xl border border-slate-200 bg-white pl-14 pr-14 text-[15px] text-slate-700 shadow-sm transition-all duration-300 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
    />

    <!-- Clear -->
    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="scale-75 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-150"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-75 opacity-0"
    >
      <button
        v-if="localValue"
        @click="clear"
        class="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 transition hover:bg-red-100"
      >
        <X
          :size="18"
          class="text-slate-500 hover:text-red-500"
        />
      </button>
    </Transition>

  </div>
</template>