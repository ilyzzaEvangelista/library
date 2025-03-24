import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css"; // Import Vuetify styles

Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify(), // Register Vuetify
  render: (h) => h(App),
}).$mount("#app");
