import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './api/axios'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

