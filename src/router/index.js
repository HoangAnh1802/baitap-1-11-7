import { createRouter, createWebHistory } from 'vue-router'
import danhsachlop from '@/components/DanhSachLop.vue'
import danhsachhocsinh from '@/components/DanhSachHocSinh.vue'
import Home from '@/components/Home.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/danhsachlop',
    name: 'danhsachlop',
    component: danhsachlop
  },
  {
    path: '/danhsachhocsinh',
    name: 'danhsachhocsinh',
    component: danhsachhocsinh
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
