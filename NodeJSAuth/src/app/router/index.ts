import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./auth";
import homeRoutes from "./home";

const routes = [
    ...homeRoutes,
    ...authRoutes,
];


const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router;