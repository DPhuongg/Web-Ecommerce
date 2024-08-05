const home = [
  {
    path: '/user',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'Home user',
        component: () => import('../pages/Home/User/HomeUserView.vue')
      },
      {
        path: 'admin',
        name: 'Home admin',
        component: () => import('../pages/Home/Admin/HomeAdminView.vue')
      },
    ]
  }
];

export default home;
