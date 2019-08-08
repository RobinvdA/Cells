import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * Layouts
 */
import DefaultLayout from './layouts/Default';
Vue.component('default-layout', DefaultLayout);

/**
 * Pages
 */
import Register from './pages/Register';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import Test from './pages/Test';

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          name: 'register',
          component: Register,
          meta: { layout: 'default', auth: false }
      },
      {
          path: '/lobby',
          name: 'lobby',
          component: Lobby,
          meta: { layout: 'default', auth: true }
      },
      {
          path: '/games/:id',
          name: 'game',
          component: Game,
          meta: { layout: 'default', auth: true }
      },

      {
          path: '/test',
          name: 'test',
          component: Test,
          meta: { layout: 'default', auth: false }
      }
  ]
});

router.beforeEach((to, from, next) => {

    if (to.meta.auth && ! from.name) {
        return next('/');
    }

    next();

});

export default router;
