import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';
import Analyze from '../pages/Analyze';
import Result from '../pages/Result';
import SelectNomivation from '../pages/SelectNomivation';
import UserProfile from '../pages/UserProfile.vue';
import Profile from '../pages/Profile.vue';
import UserRegister from '../pages/UserRegister';
import PreliquoTop from '../pages/PreliquoTop';
import UserLogin from '../pages/UserLogin';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: PreliquoTop,
      name: 'PreliquoTop',
    },
    {
      path: '/login',
      component: UserLogin,
      name: 'UserLogin',
    },
    {
      path: '/register',
      component: UserRegister,
      name: 'UserRegister',
    },
    {
      path: '/analyze',
      component: Analyze,
      name: 'Analyze',
    },
    {
      path: '/profile',
      component: UserProfile,
      name: 'UserProfile',
      meta: { requireAuth: true },
      props: true,
    },
    {
      path: '/profiles',
      component: Profile,
      name: 'Profile',
      meta: { requiredAuth: true },
    },
    {
      path: '/nomivation',
      component: SelectNomivation,
      name: 'SelectNomivation',
    },
    {
      path: '/result',
      component: Result,
      name: 'Result',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    store.dispatch('users/fetchAuthUser').then((authUser) => {
      if (!authUser) {
        next({ name: 'UserLogin' });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
