import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
// import { BootstrapVue } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'


axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/"

Vue.config.productionTip = false

// Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
