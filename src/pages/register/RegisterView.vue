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

          <div class="register__box">
            <input type="radio" id="user" v-model="register.role" value="user" name="userType" />
            <label for="user" class="register__wrap"> User </label>
            <input type="radio" id="seller" v-model="register.role" value="seller" name="userType" />
            <label for="seller" class="register__wrap"> Seller </label>
          </div>

          <button class="button button--one" type="submit">Sign Up</button>
        </form>
        <button class="button--two" @click="handleSignInClick">Sign In --></button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import router from '@/router/index.js';
import Swal from 'sweetalert2';

export default {
  setup() {
    const registerStore = useAuthStore(); // Khởi tạo authStore trong setup
    const register = reactive({
      fullName: '',
      email: '',
      password: '',
      role: ''
    });

    // console.log(register);

    const handleSubmit = async () => {
      if (register.password !== register.confirmPassword) {
        Swal.fire({
          title: 'Passwords do not match!',
          text: 'Please check your password and confirm password.',
          icon: 'question'
        });
        return;
      }
      // console.log(register);
      try {
        await registerStore.registerUser({
          fullName: register.fullName,
          email: register.email,
          password: register.password,
          role: register.role
        });
      } catch (error) {
        console.error('register Error:', error);
        // Xử lý lỗi nếu cần thiết
      }
    };

    const handleSignInClick = function () {
      router.push({ path: '/login/user' });
    };

    return {
      register,
      handleSubmit,
      handleSignInClick
    };
  }
};
</script>

<style scoped lang="scss">
@import './register.scss';
</style>
