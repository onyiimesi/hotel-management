import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:slug',
      name: 'home',
      component: () => import('@/pages/home/HomePage.vue'),
    },
    {
      path: '/hotels/:slug',
      name: 'hotel.detail',
      component: () => import('@/pages/home/DetailPage.vue'),
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('@/pages/home/BookingPage.vue'),
    },
    {
      path: '/booking/success',
      name: 'booking.success',
      component: () => import('@/pages/home/BookingSuccess.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/NotFound.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
