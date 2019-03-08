import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import addpost from '@/components/AddPost'
import editpost from '@/components/EditPost'

import Locations from '@/components/Locations'
import addlocation from '@/components/AddLocation'
import editlocation from '@/components/EditLocation'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/posts/add',
      component: addpost,
      name: 'addpost'
    },
    {
      path: '/posts/:id/edit',
      component: editpost,
      name: 'editpost'
    },
    {
      path: '/locations',
      component: Locations,
      name: 'Locations'
    },
    {
      path: '/locations/:region',
      component: Locations,
      name: 'Locations'
    },
    {
      path: '/locations/add',
      component: addlocation,
      name: 'addlocation'
    },
    {
      path: '/locations/:id/edit',
      component: editlocation,
      name: 'editlocation'
    }
  ]
})
