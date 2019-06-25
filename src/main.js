import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

window.IO = require('socket.io-client');

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')