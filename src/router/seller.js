const seller = [
  {
    path: '/seller',
    component: () => import('../layouts/LayoutSeller/LayoutSeller.vue'),
    children: [
      {
        path: 'home',
        name: 'menu-1',
        component: () => import('../components/dashBoard/DashBoard.vue')
      },
      {
        path: 'category',
        name: 'menu-2',
        component: () => import('../components/category/categoryMain/CategoryView.vue')
      },
      {
        path: 'brand',
        name: 'menu-3',
        component: () => import('../components/brand/BrandView.vue')
      },
      {
        path: 'list-warehouse',
        name: 'menu-10',
        component: () => import('../components/warehouse/listWarehouse/ListWarehouse.vue')
      },
      {
        path: 'warehouse-detail',
        name: 'menu-11',
        component: () => import('../components/warehouse/warehouseDetail/WarehouseDetail.vue')
      },
      {
        path: 'profile',
        name: 'view-profile',
        component: () => import('../components/inforSeller/read/ReadView.vue')
      },
      {
        path: 'personal',
        name: 'view-personal',
        component: () => import('../components/inforSeller/personal/EditProfile.vue')
      },
      {
        path: 'shopinfo',
        name: 'view-shopInfo',
        component: () => import('../components/inforSeller/shop/InfoShop.vue')
      }
    ]
  }
];

export default seller;
