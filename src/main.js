import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Lazyload from 'vue-lazyload'
import store from './store/'
import 'assets/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(Lazyload, {
  loading: 'http://static.cn-yoy.com/img/timg.jpg'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
