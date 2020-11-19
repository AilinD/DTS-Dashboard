import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'signin',
    component: () => import('../views/SignIn.vue')
    
  },
  {
    path: '/estadisticas',
    name: 'estadísticas',
    component: () => import('../views/Statistics.vue')
    
  },
  {
    path: '/conductores',
    name: 'conductores',
    component: () => import('../views/Drivers.vue')
    
  },
  {
    path: '/viajesactivos',
    name: 'viajesactivos',
    component: () => import('../views/Live.vue')
    
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
