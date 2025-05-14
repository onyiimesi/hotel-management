<template>
  <AppLayout>
    <div class="bg-gray-50 py-10 px-4">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-2 space-y-8">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 class="text-xl font-semibold mb-6 text-gray-800">Your information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="">Full name <span class="text-red-500">*</span></label>
                <input
                  v-model="form.name"
                  placeholder="John Doe"
                  class="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label for="">Email address <span class="text-red-500">*</span></label>
                <input
                  v-model="form.email"
                  placeholder="email@email.com"
                  class="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label for="">Phone number <span class="text-red-500">*</span></label>
                <input
                  v-model="form.phone"
                  placeholder="08000909090"
                  class="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none md:col-span-2"
                />
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 class="text-xl font-semibold mb-6 text-gray-800">Payment</h2>
            <p class="text-sm text-gray-500 mb-4">All payments are securely processed.</p>
            <button
              @click="payWithPaystack"
              class="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-lg font-medium shadow hover:cursor-pointer transition duration-300"
            >
              <span v-if="!isLoadingPayment">Pay</span>
              <span v-else class="flex items-center gap-2 text-center justify-center">
                <svg
                  class="animate-spin h-5 w-5 text-white"
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
                  />
                </svg>
                Processing...
              </span>
            </button>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24 h-fit">
          <h3 class="text-lg font-semibold mb-4 text-gray-900">Booking Summary</h3>
          <div class="text-sm text-gray-700 space-y-2">
            <p><strong>Room:</strong> {{ room?.name }}</p>
            <p v-html="room?.room_type?.description"></p>
            <p><strong>Guests:</strong> {{ room?.room_type?.guests }}</p>
            <p><strong>Check-in:</strong> Apr 29</p>
            <p><strong>Check-out:</strong> May 2</p>
          </div>
          <hr class="my-4" />
          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              <span>Base Price</span>
              <span>{{ room?.price }}</span>
            </div>
            <div class="flex justify-between">
              <span>Taxes & Fees</span>
              <span>₦{{ formatNumber(room?.room_type?.price!) }}</span>
            </div>
          </div>
          <hr class="my-4" />
          <div class="flex justify-between font-bold text-blue-600">
            <span>Total</span>
            <span>₦{{ formatNumber(room?.room_type?.price!) }}</span>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { getRoomDetail } from '@/lib/services/RoomService'
import type { IRoom } from '@/lib/types/response'
import { makePayment } from '@/lib/services/BookingService'

const route = useRoute()
const room = ref<IRoom>()
const isLoading = ref(true)
const isLoadingPayment = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: '',
})

const payWithPaystack = async () => {
  if (!form.value.name || !form.value.email || !form.value.phone) {
    alert('Please fill in all required fields.')
    return
  }

  if (!room.value) return

  isLoadingPayment.value = true

  try {
    const amount = room.value.room_type?.price || 0

    const response = await makePayment({
      email: form.value.email,
      name: form.value.name,
      phone: form.value.phone,
      amount,
      room_id: room.value.id,
      room_name: room.value.name,
      guests: room.value.room_type?.guests || 1,
      check_in: '2023-04-29',
      check_out: '2023-05-02',
    })

    if (response.data.authorization_url) {
      window.location.href = response.data.authorization_url
    } else {
      alert('Failed to initialize payment.')
    }
  } catch (err) {
    console.error('Payment error', err)
  } finally {
    isLoadingPayment.value = false
  }
}

const getRoomDetails = async () => {
  try {
    isLoading.value = true
    const response = await getRoomDetail(route.query.id as string)
    room.value = response.data
  } catch (error) {
    console.error('Error loading room:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getRoomDetails()
})

const formatNumber = (value: string | number): string => {
  const number = typeof value === 'string' ? parseFloat(value) : value
  return Number(number).toLocaleString()
}
</script>

<style scoped></style>
