import Vue from "vue";
import App from "./index.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "./assets/color.scss";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import router from './router';
import { auth1, auth2 } from './firebase/init'; // Import both auth1 and auth2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import store from './store/store';

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

// Fetch user data before initializing the app
auth1.onAuthStateChanged(async (user) => {
  if (user) {
    // If the user is authenticated using auth1 (first app)
    await store.dispatch('fetchUser');
    await store.dispatch('fetchDataFromDb1'); // Fetch data from the first database

    // Once the user and database data is ready, initialize the app
    new Vue({
      vuetify,
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  } else {
    // If the user is not authenticated in auth1, check auth2 (second app)
    auth2.onAuthStateChanged(async (user2) => {
      if (user2) {
        // If the user is authenticated using auth2 (second app)
        await store.dispatch('fetchUser');
        await store.dispatch('fetchDataFromDb2'); // Fetch data from the second database

        // Once the user and database data is ready, initialize the app
        new Vue({
          vuetify,
          router,
          store,
          render: (h) => h(App),
        }).$mount("#app");
      } else {
        // If the user is not authenticated in either app, initialize the app without user data
        new Vue({
          vuetify,
          router,
          store,
          render: (h) => h(App),
        }).$mount("#app");
      }
    });
  }
});