
<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useLoginStore } from '@/stores/login';
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import LoginModal from '@/components/LoginModal.vue';
const userStore = useUserStore();
const loginStore = useLoginStore();
const router = useRouter();
const route = useRoute();


const logout = () => {
  userStore.logout();
  router.push({ name: 'home' });
}
watch(() => userStore.authenticated, (newValue, oldValue) => {
  if (newValue) {
    loginStore.hideLoginModal();
    if (route.name === 'home') {
      router.push({ name: 'lists' });
    }
  }
})
</script>

<template>
  <header>

    <nav>
      <div class="nav-left">
        <RouterLink to="/">
          <h1>TodoList</h1>
        </RouterLink>
        <span>A SIMPLE TODO LIST APP</span>
      </div>
      <div class="nav-right">
        <button v-if="!userStore.authenticated" @click="loginStore.showLoginModal()">Login</button>
        <LoginModal v-if="loginStore.loginModalVisible && !userStore.authenticated"
          @close="loginStore.hideLoginModal" />
        <button v-if="userStore.authenticated" @click="logout()">Logout</button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
}

.nav-left {
  display: flex;
  align-items: baseline;
}

a {
  text-decoration: none;
  color: black;
}

h1 {
  margin-right: 10px;
}
</style>