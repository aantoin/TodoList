import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ListView from "@/views/ListView.vue";
import { useUserStore } from "@/stores/user";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/lists",
      name: "lists",
      component: ListView,
      meta:{requiresAuth:true}
    },
  ],
});

router.beforeEach((to) => {
  const store = useUserStore();

  if (to.meta.requiresAuth && !store.authenticated) return { name: 'home' };
})

export default router;
