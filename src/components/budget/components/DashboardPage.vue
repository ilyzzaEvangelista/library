<template>
    <div>
        <v-btn class="white--text text-capitalized" large color="#43A047" @click="openDialog">Get Started</v-btn>
        <v-dialog v-model="dashboardDialog" persistent fullscreen max-width="500px">
            <v-card>
                <v-card-title class="pa-0">
                    <v-toolbar class="elevation-0">
                        <v-spacer></v-spacer>
                        <v-card-title class="headline">Manage Your Expenses</v-card-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-tooltip bottom>
                                <template #activator="{ on, attrs }">
                                    <v-btn icon v-bind="attrs" v-on="on" @click="close">
                                        <v-icon>mdi-close</v-icon>
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
                                <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000" top>
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
                dashboardDialog: false,
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
                savingsGoal: 27825,
                chartInstance: null,
                incomeExpenseChart: null,
                snackbar: false,
                snackbarMessage: "",
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
        },
        watch: {
            savingsGoal: "renderChart",
            transactions: {
                handler() {
                    this.renderChart();
                    this.renderIncomeExpenseChart();
                },
                deep: true,
            },
        },
        methods: {
            openDialog() {
                this.dashboardDialog = true;
                this.$nextTick(() => {
                    this.renderChart();
                    this.renderIncomeExpenseChart();
                });
            },
            close() {
                this.dashboardDialog = false;
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
            handleSaveTransaction(transaction) {
                const ref = firebase.database().ref("transactions");
                if (transaction.id) {
                    ref.child(transaction.id).update({
                        description: transaction.description,
                        amount: transaction.amount,
                    });
                } else {
                    ref.push({
                        description: transaction.description,
                        amount: transaction.amount,
                    });
                }
            },
            editTransaction(item) {
                this.selectedTransaction = { ...item };
                this.showTransactionDialog = true;
            },
            deleteItem(item) {
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
                        const transactionId = item.id;
                        firebase
                            .database()
                            .ref("transactions/" + transactionId)
                            .remove()
                            .then(() => {
                                this.transactions = this.transactions.filter((t) => t.id !== transactionId);
                                this.page = 1;
                                this.$toast.success("Item Removed!");
                            })
                            .catch((error) => {
                                this.$toast.error("Failed to delete item", error);
                            });
                    }
                    
                });
            },
            renderChart() {
                if (!this.$refs.chartCanvas) return;
                if (this.chartInstance) this.chartInstance.destroy();

                const ctx = this.$refs.chartCanvas.getContext("2d");
                const expenses = this.totalExpenses;
                const goal = Number(this.savingsGoal);
                const remaining = Math.max(goal - expenses, 0);

                if (expenses > remaining * 1.5 && goal > 0) {
                    this.snackbarMessage = `⚠️ Warning: You only have approximately ₱${remaining} left in your savings.`;
                    this.snackbarColor = "red lighten-1";
                    this.snackbar = true;
                } else {
                    this.snackbarMessage = "";
                    this.snackbar = false;
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
                if (this.incomeExpenseChart) this.incomeExpenseChart.destroy();

                const ctx = this.$refs.incomeExpenseCanvas.getContext("2d");

                const labels = this.transactions.map((_, idx) => `Transaction ${idx + 1}`);
                const expenses = this.transactions.map((t) => Number(t.amount));

                this.incomeExpenseChart = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels,
                        datasets: [
                            {
                                label: "Expenses",
                                data: expenses,
                                backgroundColor: "#EF5350",
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: "Expense Breakdown",
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