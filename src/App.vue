<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'

const ready = ref(false)

onBeforeMount(() => {
  ready.value = false
})

onMounted(() => {
  ready.value = true
})
</script>

<template>
  <RouterView v-if="ready" v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>
</template>

<style scoped></style>
