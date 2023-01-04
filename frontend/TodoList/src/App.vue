<script setup lang="ts">
import { onBeforeMount } from "vue";
import { RouterLink, RouterView } from "vue-router";
import AppContainer from "./components/AppContainer.vue";
import AppNavigation from "./components/AppNavigation.vue";
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

onBeforeMount(() => userStore.refreshToken());

</script>

<template>
  <AppContainer>
    <AppNavigation />
  </AppContainer>
  <AppContainer :vgrow="1">
    <RouterView />
  </AppContainer>
</template>

<style scoped>

</style>
