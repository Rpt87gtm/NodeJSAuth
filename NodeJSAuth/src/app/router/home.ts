import HomePage from "../../pages/home/ui/HomePage.vue";

const homeRoutes = [
    {
        path:'/',
        name:'home',
        component:HomePage,
        meta: { requiresAuth: true },
    }
];

export default homeRoutes;