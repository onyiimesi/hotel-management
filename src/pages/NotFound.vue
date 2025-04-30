<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-4">
    <h1 class="text-6xl font-bold text-blue-600">404</h1>
    <p class="text-xl text-gray-700 mt-2">Page Not Found</p>
    <p class="text-sm text-gray-500 mt-1">Sorry, the page you’re looking for doesn’t exist.</p>
    <RouterLink
      to="/"
      class="mt-6 inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
    >
      Go back home
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>
