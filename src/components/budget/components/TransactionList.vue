<template>
    <v-form @submit.prevent="addTransaction">
      <v-text-field v-model="description" label="Description" required />
      <v-text-field v-model.number="amount" label="Amount" type="number" required />
      <v-btn type="submit" color="primary">Add</v-btn>
    </v-form>
  </template>
  
  <script>
  import firebase from "firebase/app";
  import "firebase/firestore";
  
  export default {
    data() {
      return {
        description: "",
        amount: null,
      };
    },
    methods: {
      async addTransaction() {
        if (!this.description || !this.amount) return;
  
        const db = firebase.firestore();
        await db.collection("transactions").add({
          description: this.description,
          amount: this.amount,
          created_at: new Date(),
        });
  
        this.description = "";
        this.amount = null;
  
        this.$emit("transaction-added"); // optional event for parent to refresh list
      },
    },
  };
  </script>
  