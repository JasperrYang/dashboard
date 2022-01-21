export default {
  routes: [
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: 'user' */ './pages/user/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
