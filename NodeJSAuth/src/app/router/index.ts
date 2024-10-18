import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./auth";
import homeRoutes from "./home";
import store from "../../shared/store";
import {jwtDecode} from 'jwt-decode';


const routes = [
    ...homeRoutes,
    ...authRoutes,
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const isLoggedIn = store.getters['auth/isLoggedIn'];
    console.log("isLoggedIn: "+isLoggedIn);
    console.log("authStatus: "+ store.getters['auth/authStatus']);

    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login');
    } else {
        const token = localStorage.getItem('token');
        console.log("token: "+token);
        if (token) {
            const decodedToken: any = jwtDecode(token);
            const currentTime = Date.now() / 1000;
  
            if (decodedToken.exp < currentTime) {
                try {
                    await store.dispatch('auth/refreshToken');
                } catch (error) {
                    store.dispatch('auth/logout');
                    next('/login');
                    return;
                }
            }
        }
        next();
    }
  });

export default router;