import LoginPage from '../../pages/login/index';
import RegisterPage from '../../pages/register/index';


const authRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
];

export default authRoutes;