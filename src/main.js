import Vue from "vue";
import App from "./index.vue"; 
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "./assets/color.scss";
import router from './router/index'; // Import the router

Vue.use(Vuetify);

const vuetify = new Vuetify({
  icons: {
    defaultSet: "mdi",
  },
});

new Vue({
  vuetify,
  router,  // Inject the router
  render: (h) => h(App),
}).$mount("#app");
