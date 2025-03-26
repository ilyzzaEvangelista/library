import Vue from "vue";
import App from "./index.vue"; 
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "./assets/color.scss";
import router from './router'; // Ensure this imports correctly
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Use Vuetify
Vue.use(Vuetify);

// Use Toast notifications
Vue.use(Toast, {
  position: POSITION.BOTTOM_RIGHT, // Customize position
  timeout: 3000, // Customize timeout duration
});

const vuetify = new Vuetify({
  icons: {
    defaultSet: "mdi", // Default icon set is mdi
  },
});

// Create the Vue instance with Vuetify and Router
new Vue({
  vuetify, // Include Vuetify configuration
  router,  // Include the router for navigation
  render: (h) => h(App), // Render the main App component
}).$mount("#app");
