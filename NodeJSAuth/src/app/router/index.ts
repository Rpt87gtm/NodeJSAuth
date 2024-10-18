import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./auth";
import homeRoutes from "./home";
import store from '../../shared/store'

const routes = [
    ...homeRoutes,
    ...authRoutes,
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters['auth/isLoggedIn'];

  if (to.meta.requiresAuth && !isLoggedIn) {
      next('/login');
  } else {
      next();
  }
});


export default router;