<template>
  <AppLayout>
    <div class="bg-gray-50 py-10 px-4">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <!-- Left Section: Form and Payment -->
        <div class="lg:col-span-2 space-y-8">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 class="text-xl font-semibold mb-6 text-gray-800">Your information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                v-model="form.name"
                placeholder="Full Name"
                class="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                v-model="form.email"
                placeholder="Email Address"
                class="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                v-model="form.phone"
                placeholder="Phone Number"
                class="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none md:col-span-2"
              />
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 class="text-xl font-semibold mb-6 text-gray-800">Payment</h2>
            <p class="text-sm text-gray-500 mb-4">All payments are securely processed.</p>
            <button
              @click="payWithPaystack"
              class="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-lg font-medium shadow"
            >
              Pay
            </button>
          </div>
        </div>

        <!-- Right Section: Summary -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24 h-fit">
          <h3 class="text-lg font-semibold mb-4 text-gray-900">Booking Summary</h3>
          <div class="text-sm text-gray-700 space-y-2">
            <p><strong>Room:</strong> {{ room.name }}</p>
            <p><strong>Description:</strong> {{ room.description }}</p>
            <p><strong>Guests:</strong> 2 Adults</p>
            <p><strong>Check-in:</strong> Apr 29</p>
            <p><strong>Check-out:</strong> May 2</p>
          </div>
          <hr class="my-4" />
          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              <span>Base Price</span>
              <span>{{ room.price }}</span>
            </div>
            <div class="flex justify-between">
              <span>Taxes & Fees</span>
              <span>$30</span>
            </div>
          </div>
          <hr class="my-4" />
          <div class="flex justify-between font-bold text-blue-600">
            <span>Total</span>
            <span>{{ totalPrice }}</span>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'

const route = useRoute()
const router = useRouter()
const room = {
  name: route.query.name as string,
  price: route.query.price as string,
  description: route.query.description as string,
}

const form = ref({
  name: '',
  email: '',
  phone: '',
})

function payWithPaystack() {
  // const handler = (window as any).PaystackPop.setup({
  //   key: 'your_public_key_here',
  //   email: form.value.email,
  //   amount: calculateAmountInKobo(),
  //   currency: 'NGN',
  //   ref: `ref_${Date.now()}`,
  //   callback: () => {
  //     router.push({
  //       path: '/booking/success',
  //       query: {
  //         name: form.value.name,
  //         email: form.value.email,
  //         phone: form.value.phone,
  //         room: room.name,
  //       },
  //     })
  //   },
  //   onClose: () => {
  //     alert('Payment window closed.')
  //   },
  // })
  router.push({
    path: '/booking/success',
    query: {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      room: room.name,
    },
  })

  //handler.openIframe()
}

function calculateAmountInKobo() {
  const price = Number(room.price.replace(/[^0-9.]/g, '')) || 0
  return (price + 30) * 100
}

const totalPrice = computed(() => {
  const base = Number(room.price.replace(/[^0-9.-]+/g, '')) || 0
  return `$${base + 30}`
})
</script>

<style scoped></style>
