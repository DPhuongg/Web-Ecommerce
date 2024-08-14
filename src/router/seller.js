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
        path: 'warehouse-edit/:id',
        name: 'warehouse-edit',
        component: () => import('../components/warehouse/editWarehouse/EditWarehouse.vue')
      },

      {
        path: 'list-product',
        name: 'menu-4',
        component: () => import('../components/productSeller/tableProduct/TableProduct.vue')
      },

      {
        path: 'product-detail/:id',
        name: 'product-detail',
        component: () => import('../components/productSeller/productDetail/ProductDetail.vue')
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
      },

      {
        path: 'export-supply',
        name: 'menu-15',
        component: () => import('../components/supply/listExport/ListExport.vue')
      }
    ]
  }
];

export default seller;
