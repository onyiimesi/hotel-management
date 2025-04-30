<template>
  <RouterLink :to="to" class="flex items-center space-x-2 hover:text-black text-gray-700 text-sm">
    <span v-if="icon" class="text-lg">{{ icon }}</span>
    <span>{{ label }}</span>
  </RouterLink>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'

defineProps<{
  label: string
  icon?: string
  to: string
}>()
</script>
