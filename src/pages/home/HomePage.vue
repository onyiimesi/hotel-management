<template>
  <AppLayout>
    <div class="bg-white">
      <section class="max-w-7xl mx-auto px-4 py-10">
        <SearchPanel @search="fetchRooms" :loading="isLoading" />
      </section>

      <section class="max-w-7xl mx-auto px-4 py-6">
        <TabNav :tabs="tabs" v-model:activeTab="activeTab" @update:activeTab="handleTabClick">
          <template #Overview>
            <section class="max-w-7xl mx-auto px-4 pb-6 border-b">
              <h1 class="text-2xl font-bold text-gray-800 mb-1">{{ vendor?.company_name }}</h1>
              <p class="text-sm text-gray-600">Victoria Island, Lagos</p>
            </section>
          </template>

          <template #Rooms>
            <div class="space-y-6">
              <section class="max-w-7xl mx-auto px-4 py-10">
                <div
                  v-if="rooms.length > 0"
                  class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  <DestinationCard
                    v-for="room in rooms"
                    :key="room.id"
                    :title="room.name"
                    :description="room.description"
                    :price="room.price"
                    :image="room.image"
                    :slug="slugify(room.name, { lower: true })"
                    :loading="isLoading"
                    :size="room.quantity"
                    :sleeps="room.guests"
                    :bed-type="room.bed_type"
                    :images="room.images"
                  />
                </div>

                <div v-else class="flex flex-col items-center justify-center py-20 text-center">
                  <h3 class="text-lg font-semibold text-gray-800">No rooms available</h3>
                  <p class="text-gray-500 text-sm mt-2">
                    Try adjusting your check-in and check-out time to find available rooms.
                  </p>
                </div>
              </section>
            </div>
          </template>

          <template #Policies>
            <div class="mb-4">
              <h3>Cancellation policy</h3>
              <p
                class="text-sm text-gray-700 leading-relaxed"
                v-html="vendor?.room_booking_setting?.cancellation_policy"
              ></p>
            </div>

            <div class="mb-4">
              <h3>Important information</h3>
              <p
                class="text-sm text-gray-700 leading-relaxed"
                v-html="vendor?.room_booking_setting?.important_information"
              ></p>
            </div>
          </template>
        </TabNav>
      </section>
    </div>
  </AppLayout>
</template>

<script lang="ts" setup>
import AppLayout from '@/layouts/AppLayout.vue'
import TabNav from '@/components/TabNav.vue'
import DestinationCard from '@/components/DestinationCard.vue'
import { onMounted, onUnmounted, ref } from 'vue'
//import { useRouter } from 'vue-router'
import SearchPanel from '@/components/SearchPanel.vue'
import { getAvailableRooms } from '@/lib/services/RoomService'
import type { IRoom } from '@/lib/types/response'
import slugify from 'slugify'
import { useRoute } from 'vue-router'
import { getVendor } from '@/lib/services/VendorService'

//const router = useRouter()
const rooms = ref<IRoom[]>([])
const isLoading = ref(false)
const activeTab = ref('Overview')
const route = useRoute()
const vendor = ref<any>()

const handleTabClick = (tabLabel: string) => {
  activeTab.value = tabLabel
  const el = document.getElementById(tabLabel)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const sectionOffsets = ref<Record<string, number>>({})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const onScroll = () => {
  const scrollY = window.scrollY + 100
  for (const [section, offset] of Object.entries(sectionOffsets.value)) {
    if (scrollY >= offset) {
      activeTab.value = section
    }
  }
}

const fetchRooms = async ({ checkIn, checkOut }: { checkIn: string; checkOut: string }) => {
  try {
    isLoading.value = true
    const response = await getAvailableRooms(checkIn, checkOut)
    rooms.value = response.data
  } catch (error) {
    console.error('Error loading rooms:', error)
  } finally {
    isLoading.value = false
  }
}

const getVendorDetail = async () => {
  try {
    const response = await getVendor(route.params.slug as string)
    vendor.value = response.data
  } catch (error) {
    console.error('Error loading vendor:', error)
  }
}

onMounted(() => {
  fetchRooms({ checkIn: '', checkOut: '' })
  getVendorDetail()

  const sections = ['Overview', 'Rooms', 'Amenities', 'Policies']
  const offsets: Record<string, number> = {}

  sections.forEach((id) => {
    const el = document.getElementById(id)
    if (el) {
      offsets[id] = el.offsetTop
    }
  })

  sectionOffsets.value = offsets

  window.addEventListener('scroll', onScroll, { passive: true })
})

const tabs = [{ label: 'Overview' }, { label: 'Rooms' }, { label: 'Policies' }]

// const goToBooking = (room: any) => {
//   router.push({
//     name: 'booking',
//     query: {
//       name: room.name,
//       price: room.price,
//       description: room.description,
//     },
//   })
// }
</script>

<style scoped>
iframe {
  border: none;
}
</style>
