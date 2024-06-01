import Vue from 'vue'
import Router from 'vue-router'
import Translate from '@/components/translate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/translate',
      name: 'Translate',
      component: Translate
    }
  ]
})
