<template>
  <div>
      <v-dialog v-model="dashboardDialog" scrollable fullscreen :overlay="false" max-width="500px">
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
                  <v-row class="pa-5">
                      <v-col cols="6">
                          <v-card class="pa-5" elevation="1">
                              <v-snackbar v-model="snackbar" color="red lighten-1" timeout="3000" top>
                                  {{ snackbarMessage }}
                              </v-snackbar>
                              <v-text-field v-model="savingsGoal" label="Enter Your Savings Goal" outlined dense type="number" class="mt-5" />
                              <canvas ref="chartCanvas" height="100"></canvas>
                          </v-card>
                      </v-col>
                      <v-col cols="6">
                          <v-card class="pa-5" elevation="1">
                              <p>Income and Expenses History</p>
                              <canvas ref="incomeExpenseCanvas" height="100" style="margin-top: 60px;"></canvas>
                          </v-card>
                      </v-col>
                  </v-row>
                  <div class="d-flex justify-center align-end pa-5">
                      <v-spacer></v-spacer>
                      <v-btn class="text-capitalized white--text" small color="#388E3C" @click="showTransactionDialog = true">Add Transaction</v-btn>
                      <AddTransaction v-model="showTransactionDialog" :transaction="selectedTransaction" @save="handleSaveTransaction" />
                  </div>
                  <v-data-table :headers="headers" :items="paginatedTransactions" class="elevation-1" hide-default-footer>
                      <template v-slot:[`item.actions`]="{ item }">
                          <v-btn class="text-capitalized white--text" small color="#388E3C" @click="editTransaction(item)">Update</v-btn>
                          <v-btn class="text-capitalized white--text ml-5" small color="red lighten-1" @click="deleteItem(item)">Delete</v-btn>
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
  import Chart from "chart.js";
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
              savingsGoal: 3000,
              chartInstance: null,
              incomeExpenseChart: null,
              snackbar: false, // Controls snackbar visibility
              snackbarMessage: "", // Stores the message to be displayed in the snackbar
              snackbarColor: "red lighten-1",
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
          totalExpenses() {
              return this.transactions.reduce((sum, t) => sum + Number(t.amount), 0);
          },
      },
      mounted() {
          this.fetchTransactions();
          this.renderIncomeExpenseChart(); //
      },
      watch: {
          savingsGoal: "renderChart",
          transactions: "renderChart",
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
              this.$nextTick(() => this.renderChart());
              this.$nextTick(() => this.renderIncomeExpenseChart());
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
          deleteItem(transaction) {
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

                      // Perform the deletion operation
                      firebase
                          .database()
                          .ref("transactions/" + transactionId)
                          .remove()
                          .then(() => {
                              // Update the transactions array locally (without affecting modal state)
                              this.transactions = this.transactions.filter((t) => t.id !== transactionId);
                              this.$toast.success("Item Removed!");

                              // Ensure modal state isn't being changed unintentionally
                              // You can log `this.dashboardDialog` here to make sure it's unchanged
                          })
                          .catch((error) => {
                              this.$toast.error("Failed to delete item", error);
                          });
                  }
              });
          },

          renderChart() {
              if (!this.$refs.chartCanvas) return;

              if (this.chartInstance) {
                  this.chartInstance.destroy();
              }

              const ctx = this.$refs.chartCanvas.getContext("2d");

              const expenses = this.totalExpenses;
              const goal = Number(this.savingsGoal);
              const remaining = Math.max(goal - expenses, 0);

              // 🔔 Set warning message if expenses > 1.5 * remaining
              if (expenses > remaining * 1.5 && goal > 0) {
                  this.snackbarMessage = `⚠️ Warning: You only have approximately ₱${remaining} left in your savings.`;
                  this.snackbarColor = "red lighten-1"; // Set the color to red
                  this.snackbar = true; // Show the snackbar
              } else {
                  this.snackbarMessage = "";
                  this.snackbar = false; // Hide the snackbar
              }

              this.chartInstance = new Chart(ctx, {
                  type: "doughnut",
                  data: {
                      labels: ["Expenses", "Remaining"],
                      datasets: [
                          {
                              data: [expenses, remaining],
                              backgroundColor: ["#EF5350", "#66BB6A"],
                              hoverOffset: 10,
                          },
                      ],
                  },
                  options: {
                      responsive: true,
                      plugins: {
                          title: {
                              display: true,
                              text: `Savings Goal: ₱${goal} — Left: ₱${remaining}`,
                              font: { size: 18 },
                          },
                          tooltip: {
                              callbacks: {
                                  label: (context) => `₱${context.raw}`,
                              },
                          },
                      },
                  },
              });
          },

          renderIncomeExpenseChart() {
              if (!this.$refs.incomeExpenseCanvas) return;

              if (this.incomeExpenseChart) {
                  this.incomeExpenseChart.destroy();
              }

              const ctx = this.$refs.incomeExpenseCanvas.getContext("2d");

              this.incomeExpenseChart = new Chart(ctx, {
                  type: "bar",
                  data: {
                      labels: ["Jan", "Feb", "Mar"],
                      datasets: [
                          {
                              label: "Income",
                              data: [4000, 4200, 3900],
                              backgroundColor: "#4CAF50",
                          },
                          {
                              label: "Expenses",
                              data: [3200, 3000, 3500],
                              backgroundColor: "#EF5350",
                          },
                      ],
                  },
                  options: {
                      responsive: true,
                      plugins: {
                          title: {
                              display: true,
                              text: "Monthly Income vs Expenses",
                              font: { size: 18 },
                          },
                      },
                      scales: {
                          y: {
                              beginAtZero: true,
                              ticks: {
                                  callback: (value) => `₱${value}`,
                              },
                          },
                      },
                  },
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