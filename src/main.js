import Vue from "vue";
import App from "./index.vue"; 
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "./assets/color.scss";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import router from './router';

Vue.use(Vuetify);
Vue.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3000,
});

const vuetify = new Vuetify({
  icons: {
    defaultSet: "mdi",
  },
});

new Vue({
  vuetify,
  router, 
  render: (h) => h(App),
}).$mount("#app");
