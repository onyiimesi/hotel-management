<template>
  <footer class="bg-gray-100 text-gray-700 text-sm mt-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Logo & Description -->
        <div class="space-y-2">
          <RouterLink to="/"><h3>Dinesurf</h3></RouterLink>
          <p class="text-gray-600">Book your next stay, flight, or adventure all in one place.</p>
        </div>

        <!-- Links -->
        <div class="flex flex-col space-y-1">
          <RouterLink to="/about" class="hover:underline">About Us</RouterLink>
          <RouterLink to="/careers" class="hover:underline">Careers</RouterLink>
          <RouterLink to="/terms" class="hover:underline">Terms of Service</RouterLink>
          <RouterLink to="/privacy" class="hover:underline">Privacy Policy</RouterLink>
        </div>

        <!-- Social (optional) -->
        <div class="space-y-2">
          <p class="font-medium">Connect with us</p>
          <div class="flex gap-4">
            <a href="#" aria-label="Facebook" class="hover:text-blue-600">🌐</a>
            <a href="#" aria-label="Instagram" class="hover:text-pink-500">📷</a>
            <a href="#" aria-label="Twitter" class="hover:text-blue-400">🐦</a>
          </div>
        </div>
      </div>

      <div class="mt-8 border-t pt-4 text-center text-xs text-gray-500">
        &copy; {{ new Date().getFullYear() }} YourBrand. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>
