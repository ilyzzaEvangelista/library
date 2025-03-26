import Vue from "vue";
import App from "./index.vue"; 
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "./assets/color.scss";
import router from './router/index'; 
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

Vue.use(Vuetify);
Vue.use(Toast, {
  position: POSITION.BOTTOM_RIGHT, // Customize position
  timeout: 3000, // Customize timeout duration
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