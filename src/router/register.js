const register = [
  {
    path: '/register',
    component: () => import('../pages/register/RegisterView.vue')
    // children: [
    //   {
    //     path: 'register',
    //     name: 'register',
    //     component: () => import('../pages/register/RegisterView.vue')
    //   },
    //   {
    //     path: 'forgot_password',
    //     name: 'seller-login',
    //     component: () => import('../pages/register/ForgotPasswordView.vue')
    //   },
    //   {
    //     path: '',
    //     name: 'user-login',
    //     component: () => import('../pages/login/user/UserView.vue')
    //   }
    // ]
  }
];

export default register;
