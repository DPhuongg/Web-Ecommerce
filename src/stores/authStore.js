import { defineStore } from 'pinia';
import authService from '@/domain/authServices';
import router from '@/router/index.js';
import Swal from 'sweetalert2';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: localStorage.getItem('token') || '',
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    async loginUser({ username, password, role }) {
      try {
        const response = await authService.login(username, password, role);

        localStorage.setItem('token', response.data.data.token);
        this.token = response.data.data.token;
        // console.log(this.user);
        // console.log(this.isLoggedIn);
        router.push({ path: `/${role}/home` });
      } catch (error) {
        const status = error.response.status;

        if (status === 401 || status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The account does not exist',
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      }
    },

    async registerUser({ fullName, email, password, role }) {
      try {
        const response = await authService.register(fullName, email, password, role);

        this.token = response.data.token; // Lưu token vào store
        localStorage.setItem('token', response.data.token); // Lưu token vào localStorage

        router.push({ path: `/${role}/home` });
      } catch (error) {
        const status = error.response.status;
        if (status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User with this email already existed',
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      }
    },

    logout() {
      this.token = '';
      localStorage.removeItem('token');
    }
  }
});
