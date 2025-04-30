<template>
  <div
    v-if="loading"
    class="animate-pulse rounded-xl overflow-hidden shadow-md bg-white w-full p-4"
  >
    <div class="h-48 w-full bg-gray-200 rounded-md mb-4"></div>
    <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div class="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div class="h-4 bg-gray-300 rounded w-1/4"></div>
  </div>

  <div
    v-else-if="slug"
    class="block rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition duration-300 w-full"
  >
    <img :src="image" :alt="title" class="h-48 w-full object-cover" />

    <div class="p-4 space-y-1">
      <h3 class="text-base font-semibold text-gray-800">{{ title }}</h3>
      <div class="text-sm text-gray-500 flex items-center gap-1">
        {{ size }} • Sleeps {{ sleeps }} • {{ bedType }}
      </div>

      <button class="text-sm text-blue-600 mt-1 hover:cursor-pointer" @click="showModal = true">
        More details →
      </button>

      <div class="flex items-center justify-between mt-2">
        <div>
          <div class="text-md">₦{{ formatNumber(price) }}</div>
        </div>

        <button
          class="bg-blue-600 text-white text-sm font-medium rounded px-4 py-2 hover:cursor-pointer"
          @click="goToBooking(id, slug)"
        >
          Reserve
        </button>
      </div>
    </div>

    <Modal :show="showModal" @close="showModal = false">
      <div>
        <Swiper
          :modules="[Navigation, Pagination]"
          :navigation="true"
          :pagination="{ clickable: true }"
          class="h-64 w-full rounded-lg overflow-hidden"
        >
          <SwiperSlide v-for="(img, index) in images" :key="index">
            <img :src="img" class="object-cover w-full h-full" alt="" />
          </SwiperSlide>
        </Swiper>
        <h2 class="text-xl font-bold mb-2">{{ title }}</h2>
        <p class="text-sm text-gray-700">{{ description }}</p>
        <ul class="mt-4 space-y-1 text-sm text-gray-600">
          <li><strong>Size:</strong> {{ size }}</li>
          <li><strong>Occupancy:</strong> Sleeps {{ sleeps }}</li>
          <li><strong>Bed:</strong> {{ bedType }}</li>
        </ul>
      </div>
    </Modal>
  </div>

  <div
    v-else
    class="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition duration-300 w-full"
  >
    <img :src="image" :alt="title" class="h-48 w-full object-cover" />

    <div class="p-4 space-y-2">
      <h3 class="text-base sm:text-lg font-semibold text-gray-800">
        {{ title }}
      </h3>
      <p v-if="description" class="text-sm text-gray-500">
        {{ description }}
      </p>

      <div v-if="price" class="text-sm font-medium text-blue-600">From {{ price }}</div>

      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Modal from './Modal.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

defineProps<{
  id: number
  image: string
  title: string
  description?: string
  location?: string
  price: string
  oldPrice?: string
  totalPrice?: string
  slug: string
  loading?: boolean
  size?: string | number
  sleeps?: number
  bedType?: string
  refundableBefore?: string
  discount?: number | string
  photosCount?: number
  images: string[]
}>()

const formatNumber = (value: string | number): string => {
  const number = typeof value === 'string' ? parseFloat(value) : value
  return Number(number).toLocaleString()
}

const showModal = ref(false)
const router = useRouter()

const goToBooking = (id: number, slug: string) => {
  router.push({
    name: 'booking',
    query: {
      id: id,
      name: slug,
    },
  })
}
</script>
