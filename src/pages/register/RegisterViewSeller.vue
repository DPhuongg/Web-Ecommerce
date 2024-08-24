<template>
  <div class="container__register">
    <div class="register">
      <div class="register__images"></div>
      <div class="register__content">
        <h3 class="register__title">Sign Up</h3>
        <div class="register__form-wrapper">
        <form @submit.prevent="handleSubmit">
          <label for="fullName">Full Name</label>
          <input type="text" v-model="register.full_name" id="fullname" required placeholder="Name..." />

          <label for="email">Email</label>
          <input type="email" v-model="register.email" id="email" required placeholder="Email address.." />

          <label for="password">Password</label>
          <input type="password" v-model="register.password" id="password" required placeholder="********" />

          <label for="confirmPassword">Repeat Password</label>
          <input type="password" v-model="register.confirmPassword" id="confirmPassword" required placeholder="********" />

          <label for="phone">Phone number</label>
          <input type="tel" v-model="register.phone" id="phone" required placeholder="+84...." />

          <label for="gender">Gender</label>
          <select v-model="register.gender" id="gender" required class="register__gender w-[20%] block mb-3 mt-3">
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          <label for="country">Country</label>
          <input type="text" v-model="register.country" id="country" required placeholder="Country" />
          <label for="province">Province</label>
          <input type="text" v-model="register.province" id="province" required placeholder="Province" />
          <label for="district">District</label>
          <input type="text" v-model="register.district" id="district" required placeholder="District" />
          <label for="commune">Commune</label>
          <input type="text" v-model="register.commune" id="commune" required placeholder="Commune" />
          <label for="address_detail">Detailed address</label>
          <input type="text" v-model="register.address_detail" id="address_detail" required placeholder="Detailed address" />

          <label for="addSellerRole">
            <input type="checkbox" v-model="register.addSellerRole" id="addSellerRole"/>
            Register as seller
          </label>

          <button class="button button--one" type="submit">Sign Up</button>
          <!-- <div class="register__buttons">
            <button class="button button--one" type="submit" @click="register.role = 'user'">Sign up as user</button>
            <button class="button button--twoo" type="submit" @click="register.role = ['user', 'seller']">Sign up as seller</button>
          </div> -->

        </form>
        </div>
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
  role: 'user',
  addSellerRole: false,
  country: '',
  province: '',
  district: '',
  commune: '',
  address_detail: ''
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

  if (register.addSellerRole) {
    register.role = 'seller';
  }
  // if (Array.isArray(register.role)) {
  //   register.role = 'seller';
  // }
  registerStore.verifyOTP(register);
};

const handleSignInClick = () => {
  router.push({ name: 'HomeUser' });
};
</script>

<style scoped lang="scss">
@import './register.scss';
</style>
