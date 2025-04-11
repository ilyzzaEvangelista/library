import Vue from "vue";
import VueRouter from "vue-router";
import DentalMain from "./components/dental/DentalMain.vue";
import VueDashboard from "./components/dashboard/VueDashboard.vue";
import GoodreadsComponent from "./components/good-reads/GoodreadsComponent.vue";

Vue.use(VueRouter); // ✅ Required in Vue 2

const routes = [
  { path: "/dental", component: DentalMain },
  { path: "/dashboard", component: VueDashboard },
  { path: "/library", component: GoodreadsComponent },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
