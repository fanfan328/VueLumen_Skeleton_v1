import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'
import router from './router'
import vuetify from './plugins/vuetify'
//import bootstrap css & js
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

Vue.use(VueRouter);
Vue.use(VueSession);
Vue.config.productionTip = false

// Set Vue globally
window.Vue = Vue
window.axios = require('axios');

// Set Vue router
Vue.router = router
Vue.use(VueRouter)



//Register Router on Vue Project
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
