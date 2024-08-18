const register = [
  {
    path: '/register-user',
    name: 'register-user',
    component: () => import('../pages/register/RegisterViewUser.vue')
  },

  {
    path: '/register-seller',
    name: 'register-seller',
    component: () => import('../pages/register/RegisterViewSeller.vue')
  }
];

export default register;
