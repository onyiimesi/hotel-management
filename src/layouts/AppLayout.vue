<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <NavBar />
    <main class="flex-1 pt-20">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import NavBar from '@/components/nav/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>
