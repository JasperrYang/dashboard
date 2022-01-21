/* eslint-disable */
export default {
  routes: [
    {
      path: '/course',
      name: 'course',
      component: () => import(/* webpackChunkName: 'course' */ './pages/course/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
