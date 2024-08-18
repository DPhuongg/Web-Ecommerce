import config from '@/configs/appBase';
import http from '@/infrastructures/apiHttp';

export default {
  register(fullName, email, password, role) {
    return http.post(`${config.baseApiUrl}/api/v1/${role}/signup`, { fullName: fullName, email: email, password: password });
    // return http.post(config.baseApiUrl + '/register', data);
  },
  login(email, password, role) {
    console.log(role);
    // return http.post(config.baseApiUrl + '/login', { email: email, password: password });
    // http://localhost:8080/api/v1/user/login
    return http.post(`${config.baseApiUrl}/api/v1/${role}/login`, { email: email, password: password });
  },
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuth');
    localStorage.removeItem('user');
    window.location = config.baseUrl + '/login';
  },
  access_denied() {
    window.location = config.baseUrl + '/error/403';
  },
  unauthorized() {
    this.logout();
  },
  getAccessToken(data) {
    return data;
  },
  forgot(email) {
    // http://localhost:3000/api/v1/forgotPassword/changePassword/{email}
    return http.post(`${config.baseApiUrl}/api/v1/forgotPassword/changePassword/${email}`, { email: email });
  },

  sendOTP(newUser) {
    // console.log(newUser)
    return http.post(`${config.baseApiUrl}/api/v1/${newUser.role}/signUpNewVersion`, newUser);
  },

  checkOTP(email, otp) {
    return http.post(config.baseApiUrl + '/api/v1/user/verifyOtp', { email: email, otp: otp });
  },

  resendOTP(email) {
    return http.post(`${config.baseApiUrl}/api/v1/user/resendOtp`, { email: email });
  }
};
