import Vue from 'vue';
import Vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';

window.IO = require('socket.io-client');
window._ = require('lodash');

Vue.config.productionTip = false

window.spriteContext = require.context('./assets/resources/sprites', true, /\.(png)$/);

new Vue({
    router,
    vuetify: Vuetify,
    render: h => h(App)
}).$mount('#app')
