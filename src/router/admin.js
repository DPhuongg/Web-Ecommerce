const admin = [
  {
    path: '/admin',
    component: () => import('../layouts/TheAdmin.vue'),
    children: [
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('../pages/admin/users/UserView.vue')
      }
    ]
  }
];

export default admin;
