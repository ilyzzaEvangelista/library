<template>
  <div>
      <v-dialog v-model="dashboardDialog" scrollable fullscreen :overlay="false" max-width="500px" @click:outside="false" transition="dialog-transition">
          <v-card>
              <v-card-title class="pa-0">
                  <v-toolbar class="elevation-0">
                      <v-spacer></v-spacer>
                      <v-card-title class="headline">Dashboard</v-card-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                          <v-tooltip bottom>
                              <template #activator="{ on, attrs }">
                                  <v-btn icon v-bind="attrs" v-on="on" @click="close">
                                      <v-icon>mdi-logout</v-icon>
                                  </v-btn>
                              </template>
                              <span>Logout</span>
                          </v-tooltip>
                      </v-toolbar-items>
                  </v-toolbar>
              </v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                  <div class="d-flex justify-center align-end pa-5">
                      <v-spacer></v-spacer>
                      <v-btn class="text-capitalized white--text" small color="#388E3C"  @click="showTransactionDialog = true">Add Transaction</v-btn>
                      <AddTransaction v-model="showTransactionDialog" :transaction="selectedTransaction" @save="handleSaveTransaction" />
                  </div>
                  <v-data-table :headers="headers" :items="paginatedTransactions" class="elevation-1" hide-default-footer>
                      <template v-slot:[`item.actions`]="{ item }">
                          <v-btn class="text-capitalized white--text" small color="#388E3C" @click="editTransaction(item)">Update</v-btn>
                          <v-btn class="text-capitalized white--text ml-5" small color="red ighten-1" @click="deleteTransaction(item)">Delete</v-btn>
                      </template>
                  </v-data-table>
                  <v-pagination v-model="page" :length="pageCount" color="#388E3C" class="mt-4"></v-pagination>
              </v-card-text>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
  import firebase from "firebase";
  import AddTransaction from "./AddTransaction.vue";
  export default {
      components: { AddTransaction },
      data() {
          return {
              dashboardDialog: true,
              activeTab: "table",
              headers: [
                  { text: "Description", align: "center", value: "description" },
                  { text: "Amount", align: "center", value: "amount" },
                  { text: "Actions", align: "center", value: "actions", sortable: false },
              ],
              page: 1,
              itemsPerPage: 5,
              selectedTransaction: null,
              showTransactionDialog: false,
              transactions: [],
          };
      },
      computed: {
          paginatedTransactions() {
              const start = (this.page - 1) * this.itemsPerPage;
              return this.transactions.slice(start, start + this.itemsPerPage);
          },
          pageCount() {
              return Math.ceil(this.transactions.length / this.itemsPerPage);
          },
      },
      mounted() {
          this.fetchTransactions();
      },
      methods: {
          close() {
              this.dashboardDialog = false;
              this.$emit("logout");
          },
          fetchTransactions() {
              const transactionsRef = firebase.database().ref("transactions");
              transactionsRef.on("value", (snapshot) => {
                  const data = snapshot.val();
                  if (data) {
                      this.transactions = Object.entries(data).map(([id, val]) => ({
                          id,
                          description: val.description,
                          amount: val.amount,
                      }));
                  } else {
                      this.transactions = [];
                  }
              });
          },
          handleAddTransaction(transaction) {
              const newRef = firebase.database().ref("transactions").push();
              newRef.set({
                  description: transaction.description,
                  amount: transaction.amount,
              });
              this.$toast.success("Item Added!");
          },
          handleSaveTransaction(transaction) {
              const ref = firebase.database().ref("transactions");
              if (transaction.id) {
                  // 🔄 UPDATE
                  ref.child(transaction.id).update({
                      description: transaction.description,
                      amount: transaction.amount,
                  });
              } else {
                  // ➕ ADD
                  ref.push({
                      description: transaction.description,
                      amount: transaction.amount,
                  });
              }
          },
          editTransaction(item) {
              this.selectedTransaction = { ...item }; // set transaction for editing
              this.showTransactionDialog = true;
          },
          deleteTransaction(transaction) {
              this.$swal({
                  title: "Are you sure?",
                  text: "This transaction will be permanently deleted.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#8BC34A",
                  cancelButtonColor: "#EF9A9A",
                  confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                  if (result.isConfirmed) {
                      const transactionId = transaction.id;
                      firebase
                          .database()
                          .ref("transactions/" + transactionId)
                          .remove();
                      this.$toast.success("Item Removed!");
                  }
              });
          },
      },
  };
</script>

<style scoped>
  .text-capitalized {
      text-transform: capitalize;
  }
</style>