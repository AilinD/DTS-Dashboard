import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css';


Vue.config.productionTip = false

axios.defaults.baseURL = 'http://54.80.18.229:8123/api/';

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
