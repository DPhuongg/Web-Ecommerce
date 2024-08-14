const admin = [
  {
    path: '/admin',
    component: () => import('../layouts/LayoutAdmin/LayoutAdmin.vue'),
    children: [
      {
        path: 'home',
        name: 'admin-menu-1',
        component: () => import('../pages/Home/Admin/AdminView.vue')
      },

      {
        path: 'list-seller',
        name: 'admin-menu-4',
        component: () => import('../components/managerSellers/listSeller/ListSeller.vue')
      },

      {
        path: 'detail-seller/:id',
        name: 'detail-seller',
        component: () => import('../components/managerSellers/detailSeller/DetailSeller.vue')
      },

      {
        path: 'add-seller',
        name: 'admin-menu-5',
        component: () => import('../components/managerSellers/addSeller/AddSeller.vue')
      },

      {
        path: 'list-user',
        name: 'admin-menu-6',
        component: () => import('../components/managerUsers/listUsers/ListUser.vue')
      },

      {
        path: 'detail-user/:id',
        name: 'detail-user',
        component: () => import('../components/managerUsers/detailUser/DetailUser.vue')
      },

      {
        path: 'add-user',
        name: 'admin-menu-7',
        component: () => import('../components/managerUsers/addUser/AddUser.vue')
      },
    ]
  }
];

export default admin;
