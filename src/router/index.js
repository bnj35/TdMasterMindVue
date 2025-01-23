import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import GameView from '../views/Game.vue';
import StatsView from '../views/Stats.vue';
import { inject } from 'vue';
import { ref } from 'vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/game',
      name: 'game',
      component: GameView,
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const pseudo = inject('pseudo', ref(''));
  if (!pseudo && to.name !== 'home') {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
