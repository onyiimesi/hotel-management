<template>
  <form
    @submit.prevent="submitSearch"
    class="w-full bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4 items-center justify-center"
  >
    <!-- Check-in Date -->
    <div class="w-full md:w-full">
      <label class="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
      <Datepicker
        v-model="checkInDate"
        :min-date="new Date()"
        placeholder="Select check-in date"
        input-class-name="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Check-out Date -->
    <div class="w-full md:w-full">
      <label class="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
      <Datepicker
        v-model="checkOutDate"
        :min-date="checkInDate || new Date()"
        placeholder="Select check-out date"
        input-class-name="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Search Button -->
    <div class="w-full md:w-auto mt-2 md:mt-7">
      <button
        type="submit"
        :disabled="props.loading"
        class="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
      >
        <svg
          v-if="props.loading"
          class="animate-spin h-4 w-4 text-white"
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
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span>{{ props.loading ? 'Searching...' : 'Search' }}</span>
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps<{ loading: boolean }>()

const checkInDate = ref<Date | null>(null)
const checkOutDate = ref<Date | null>(null)

const emit =
  defineEmits<(event: 'search', payload: { checkIn: string; checkOut: string }) => void>()

function format(date: Date): string {
  return (
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0') +
    'T' +
    String(date.getHours()).padStart(2, '0') +
    ':' +
    String(date.getMinutes()).padStart(2, '0')
  )
}

function submitSearch() {
  if (checkInDate.value && checkOutDate.value) {
    emit('search', {
      checkIn: format(checkInDate.value),
      checkOut: format(checkOutDate.value),
    })
  }
}

watch([checkInDate, checkOutDate], ([newCheckIn, newCheckOut]) => {
  if (!newCheckIn || !newCheckOut) {
    emit('search', {
      checkIn: '',
      checkOut: '',
    })
  }
})
</script>
