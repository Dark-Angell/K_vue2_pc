import Vue from 'vue'
import Router from 'vue-router'
import Translate from '@/pages/translate'
import HQData from '@/pages/HQData'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Translate',
      name: 'Translate',
      component: Translate
    },
    {
      path: '/HQData',
      name: 'HQData',
      component: HQData
    }
  ]
})
