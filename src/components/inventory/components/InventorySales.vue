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
                                <v-tooltip v-if="isTodaySalesRecorded" top>
                                    <template v-slot:activator="{ on: onTooltip }">
                                        <v-btn class="text-capitalize" small v-on="{ ...onMenu, ...onTooltip }">Add Sales</v-btn>
                                    </template>
                                    <span>
                                        Sales for today are already recorded.<br />
                                        You can update today's data below.
                                    </span>
                                </v-tooltip>
                                <v-btn v-else color="indigo" dark class="text-capitalized mt-0" small @click="handleSaveSales">
                                    Add Sales
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

                <!-- Daily Summary Section -->
                <v-card class="pa-2 elevation-3 rounded-lg" outlined>
                    <v-card-title class="text-h5 text-indigo-darken-2 font-weight-bold">
                        Daily Summary
                    </v-card-title>
                    <v-card-text>
                        <div>
                            <v-container v-if="Object.keys(groupedExpenses).length > 0 || Object.keys(salesData).length > 0">
                                <v-col cols="12" md="3" class="mb-4">
                                    <v-text-field v-model="searchDate" label="Search by Date" type="date" outlined dense hide-details />
                                </v-col>

                                <v-col cols="12">
                                    <v-data-table :headers="tableHeaders" :items="paginatedInventory" dense hide-default-footer>
                                        <template v-slot:[`item.date`]="{ item }">
                                            <v-icon small color="indigo" class="mr-1">mdi-calendar</v-icon>
                                            {{ formatDate(item.date) }}
                                        </template>

                                        <template v-slot:[`item.expense`]="{ item }">
                                            ₱{{ item.expense }}
                                        </template>

                                        <template v-slot:[`item.sales`]="{ item }">
                                            ₱{{ item.sales }}
                                        </template>

                                        <template v-slot:[`item.profit`]="{ item }">
                                            ₱{{ item.profit }}
                                        </template>

                                        <template v-slot:[`item.eight`]="{ item }">
                                            <v-text-field v-model="item.eight" type="number" variant="plain" density="compact" hide-details class="pa-0 ma-0" />
                                        </template>

                                        <template v-slot:[`item.twelve`]="{ item }">
                                            <v-text-field v-model="item.twelve" type="number" variant="plain" density="compact" hide-details class="pa-0 ma-0" />
                                        </template>

                                        <template v-slot:[`item.sixteen`]="{ item }">
                                            <v-text-field v-model="item.sixteen" type="number" variant="plain" density="compact" hide-details class="pa-0 ma-0" />
                                        </template>

                                        <template v-slot:[`item.action`]="{ item }">
                                            <v-btn class="text-capitalized" color="indigo" x-small @click="updateSales(item)" dark>Update</v-btn>
                                        </template>
                                    </v-data-table>
                                    <v-pagination v-model="page" :length="pageCount" color="indigo" class="mt-4"></v-pagination>
                                </v-col>
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
                inventorySales: [],
                tableHeaders: [
                    { text: "Date", value: "date" },
                    { text: "Puhunan", value: "expense" },
                    { text: "8 oz", width: "100", value: "eight" },
                    { text: "12 oz", width: "100", value: "twelve" },
                    { text: "16 oz", width: "100", value: "sixteen" },
                    { text: "Kita (Sales)", value: "sales" },
                    { text: "Tubo (Profit)", value: "profit" },
                    { text: "Actions", value: "action" },
                ],
                page: 1,
                itemsPerPage: 5,
                searchDate: "", // New property for search input
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
            filteredData() {
                if (!this.searchDate) {
                    return this.tableData; // Return all data if no date is provided
                }
                return this.tableData.filter((item) => item.date === this.searchDate); // Filter data by date
            },
            tableData() {
                return Object.entries(this.groupedExpenses).map(([date, expense]) => {
                    const sale = this.inventorySales.find((s) => s.timestamp === date) || {};
                    const sales = sale.salesInput || 0;
                    const eight = sale.eight || 0;
                    const twelve = sale.twelve || 0;
                    const sixteen = sale.sixteen || 0;
                    const id = sale.id || null;
                    const profit = sales - expense;

                    return {
                        id,
                        date,
                        expense,
                        sales,
                        profit,
                        eight,
                        twelve,
                        sixteen,
                    };
                });
            },
            paginatedInventory() {
                const start = (this.page - 1) * this.itemsPerPage;
                return this.filteredData.slice(start, start + this.itemsPerPage); // Use filtered data here
            },
            pageCount() {
                return Math.ceil(this.filteredData.length / this.itemsPerPage); // Page count based on filtered data
            },
        },

        methods: {
            openDialog() {
                this.dialog = true;
                this.fetchSales();
            },
            fetchSales() {
                this.loading = true;
                const inventoryRef = firebase.database().ref("inventory/sales");
                inventoryRef.on("value", (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        this.inventorySales = Object.entries(data).map(([id, val]) => ({
                            id,
                            expense: val.expense,
                            salesInput: val.salesInput,
                            timestamp: val.timestamp,
                        }));
                    } else {
                        this.inventorySales = [];
                    }
                    this.loading = false;
                });
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
                const expenses = this.groupedExpenses[date] || 0;
                const eights = this.eight * 5;
                const twelves = this.twelve * 10;
                const sixteens = this.sixteen * 15; // <-- Fixed this line
                this.salesInput = eights + twelves + sixteens;
                const sales = this.salesInput || 0;
                return sales - expenses;
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
                this.salesData[now] = totalSales;

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

            updateSales(item) {
                const ref = firebase.database().ref(`inventory/sales/${item.id}`);
                const updatedSalesInput = item.eight * 5 + item.twelve * 10 + item.sixteen * 15;

                ref.update({
                    eight: item.eight,
                    twelve: item.twelve,
                    sixteen: item.sixteen,
                    salesInput: updatedSalesInput,
                })
                    .then(() => {
                        this.$toast.success("Sales updated successfully");
                    })
                    .catch((error) => {
                        console.error("Error updating sales:", error);
                        this.$toast.error("Failed to update sales");
                    });
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