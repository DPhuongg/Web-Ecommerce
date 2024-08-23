<template>
  <div class="header">
    <div class="header__inner">
      <UserIcon class="icon__user mt-[10px] mb-[10px]"></UserIcon>
      <div v-if="!authStore.isLoggedIn" class="mt-[10px] mb-[10px]">
        <button class="button mr-2" @click="goToLogin">Đăng nhập</button>
        <span class="header__separator mr-2">/</span>
        <button class="button" @click="goToRegister">Đăng ký</button>
      </div>
      <div v-if="authStore.isLoggedIn" class="flex">
        <button class="button" @click="logout">Đăng xuất</button>
        <Modal></Modal>
      </div>
    </div>

    <div class="header__search">
      <div class="container">
        <img src="@/assets/images/logo.png" class="header__images" />

        <input 
          type="text" 
          placeholder="Nhập từ khóa tìm kiếm..." 
          class="header__input"
          @focus="handleFocus"
          v-model="inputValue"
          @blur="hideList()"
          @keyup.enter="search"
          />

        <button class="button__search" @click="search">
          <SearchIcon class="icon__search"></SearchIcon>
        </button>

        <button class="button__cart"  @click="handleCartClick">
          <CartIcon class="icon__cart"></CartIcon>
          <span class="header__title">Giỏ hàng</span>
        </button>

        <button class="button__store">
          <StoreIcon class="icon__store"></StoreIcon>
          <span class="header__title">Theo dõi đơn hàng</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserIcon, SearchIcon, StoreIcon, CartIcon } from '@/assets/icons/icon.js';
import { useAuthStore } from '@/stores/authStore';
import router from '@/router/index.js';
import Modal from '@/components/modal/ModalView.vue';
import { ref } from 'vue';
import { eventBus } from '@/utils/eventBusHeader.js'; 



const inputValue = ref('');
const authStore = useAuthStore();

const search = () => {
  eventBus.searchQuery = inputValue.value;
  console.log("test console log header",eventBus.searchQuery )
};

const goToLogin = () => {
  router.push({ path: '/login/user' });
};

const goToRegister = () => {
  router.push({ path: '/register' });
};

const logout = () => {
  authStore.logout();
  router.push({ path: '/home/user' });
};

const handleCartClick = () => {
  router.push({ name: 'list-cart' });
}
</script>

<style scoped lang="scss">
@import './header.scss';
</style>
