import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", () => {

const loginModalVisible = ref(false);
const loginTab = ref(true);

const showLoginModal = (tab='login') => {
  loginModalVisible.value = true;
  console.log(tab)
  loginTab.value = tab === 'login';
}
const hideLoginModal = () => {
  loginModalVisible.value = false;
}

  return { loginModalVisible, loginTab, showLoginModal, hideLoginModal };
});
