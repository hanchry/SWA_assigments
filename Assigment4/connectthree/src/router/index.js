// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/components/Layout.vue";
import HomeView from "@/views/HomeView.vue";
import Game from "@/views/Game.vue";
import Profile from "@/views/Profile.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import BestScores from "@/views/BestScores.vue";
import NotFound from "@/views/NotFound.vue";
import { useGameStore } from '../store/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        { path: "", name: "home", component: HomeView },
        { path: "game", name: "game", component: Game },
        { path: "profile", name: "profile", component: Profile },
          {
          path: "/scoreboard",
          name: "scoreboard",
          component: BestScores,
          props: () => ({ model: useGameStore() }),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },

    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register },
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
  ],
});
// Navigation guard to check if the route requires authentication
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isUserLoggedIn()) {
    // Redirect to the login page if the user is not logged in
    next('/login');
  } else {
    // Proceed with navigation
    next();
  }
});

function isUserLoggedIn() {
  const model = useGameStore();
  return model.user.token !== undefined;
}

export default router;
