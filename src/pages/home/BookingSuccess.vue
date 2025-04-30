<template>
    <AppLayout>
      <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div class="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <div class="flex justify-center mb-6">
            <svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2l4 -4m5 2a9 9 0 1 1 -18 0a9 9 0 0 1 18 0z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p class="text-sm text-gray-600 mb-6">
            Your reservation has been successfully processed. A confirmation email has been sent to your inbox.
          </p>
  
          <div class="text-left text-sm text-gray-700 space-y-1 mb-6">
            <p><strong>Name:</strong> {{ booking.name }}</p>
            <p><strong>Email:</strong> {{ booking.email }}</p>
            <p><strong>Phone:</strong> {{ booking.phone }}</p>
            <p><strong>Room:</strong> {{ booking.room }}</p>
            <p><strong>Check-in:</strong> Apr 29</p>
            <p><strong>Check-out:</strong> May 2</p>
          </div>
  
          <RouterLink to="/" class="inline-block mt-2 text-blue-600 hover:underline text-sm">Back to Home</RouterLink>
        </div>
      </div>
    </AppLayout>
  </template>
  
  <script lang="ts" setup>
  import AppLayout from '@/layouts/AppLayout.vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  const booking = {
    name: route.query.name as string,
    email: route.query.email as string,
    phone: route.query.phone as string,
    room: route.query.room as string,
  }
  </script>
  
  <style scoped>
  </style>
  