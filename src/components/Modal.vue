<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    @click.self="emit('close')"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-[90%] max-w-xl p-6 relative"
      role="dialog"
      aria-modal="true"
    >
      <button
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        @click="emit('close')"
        aria-label="Close modal"
      >
        &times;
      </button>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>
