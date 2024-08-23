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
        path: 'list-cart',
        name: 'list-cart',
        component: () => import('../components/managerCart/listCart/ListCart.vue')
      },
      {
        path: 'product-detail-view/:id',
        name: 'product-detail-user',
        component: () => import('../components/listProduct/productDetail/ProductDetail.vue')
      }
    ]
  }
];

export default home;
