<template>
    <v-app-bar app color="indigo" dark>
        <v-toolbar-title>BUDGET TRACKER</v-toolbar-title>
        <v-spacer></v-spacer>
        <LoginPage />
    </v-app-bar>
</template>
<script>
import LoginPage from '../views/LoginPage.vue';
export default {
  components: {LoginPage},
  methods: {
  }
};
</script>

<style scoped>
/* Center the content in the middle of the page */
.v-container {
  height: 100vh;
}
</style>
