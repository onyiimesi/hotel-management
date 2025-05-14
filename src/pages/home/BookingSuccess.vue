<template>
  <AppLayout>
    <div
      class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16 text-center"
    >
      <div v-if="status === 'verifying'" class="text-gray-600 text-sm">Verifying payment...</div>

      <div
        v-else-if="status === 'success'"
        class="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-200"
      >
        <div class="flex justify-center mb-6">
          <svg
            class="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2l4 -4m5 2a9 9 0 1 1 -18 0a9 9 0 0 1 18 0z"
            />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
        <p class="text-sm text-gray-600 mb-6">
          Your reservation has been successfully processed. A confirmation email has been sent to
          your inbox.
        </p>

        <div class="text-left text-sm text-gray-700 space-y-1 mb-6">
          <p><strong>Name:</strong> {{ booking.name }}</p>
          <p><strong>Email:</strong> {{ booking.email }}</p>
          <p><strong>Phone:</strong> {{ booking.phone }}</p>
          <p><strong>Room:</strong> {{ booking.room }}</p>
          <p><strong>Check-in:</strong> Apr 29</p>
          <p><strong>Check-out:</strong> May 2</p>
        </div>

        <RouterLink to="/" class="inline-block mt-2 text-blue-600 hover:underline text-sm"
          >Back to Home</RouterLink
        >
      </div>

      <div
        v-else
        class="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-200 text-center"
      >
        <div class="flex justify-center mb-6">
          <svg
            class="w-16 h-16 text-red-500"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h1>
        <p class="text-sm text-gray-600 mb-6">
          We couldn’t verify your payment. Please try again or contact support.
        </p>
        <RouterLink to="/" class="inline-block mt-2 text-blue-600 hover:underline text-sm"
          >Back to Home</RouterLink
        >
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts" setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { verifyPayment } from '@/lib/services/BookingService'

const route = useRoute()

const booking = ref({
  name: '',
  email: '',
  phone: '',
  room: '',
})

const status = ref<'verifying' | 'success' | 'failed'>('verifying')

onMounted(async () => {
  const reference = route.query.reference as string
  if (!reference) {
    status.value = 'failed'
    return
  }

  try {
    const result = await verifyPayment(reference)

    if (result.data.status === 'success') {
      status.value = 'success'
      booking.value = {
        name: result.data.metadata.name,
        email: result.data.customer.email,
        phone: result.data.metadata.phone,
        room: result.data.metadata.room_name,
      }
    } else {
      status.value = 'failed'
    }
  } catch (error) {
    status.value = 'failed'
    console.error('Verification error:', error)
  }
})
</script>

<style scoped></style>
