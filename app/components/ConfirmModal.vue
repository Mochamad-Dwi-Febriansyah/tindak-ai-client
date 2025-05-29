<script setup lang="ts">
const props = defineProps<{
    modelValue: boolean
    title?: string,
    confirmText?: string
    cancelText?: string
    disableConfirm?: boolean
}>()

defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'confirm'): void
    (e: 'cancel'): void
}>()

watch(() => props.modelValue, (val) => {
  if (val) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
})

onBeforeUnmount(() => {
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
<div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"> 

    <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg animate-fade-in  max-h-[calc(100vh-20px)] overflow-y-auto  scroll-hidden">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">{{ title }}</h2>

      <!-- HTML slot -->
      <div class="text-sm text-gray-600 mb-6">
        <slot name="message" />
      </div>

      <div class="flex justify-end gap-3">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
          Batal
        </button>
        <button  :disabled="disableConfirm"
          @click="$emit('confirm')"
          :class="[
                'px-4 py-2 rounded font-medium transition text-sm',
                disableConfirm ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            ]" >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.scroll-hidden {
  overflow-y: auto;
  scrollbar-width: none;
}
.scroll-hidden::-webkit-scrollbar {
  display: none;
}
</style>