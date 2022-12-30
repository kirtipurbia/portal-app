import Home from './Component/Home';
import Login from './Component/Login';
import ResetPassword from './Component/ResetPassword';
import SignUp from './Component/SignUp';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/signup',
    component: SignUp,
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '/reset-password',
    component: ResetPassword,
    exact: true
  },
];

export default Object.freeze(routes);
