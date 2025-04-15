<template>
  <div>
    <AppBar/>
    <v-container fluid>
      <v-card >
        <v-card-title class="text-h5">Welcome to Budget Tracker</v-card-title>
        <v-card-subtitle class="text-body-1">
          Manage your finances easily and efficiently. Track your spending, set budgets, and more.
        </v-card-subtitle>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue';
export default {
  components: {AppBar},
  methods: {}
};
</script>

<style scoped>
/* Center the content in the middle of the page */
.v-container {
  height: 100vh;
}
</style>
