import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Signup from '../views/Signup.vue'
import RestaurantsShow from '../views/RestaurantsShow.vue'
import MyRestaurantsIndex from '../views/MyRestaurantsIndex.vue'
import MyRestaurantsShow from '../views/MyRestaurantsShow.vue'
import MyRestaurantsEdit from '../views/MyRestaurantsEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/restaurant/:restaurant_id',
    name: 'restaurants-show',
    component: RestaurantsShow
  },
  {
    path: '/my_restaurants',
    name: 'myrestaurants-index',
    component: MyRestaurantsIndex
  },
  {
    path: '/my_restaurants/:id',
    name: 'myrestaurants-show',
    component: MyRestaurantsShow
  },
  {
    path: '/my_restaurants/:id/edit',
    name: 'myrestaurants-edit',
    component: MyRestaurantsEdit
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
