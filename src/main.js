import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import routes from './router/router';
import ElementUI from 'element-ui';
import store from './store/store';
import cache from './plugins/cache';
import { getDataStorage } from '@/utils/util';
import App from '@/App.vue';

import affixTab from '@/directives/affix-tab';
import imageUpload from '@/directives/image-upload';
import selectBlur from '@/directives/select-blur';

import './style/font.css';
import './style/reset.css';

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const activeRoutes = to.matched;
  const username = getDataStorage('username');
  if (!username && activeRoutes.some(route => route.meta.requireAuth)) {
    next({ name: 'login' });
  } else {
    next();
  }
});

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(cache);
Vue.directive('affixtab', affixTab);
Vue.directive('imageupload', imageUpload);
Vue.directive('selectblur', selectBlur);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
