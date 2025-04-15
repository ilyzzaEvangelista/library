import Vue from "vue";
import VueRouter from "vue-router";
import DentalMain from "./components/dental/DentalMain.vue";
import VueDashboard from "./components/dashboard/VueDashboard.vue";
import GoodreadsComponent from "./components/good-reads/GoodreadsComponent.vue";
import HomePage from "./components/budget/IndexPage.vue";
Vue.use(VueRouter);

const routes = [
  { path: "/dental", component: DentalMain },
  { path: "/dashboard", component: VueDashboard },
  { path: "/library", component: GoodreadsComponent },
  { path: "/budget-tracker", component: HomePage },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;