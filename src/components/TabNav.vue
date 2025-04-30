<template>
  <div class="w-full">
    <!-- Tab Buttons -->
    <div class="flex overflow-x-auto no-scrollbar bg-white shadow-sm">
      <div class="flex gap-4 pt-4 px-4 min-w-full sm:min-w-0">
        <button
          v-for="tab in tabs"
          :key="tab.label"
          @click="$emit('update:activeTab', tab.label)"
          :class="[
            'flex flex-col items-center px-3 py-2 text-sm whitespace-nowrap hover:cursor-pointer',
            activeTab === tab.label
              ? 'text-blue-600 border-b-3 border-blue-600 font-medium'
              : 'text-gray-600 hover:text-black',
          ]"
        >
          <span class="text-lg sm:text-sm">{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <!-- Tab Content Slot -->
    <div class="p-4">
      <slot :name="activeTab" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  tabs: { label: string }[]
  activeTab: string
}>()

defineEmits(['update:activeTab'])
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
