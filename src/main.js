// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入 scss
// import './styles/index.less'

Vue.config.productionTip = false

// 引入翻译语言包
import i18n from './i18n'

// 引入 Websocket, 并挂载在原型上， $socketApi 在所有 vue 实例都可以访问
import socketApi from './utils/socket'
Vue.prototype.$socketApi = socketApi

// 引入 store
import store from './store'

// 全局 URL
Vue.prototype.$baseUrl = process.env.baseUrl

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  components: { App },
  template: '<App/>'
})
