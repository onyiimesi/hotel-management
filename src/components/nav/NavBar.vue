<template>
  <nav class="w-full bg-white shadow-md fixed top-0 left-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <RouterLink to="/"><h3>Dinesurf</h3></RouterLink>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-6">
          <NavItem label="Home" to="/home" />
          <NavItem label="About" to="/about" />
          <NavItem label="Contact us" to="/contact us" />
        </div>

        <!-- Right menu -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- <button class="text-sm text-gray-700 hover:text-black">Support</button>
          <button class="text-sm text-gray-700 hover:text-black">Trips</button>
          <button class="px-4 py-2 text-sm border rounded-md hover:bg-gray-100">Sign in</button> -->
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-gray-700 hover:text-black focus:outline-none"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <div v-if="isMobileMenuOpen" class="md:hidden px-4 pb-4 bg-white shadow">
      <NavItem label="Home" to="/home" />
      <NavItem label="About" to="/about" />
      <NavItem label="Contact us" to="/contact us" />
      <div class="mt-4 space-y-2">
        <!-- <button class="block text-sm text-gray-700 hover:text-black w-full text-left">
          Support
        </button>
        <button class="block text-sm text-gray-700 hover:text-black w-full text-left">Trips</button>
        <button class="w-full py-2 border rounded-md hover:bg-gray-100 text-sm">Sign in</button> -->
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NavItem from './NavItem.vue'

const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>
