<template>
    <div>
        <v-btn class="text-capitalized mr-3 white--text" color="indigo" @click="openDialog">Calculate Sales</v-btn>
        <v-dialog v-model="dialog" width="1000">
            <v-card>
                <v-card-title>
                    <v-spacer></v-spacer>
                    Compute Sales
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn icon @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-card-title>

                <v-divider></v-divider>
                <!-- Sales Input Section -->
                <v-card class="pa-5 mb-5 elevation-2" outlined>
                    <v-card-title class="text-h6 text-indigo-darken-2 font-weight-bold">Enter Today's Sales</v-card-title>
                    <v-card-text>
                        <v-row dense>
                            <v-col cols="12" md="3">
                                <v-text-field v-model="eight" label="8 oz Sales" type="number" outlined dense hide-details />
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-text-field v-model="twelve" label="12 oz Sales" type="number" outlined dense hide-details />
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-text-field v-model="sixteen" label="16 oz Sales" type="number" outlined dense hide-details />
                            </v-col>
                            <v-col cols="12" md="3" class="d-flex align-center">
                                <v-btn @click="handleSaveSales" color="indigo" dark class="mt-0" small>
                                    Add Sales
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

                <!-- Daily Summary Section -->
                <v-card class="pa-6 elevation-3 rounded-lg" outlined>
                    <v-card-title class="text-h5 text-indigo-darken-2 font-weight-bold">
                        Daily Summary
                    </v-card-title>
                    <v-card-text>
                        <div>
                            <v-container v-if="Object.keys(groupedExpenses).length > 0">
                                <v-row>
                                    <v-col cols="6" v-for="(expense, date) in groupedExpenses" :key="date" class="mb-6">
                                        <v-card class="pa-5 elevation-1 rounded-lg">
                                            <v-card-title class="text-h6 font-weight-bold mb-3">
                                                <v-icon color="indigo" left>mdi-calendar</v-icon>
                                                <strong>Date:</strong> {{ formatDate(date) }}
                                            </v-card-title>
                                            <v-card-text>
                                                <div class="mb-2"><strong>Puhunan:</strong> ₱{{ expense }}</div>
                                                <div class="mb-2"><strong>Kita (Sales):</strong> ₱{{ salesInput || 0 }}</div>
                                                <div><strong>Tubo (Profit):</strong> ₱{{ calculateProfit(date) || 0 }}</div>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>

                                    <v-col cols="6">
                                        <v-card class="pa-5 elevation-1 rounded-lg">
                                            <v-card-title class="text-h5 text-indigo-darken-2 font-weight-bold">
                                                <v-icon color="indigo" left>mdi-cart-outline</v-icon>
                                                <span>You Sold:</span>
                                            </v-card-title>
                                            <v-card-text class="text-h6">
                                                <div class="mb-2">
                                                    <v-chip color="indigo" text-color="white" class="ma-1" large> <strong>{{ eight || 0 }}</strong> × 8oz </v-chip>
                                                    <v-chip color="teal" text-color="white" class="ma-1" large> <strong>{{ twelve || 0 }}</strong> × 12oz </v-chip>
                                                    <v-chip color="purple" text-color="white" class="ma-1" large> <strong>{{ sixteen || 0 }}</strong> × 16oz </v-chip>
                                                </div>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>

                            <v-alert v-else type="info" text border="start" border-color="indigo" class="mt-4">
                                No expense data available yet.
                            </v-alert>
                        </div>
                    </v-card-text>
                </v-card>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import firebase from "firebase/app";
    import "firebase/database";
    export default {
        props: {
            inventoryData: {
                type: Array,
                required: true,
            },
        },
        data() {
            return {
                dialog: false,
                salesData: {}, // Store sales per day
                salesInput: 0, // User input for sales
                eight: 0,
                twelve: 0,
                sixteen: 0,
            };
        },
        computed: {
            // Group inventory data by date to calculate daily expenses (Puhunan)
            groupedExpenses() {
                const grouped = {};
                if (Array.isArray(this.inventoryData)) {
                    this.inventoryData.forEach((item) => {
                        const date = item.date; 
                        if (!grouped[date]) {
                            grouped[date] = 0;
                        }
                        grouped[date] += item.amount; 
                    });
                }
                return grouped;
            },
        },
        methods: {
            openDialog() {
                this.dialog = true;
            },
            // Add sales for a specific date
            addSales() {
                const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD
                if (this.salesInput > 0) {
                    this.salesData[today] = this.salesInput;
                } else {
                    this.$toast.error("Please enter a valid sales amount");
                }
            },
            // Calculate profit (Tubo) for a specific date
            calculateProfit(date) {
                const expenses = this.groupedExpenses[date] || 0; // Default to 0 if no expense
                const eights = this.eight * 5;
                const twelves = this.twelve * 10;
                const sixteens = this.twelve * 15;
                this.salesInput = eights + twelves + sixteens;
                const sales = this.salesInput || 0; // Default to 0 if no sales
                return sales - expenses; // Profit = Sales - Expenses
            },
            formatDate(date) {
                return new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
            },
            handleSaveSales() {
                const ref = firebase.database().ref("inventory/sales");
                const now = new Date().toISOString().split("T")[0];

                // Compute sales
                const eight = this.eight || 0;
                const twelve = this.twelve || 0;
                const sixteen = this.sixteen || 0;

                const totalSales = eight * 5 + twelve * 10 + sixteen * 15;
                this.salesInput = totalSales;

                // Get today's expense from groupedExpenses
                const expense = this.groupedExpenses[now] || 0;

                // Compute profit
                const profit = totalSales - expense;

                // Prepare the data
                const salesData = {
                    timestamp: now,
                    eight,
                    twelve,
                    sixteen,
                    salesInput: totalSales,
                    expense,
                    profit,
                };

                // Push to Firebase
                ref.push(salesData);

                // Optional reset
                this.resetSalesForm();
            },
            resetSalesForm() {
                this.eight = 0;
                this.twelve = 0;
                this.sixteen = 0;
                this.salesInput = 0;
            },
        },
    };
</script>

<style scoped>
    .main-bg {
        background: white;
        position: fixed;
    }
    .text-capitalized {
        text-transform: capitalize;
    }
</style>