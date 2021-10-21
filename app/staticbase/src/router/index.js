import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Results from '../views/Results.vue'
import Result from '../views/Result.vue'
import Documents from '../views/Documents.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/results',
    name: 'Results',
    component: Results,
    children: [
      {
        path: ':result_id',
        name: 'Result',
        component: Result,
        props: true
      }
    ]
  },
  {
    path: '/documents/:document_id',
    name: 'Documents',
    component: Documents,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
