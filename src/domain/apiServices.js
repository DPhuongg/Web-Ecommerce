import config from '@/configs/appBase';
import httpAuth from '@/infrastructures/apiHttpAuth';

export default {
  jwtToken() {
    console.log(httpAuth);
    return httpAuth.get(config.baseApiUrl + '/jwt');
  },
  // USER
  getAllUserRecommend() {
    return httpAuth.get(config.baseApiUrl + '/follow/recommend');
  },
  getAllUser() {
    return httpAuth.get(config.baseApiUrl + '/user/all');
  },

  //INFOR
  getUser(role) {
    return httpAuth.get(`${config.baseApiUrl}/api/v1/${role}/me`);
  },

  //PRODCUT USER
  getAllProduct() {
    return httpAuth.get(config.baseApiUrl + '/api/products/user');
  },

  //CATEGORY
  getAllCategory(page, size, search = '') {
    return httpAuth.get(`${config.baseApiUrl}/categories?page=${page - 1}&size=${size}&name=${search}`);
  },
  deleteCategory(id) {
    return httpAuth.delete(`${config.baseApiUrl}/categories/${id}`);
  },
  editCategory(id, name, status) {
    return httpAuth.put(`${config.baseApiUrl}/categories/${id}`, { name: name, status: status });
  },
  addCategory(name) {
    return httpAuth.post(config.baseApiUrl + '/categories', { name: name, status: true });
  },
  getCategory(id) {
    // console.log(httpAuth.get(`${config.baseApiUrl}/categories/${id}`));
    return httpAuth.get(`${config.baseApiUrl}/categories/${id}`);
  },

  //SELLER INFO
  getSeller() {
    return httpAuth.get(config.baseApiUrl + '/api/v1/seller/information');
  },
  updateUserInfo(newUserInfo) {
    return httpAuth.put(config.baseApiUrl + '/api/v1/seller/information', newUserInfo);
  },
  getShop() {
    return httpAuth.get(config.baseApiUrl + '/api/v1/shop');
  },
  updateShopInfo(newShopInfo) {
    return httpAuth.put(config.baseApiUrl + '/api/v1/shop', newShopInfo);
  },
  getShopById(id){
    return httpAuth.get(`${config.baseApiUrl}/api/v1/shop/${id}`);
  },

  //WAREHOUSE
  getAllWarehouse(page, size, searchQuery) {
    return httpAuth.get(`${config.baseApiUrl}/api/v1/warehouse?page=${page - 1}&size=${size}&name=${searchQuery}`);
  },
  deleteWarehouse(id) {
    // console.log(`${config.baseApiUrl}/api/v1/warehouse/${id}`);
    return httpAuth.delete(`${config.baseApiUrl}/api/v1/warehouse/${id}`);
  },
  addWarehouse(newWarehouse) {
    return httpAuth.post(config.baseApiUrl + '/api/v1/warehouse', newWarehouse);
  },
  getDetailWarehouse(id) {
    return httpAuth.get(`${config.baseApiUrl}/api/v1/warehouse/${id}`);
  },
  updateWarehouse(id, newWarehouse) {
    return httpAuth.put(`${config.baseApiUrl}/api/v1/warehouse/${id}`, newWarehouse);
  },

  //ADMIN
  getListSeller(page, size) {
    return httpAuth.get(`${config.baseApiUrl}/api/v1/admin/sellers?page=${page - 1}&size=${size}`);
  },
  getDetailSeller(id) {
    return httpAuth.get(`${config.baseApiUrl}/api/v1/admin/sellers/${id}`);
  },

  getListUser(page, size) {
    return httpAuth.get(`${config.baseApiUrl}/api/v1/admin/users?page=${page - 1}&size=${size}`);
  },
  getDetailUser(id) {
    return httpAuth.get(`${config.baseApiUrl}/api/v1/admin/users/${id}`);
  },
  addUser(newUser) {
    return httpAuth.post(config.baseApiUrl + '/api/v1/admin/users/add', newUser);
  },

  //SUPPLY
  getAllExport(page, size, searchName, searchId) {
    return httpAuth.get(`${config.baseApiUrl}/api/v1/inventory/export?page=${page - 1}&size=${size}&skuCode=${searchId}&name=${searchName}`);
  },

  //BRAND
  getAllBrand(page, size, search = '') {
    return httpAuth.get(`${config.baseApiUrl}/api/brands?page=${page - 1}&size=${size}&name=${search}`);
  },

  //PRODUCT
  createProduct(formData) {
    return httpAuth.post(`${config.baseApiUrl}/api/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getListProduct(page, size, search) {
    return httpAuth.get(`${config.baseApiUrl}/api/products/seller?page=${page - 1}&size=${size}&keyword=${search}`);
  },

  //CART
  getAllCart(page) {
    return httpAuth.get(`${config.baseApiUrl}/api/cart-items?page=${page - 1}`);
  },
  getItemCart(id) {
    return httpAuth.get(`${config.baseApiUrl}/api/v1/sku/${id}`);
  }
};
