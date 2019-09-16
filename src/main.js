import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Lazyload from 'vue-lazyload'

import 'assets/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(Lazyload, {
  loading: 'http://static.cn-yoy.com/img/timg.jpg'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
