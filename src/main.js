import Vue from "vue";
import App from "./index.vue"; 
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "./assets/color.scss";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import router from './router';
import { auth } from './firebase/init'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import store from './store/store'
store.dispatch('fetchUser')

Vue.use(Vuetify);
Vue.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3000,
});
Vue.use(VueSweetalert2);

const vuetify = new Vuetify({
  icons: {
    defaultSet: "mdi",
  },
});

auth.onAuthStateChanged(() => {
  store.dispatch('fetchUser').then(() => {
    new Vue({
      vuetify,
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  });
});