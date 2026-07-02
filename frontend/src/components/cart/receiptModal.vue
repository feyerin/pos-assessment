<script setup lang="ts">
import { storeToRefs } from "pinia"
import {
  CircleCheckBig,
  Receipt,
  Printer,
  Plus,
} from "lucide-vue-next"

import { useFormatter } from "../../composables/useFormatter"
import { useReceiptPrinter } from "../../composables/useReceiptPrinter"
import { useCheckoutStore } from "../../stores/checkout"

const { formatCurrency } = useFormatter()
const { printReceipt } = useReceiptPrinter()

const checkoutStore = useCheckoutStore()

const {
  receipt,
  showReceipt,
} = storeToRefs(checkoutStore)

const close = () => {
  showReceipt.value = false
  checkoutStore.clearReceipt()
}

const handlePrint = () => {
  if (!receipt.value) return
  printReceipt(receipt.value, formatCurrency)
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showReceipt && receipt"
        class="fixed inset-0 z-999 flex items-center justify-center bg-black/40 backdrop-blur-sm p-5"
      >
        <div class="w-full max-w-md rounded-4xl bg-white shadow-2xl">

          <div class="border-b p-8 text-center">
            <div class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CircleCheckBig :size="42" class="text-green-600" />
            </div>

            <h2 class="text-2xl font-bold text-slate-800">
              Payment Success
            </h2>

            <p class="mt-2 text-slate-500">
              Transaction completed successfully
            </p>
          </div>

          <div class="space-y-5 p-8">

            <div class="flex items-center gap-3">
              <Receipt :size="22" class="text-blue-600" />

              <div>
                <h3 class="font-semibold">Receipt</h3>
                <p class="text-sm text-slate-400">
                  #{{ receipt.id }}
                </p>
              </div>
            </div>

            <div class="text-sm text-slate-500">
              {{ receipt.date }}
            </div>

            <div class="border-t border-dashed pt-5 space-y-3">

              <div
                v-for="item in receipt.items"
                :key="item.productId"
                class="flex justify-between"
              >
                <div>
                  <p class="font-medium">
                    {{ item.name }}
                  </p>

                  <p class="text-xs text-slate-400">
                    {{ item.qty }} x {{ formatCurrency(item.price) }}
                  </p>
                </div>

                <span class="font-semibold">
                  {{ formatCurrency(item.qty * item.price) }}
                </span>
              </div>

            </div>

            <div class="border-t border-dashed pt-5">
              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span class="text-blue-600">
                  {{ formatCurrency(receipt.total) }}
                </span>
              </div>
            </div>

          </div>

          <div class="flex gap-4 border-t bg-slate-50 p-6">

            <button
              class="flex flex-1 items-center justify-center gap-2 rounded-2xl border bg-white py-3 font-semibold transition hover:bg-slate-100"
              @click="handlePrint"
            >
              <Printer :size="18" />
              Print
            </button>

            <button
              class="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              @click="close"
            >
              <Plus :size="18" />
              New Order
            </button>

          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>