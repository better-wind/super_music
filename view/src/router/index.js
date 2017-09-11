import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Home = resolve => require(['@/pages/Home/Home'], resolve),
      Music = resolve => require(['@/pages/Music/music'], resolve),
      Song = resolve => require(['@/pages/Music/song'], resolve),
      Login = resolve => require(['@/pages/Login/login'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/Music',
      name: 'Music',
      component: Music,
    },
    {
      path: '/Song',
      name: 'Song',
      component: Song,
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
  ],
});
