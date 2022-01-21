/* eslint-disable */
export default {
  routes: [
    {
      path: '/advert',
      name: 'advert',
      component: () => import(/* webpackChunkName: 'advert' */ './pages/advert/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/advert-space',
      name: 'advert-space',
      component: () => import(/* webpackChunkName: 'advert' */ './pages/advert-space/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
