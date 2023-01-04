<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useLoginStore } from '@/stores/login';


const userStore = useUserStore()
const loginStore = useLoginStore();
const emit = defineEmits(["close"])


const email = ref('');
const username = ref('');
const password = ref('');
const password2 = ref('');

const loginSignup = () => {
  if (loginStore.loginTab) {
    userStore.login(username.value, password.value)
  }
  else if (password.value === password2.value) {
    userStore.register(username.value, password.value)
  }

}


const errorMessage = computed(() => {
  if (password.value && password2.value && password.value != password2.value) return "Passwords do not match";
  if (!userStore.loginLoading && userStore.loginStatus == 401) return "Invalid user credentials";
})


</script>

<template>
  <div class="modal" @click.self="emit('close')">
    <div class="modal-content">
      <div class="tab-container">
        <div :class="{ active: loginStore.loginTab }" @click="loginStore.loginTab = true" class="tab">Login</div>
        <div :class="{ active: !loginStore.loginTab }" @click="loginStore.loginTab = false" class="tab">Sign Up</div>
      </div>
      <form @submit.prevent="loginSignup">
        <div class="form-fields">
          <!--<input name="email" v-model="email" v-if="!loginStore.loginTab" type="email" placeholder="Email" />-->
          <input name="username" v-model="username" type="text" placeholder="Username" />
          <input name="password" v-model="password" type="password" placeholder="Password" />
          <input name="password2" v-model="password2" v-if="!loginStore.loginTab"
            :class="{ error: password2 && password !== password2 }" type="password" placeholder="Repeat Password" />
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <div class="button-div">
          <input type="submit" :value="loginStore.loginTab ? 'Log In' : 'Sign Up'" />
          <input type="submit" @click.prevent="emit('close')" value='Cancel' />
        </div>

      </form>
    </div>
  </div>
</template>

<style scoped>
/* The Modal (background) */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: white;
  margin: auto auto;
  width: 600px;
  border-radius: 5px;
  overflow: hidden;
}

.tab-container {
  display: flex;
}

.tab {
  flex-grow: 1;
  text-align: center;
  border-bottom: 1px solid rgba(128, 128, 128, 0.7);
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
}

.tab:hover {
  background-color: rgba(200, 200, 200);
}

.tab:first-child {
  border-right: 1px solid rgba(128, 128, 128, 0.7);
}

.tab.active {
  cursor: default;
  background-color: lightgray;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-fields {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  padding: 10px 10px;
  font-size: large;

}

.form-fields input {
  width: 80%;
  margin: 10px 0px;
}

input.error {
  background-color: rgba(255, 0, 0, 0.3);
}

.error-message {
  color: red;
}

.button-div {
  margin: 10px 0px;
}

.button-div>* {
  display: inline-block;
  margin: 0px;
  padding: 10px;
}

.button-div input:first-child {
  margin-right: 30px;
}
</style>