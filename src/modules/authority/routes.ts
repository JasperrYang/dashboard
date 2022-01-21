/* eslint-disable */
export default {
  routes: [
    {
      path: '/role',
      name: 'role',
      component: () => import(/* webpackChunkName: 'authority' */ './pages/role/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import(/* webpackChunkName: 'authority' */ './pages/menu/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/resource',
      name: 'resource',
      component: () => import(/* webpackChunkName: 'authority' */ './pages/resource/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
