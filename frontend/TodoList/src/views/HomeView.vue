

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useLoginStore } from '@/stores/login';
import TechCards from '@/components/TechCards.vue';

const userStore = useUserStore();
const loginStore = useLoginStore();


let cards = [
  {
    header: "Backend",
    items: ['Python', 'Django', 'Django REST framework']
  },
  {
    header: "Frontend",
    items: ['Typescript', 'Vue.js']
  },
  {
    header: "Deployment",
    items: ['Github Actions', 'AWS EC2']
  },
]

</script>

<template>
  <main>
    <h1>Welcome to my todo list app.</h1>
    <p>This is a simple application to practice full stack development using the technologies you see below.</p>
    <TechCards :cards="cards" />
    <div class="get-started-card">
      <h2>
        Get Started
      </h2>
      <div v-if="userStore.authenticated">
        <button>Continue to Lists</button>
      </div>
      <div v-else>
        <button @click="loginStore.showLoginModal('setup')">Register</button>
        or
        <button @click="loginStore.showLoginModal()">Login</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}

main>* {
  margin-bottom: 30px;
}

h1 {
  font-size: 48px;
  margin: 30px 0px;
}

p {
  padding-bottom: 30px;
}

.get-started-card {
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 5px black;
  border-radius: 5px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>