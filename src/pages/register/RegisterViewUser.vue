<template>
  <div class="container__register">
    <div class="register">
      <div class="register__images"></div>
      <div class="register__content">
        <h3 class="register__title">Sign Up</h3>
        <form @submit.prevent="handleSubmit">
          <label for="fullName">Full Name</label>
          <input type="text" v-model="register.fullName" id="fullname" required placeholder="Name..." />

          <label for="email">Email</label>
          <input type="email" v-model="register.email" id="email" required placeholder="Email address.." />

          <label for="password">Password</label>
          <input type="password" v-model="register.password" id="password" required placeholder="********" />

          <label for="confirmPassword">Repeat Password</label>
          <input type="password" v-model="register.confirmPassword" id="confirmPassword" required placeholder="********" />

          <label for="phone">Số điện thoại</label>
          <input type="tel" v-model="register.phone" id="phone" required placeholder="+84...." />

          <label for="gender">Giới tính</label>
          <select v-model="register.gender" id="gender" required class="register__gender w-[20%] block mb-3 mt-3">
            <option value="MALE">Nam</option>
            <option value="FEMALE">Nữ</option>
            <option value="OTHER">Khác</option>
          </select>

          <button class="button button--one" type="submit">Sign Up</button>
        </form>
        <button class="button--two underline" @click="handleSignInClick">Sign In</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import Swal from 'sweetalert2';
import router from '@/router/index.js';

const registerStore = useAuthStore();

const register = reactive({
  full_name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  gender: 'MALE',
  role: 'user'
});

const handleSubmit = async () => {
  if (register.password !== register.confirmPassword) {
    Swal.fire({
      title: 'Passwords do not match!',
      text: 'Please check your password and confirm password.',
      icon: 'error'
    });
    return;
  }

  registerStore.verifyOTP(register);
};

const handleSignInClick = () => {
  router.push({ name: 'HomeUser' });
};
</script>

<style scoped lang="scss">
@import './register.scss';
</style>
