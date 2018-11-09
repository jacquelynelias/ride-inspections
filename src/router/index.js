import Vue from 'vue'
import Router from 'vue-router'
import Park from '../components/park.vue'
import Search from '../components/search.vue'
import Test from '../components/test.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
    },
    {
      path: '/park/:id',
      name: 'park',
      component: Park
    },
    {
      path:'/test',
      name: 'test',
      component: Test
    }
  ]
})
