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

  //PRODCUT
  getAllProduct() {
    return httpAuth.get(config.baseApiUrl + '/products');
  },

  //CATEGORY
  getAllCategory() {
    return httpAuth.get(config.baseApiUrl + '/categories');
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
    console.log(httpAuth.get(`${config.baseApiUrl}/categories/${id}`));
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

  //WAREHOUSE
  getAllWarehouse() {
    return httpAuth.get(config.baseApiUrl + '/api/v1/warehouse');
  },
  deleteWarehouse(id) {
    // console.log(`${config.baseApiUrl}/api/v1/warehouse/${id}`);
    return httpAuth.delete(`${config.baseApiUrl}/api/v1/warehouse/${id}`);
  },
  addWarehouse(newWarehouse) {
    return httpAuth.post(config.baseApiUrl + '/api/v1/warehouse', newWarehouse);
  }
};
