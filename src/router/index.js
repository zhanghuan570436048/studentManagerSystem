import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/views/index.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    // {
    //   path: '/map',
    //   name: 'map01',
    //   component: ()=>import('../components/map/demo01.vue')
    // },
    // {
    //   path: '/map2',
    //   name: 'map02',
    //   component: ()=>import('../components/map/demo02.vue')
    // }
  ]
})
