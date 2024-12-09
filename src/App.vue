<script setup>
import {useAuthStore} from '@/stores/auth'

const authStore = useAuthStore()

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('userTokens'));
  if (tokens) {
    authStore.userInfo.token = tokens.token;
    authStore.userInfo.refreshToken = tokens.refreshToken;
    authStore.userInfo.expiresIn = tokens.expiresIn;
  }
};

checkUser()
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
