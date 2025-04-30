<template>
  <div class="relative w-full">
    <!-- Input Display -->
    <button
      @click="toggleDropdown"
      type="button"
      class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {{ guestsSummary }}
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4 space-y-3"
    >
      <!-- Adults -->
      <div class="flex justify-between items-center">
        <span class="text-sm font-medium">Adults</span>
        <div class="flex items-center gap-2">
          <button
            @click="decrease('adults')"
            class="w-6 h-6 flex items-center justify-center border rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            −
          </button>
          <span class="w-6 text-center">{{ adults }}</span>
          <button
            @click="increase('adults')"
            class="w-6 h-6 flex items-center justify-center border rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      <!-- Children -->
      <div class="flex justify-between items-center">
        <span class="text-sm font-medium">Children</span>
        <div class="flex items-center gap-2">
          <button
            @click="decrease('children')"
            class="w-6 h-6 flex items-center justify-center border rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            −
          </button>
          <span class="w-6 text-center">{{ children }}</span>
          <button
            @click="increase('children')"
            class="w-6 h-6 flex items-center justify-center border rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      <!-- Rooms -->
      <div class="flex justify-between items-center">
        <span class="text-sm font-medium">Rooms</span>
        <div class="flex items-center gap-2">
          <button
            @click="decrease('rooms')"
            class="w-6 h-6 flex items-center justify-center border rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            −
          </button>
          <span class="w-6 text-center">{{ rooms }}</span>
          <button
            @click="increase('rooms')"
            class="w-6 h-6 flex items-center justify-center border rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      <!-- Done button -->
      <div class="pt-2 text-right">
        <button @click="closeDropdown" class="text-blue-600 text-sm font-medium hover:underline">
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const emit = defineEmits<{
  (e: 'update', payload: { adults: number; children: number; rooms: number }): void
}>()

const isOpen = ref(false)
const adults = ref(2)
const children = ref(0)
const rooms = ref(1)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function closeDropdown() {
  isOpen.value = false
  emit('update', {
    adults: adults.value,
    children: children.value,
    rooms: rooms.value,
  })
}

function increase(type: 'adults' | 'children' | 'rooms') {
  if (type === 'adults') adults.value++
  if (type === 'children') children.value++
  if (type === 'rooms') rooms.value++
}

function decrease(type: 'adults' | 'children' | 'rooms') {
  if (type === 'adults' && adults.value > 1) adults.value--
  if (type === 'children' && children.value > 0) children.value--
  if (type === 'rooms' && rooms.value > 1) rooms.value--
}

const guestsSummary = computed(() => {
  return (
    `${adults.value} adult${adults.value > 1 ? 's' : ''}, ` +
    `${children.value} child${children.value !== 1 ? 'ren' : ''}, ` +
    `${rooms.value} room${rooms.value > 1 ? 's' : ''}`
  )
})
</script>
