import Vue from "vue";
import App from "./index.vue"; 
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "./assets/color.scss";
import VueRouter from 'vue-router';
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

import DentalMain from "@/components/dental/DentalMain.vue";

// Register plugins
Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3000,
});

// Create Vuetify instance
const vuetify = new Vuetify({
  icons: {
    defaultSet: "mdi",
  },
});

// Define routes
const routes = [
  { path: '/dental', component: DentalMain }
];

// Create router instance
const router = new VueRouter({
  mode: 'history',
  routes
});

// Mount app
new Vue({
  vuetify,
  router,
  render: (h) => h(App)
}).$mount("#app");