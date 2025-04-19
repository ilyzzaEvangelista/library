<template>
    <v-app>
        <v-app-bar app color="indigo" dark>
            <v-toolbar-title>LIST OF BOOKS</v-toolbar-title>
        </v-app-bar>
        <v-container fluid>
            <v-row>
                <v-card flat>
                    <v-row no-gutters>
                        <!-- Left: Content -->
                        <v-col cols="12" md="6" class="pa-8">
                            <div style="margin-top: 80px;">
                                <h1 class="font-weight-bold" style="font-size: 50px;">INVENTORY</h1>
                                <h1 class="font-weight-bold" style="font-size: 50px;">MANAGEMENT</h1>
                                <div class="mb-6 grey--text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </div>
                                <v-btn color="indigo" dark large rounded @click="toAddSection">Get Started</v-btn>
                            </div>
                        </v-col>
                        <!-- Right: Illustration (replace src with your own SVG/PNG) -->
                        <v-col cols="12" md="6" class="d-flex align-center justify-center pa-8">
                            <v-img :src="require('@/assets/inventory/inventory-landing-image.jpg')" alt="" height="500px" class="mx-auto mb-4"></v-img>
                        </v-col>
                    </v-row>

                    <div ref="addSection" style="margin-top: 150px;">
                        <v-card flat class="pa-5">
                            <div class="d-flex justify-center align-end">
                                <v-spacer></v-spacer>
                                <InventorySales :inventoryData="inventory" />
                                <InventoryChart :inventorySales="inventorySales" />
                                <v-btn class="text-capitalized mr-10 white--text" color="indigo" @click="showTransactionDialog = true">Add Item</v-btn>
                                <InventoryForm v-model="showTransactionDialog" :inventory="selectedTransaction" @save="handleSaveTransaction" />
                            </div>

                            <div class="pa-10">
                                <h3 class="pa-3">My Expenses</h3>
                                <v-data-table :headers="headers" :items="paginatedInventory" :loading="loading" class="elevation-1" hide-default-footer>
                                    <template v-slot:loading>
                                        <v-skeleton-loader type="table" />
                                    </template>
                                    <template v-slot:[`item.actions`]="{ item }">
                                        <div class="d-flex justify-center align-center">
                                            <v-btn small color="indigo" class="white--text text-capitalized" @click="editTransaction(item)">Update</v-btn>
                                            <v-btn small color="red lighten-1" class="white--text ml-2 text-capitalized" @click="deleteItem(item)">Delete</v-btn>
                                        </div>
                                    </template>
                                </v-data-table>
                                <v-pagination v-model="page" :length="pageCount" color="indigo" class="mt-4"></v-pagination>
                            </div>
                        </v-card>
                    </div>
                </v-card>
            </v-row>
        </v-container>

        <!-- Footer -->
        <v-footer app>
            <v-row>
                <v-col class="text-center" cols="12">
                    <v-icon>mdi-facebook</v-icon>
                    <v-icon>mdi-instagram</v-icon>
                    <v-icon>mdi-twitter</v-icon>
                </v-col>
                <v-col class="text-center" cols="12">
                    <span>&copy; 2025 Your Company. All rights reserved.</span>
                </v-col>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script>
    import firebase from "firebase/app";
    import "firebase/database";
    import InventorySales from "./components/InventorySales.vue";
    import InventoryForm from "./components/InventoryForm.vue";
    import InventoryChart from "./components/InventoryChart.vue";
    export default {
        components: { InventoryForm, InventorySales, InventoryChart },
        data() {
            return {
                showTransactionDialog: false,
                selectedTransaction: null,
                inventory: [],
                inventorySales: [],
                headers: [
                    { text: "Name", value: "name" },
                    { text: "Amount", value: "amount" },
                    { text: "Quantity", value: "quantity" },
                    { text: "Actions", align: "center", value: "actions", sortable: false },
                ],
                page: 1,
                itemsPerPage: 5,
                loading: false,
            };
        },
        computed: {
            paginatedInventory() {
                const start = (this.page - 1) * this.itemsPerPage;
                return this.inventory.slice(start, start + this.itemsPerPage);
            },
            pageCount() {
                return Math.ceil(this.inventory.length / this.itemsPerPage);
            },
        },
        mounted() {
            this.fetchInventory();
            this.fetchSales();
        },
        methods: {
            toAddSection() {
                const addSection = this.$refs.addSection;
                if (addSection) {
                    addSection.scrollIntoView({ behavior: "smooth" });
                }
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
            fetchInventory() {
                this.loading = true;
                const inventoryRef = firebase.database().ref("inventory/expenses");
                inventoryRef.on("value", (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        this.inventory = Object.entries(data).map(([id, val]) => ({
                            id,
                            name: val.name,
                            amount: val.amount,
                            size: val.size,
                            quantity: val.quantity,
                            date: val.timestamp,
                        }));
                    } else {
                        this.inventory = [];
                    }
                    this.page = 1;
                    this.loading = false;
                });
            },
            handleAddTransaction(transaction) {
                const newRef = firebase.database().ref("inventory/expenses").push();
                newRef.set({
                    name: transaction.name,
                    amount: transaction.amount,
                    size: transaction.size,
                    quantity: transaction.quantity,
                });
                this.$toast.success("Item Added!");
            },
            handleSaveTransaction(transaction) {
                const ref = firebase.database().ref("inventory/expenses");
                const now = new Date().toISOString().split("T")[0];
                if (transaction.id) {
                    // 🔄 UPDATE
                    ref.child(transaction.id).update({
                        name: transaction.name,
                        amount: transaction.amount,
                        size: transaction.size,
                        quantity: transaction.quantity,
                        timestamp: now,
                    });
                } else {
                    // ➕ ADD
                    ref.push({
                        name: transaction.name,
                        amount: transaction.amount,
                        size: transaction.size,
                        quantity: transaction.quantity,
                        timestamp: now,
                    });
                }
                this.showTransactionDialog = false;
                this.selectedTransaction = null;
            },
            editTransaction(item) {
                this.selectedTransaction = { ...item };
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
                        firebase
                            .database()
                            .ref("inventory/expenses/" + transactionId)
                            .remove()
                            .then(() => {
                                this.inventory = this.inventory.filter((t) => t.id !== transactionId);
                                this.page = 1;
                                this.$toast.success("Item Removed!");
                            })
                            .catch((error) => {
                                this.$toast.error("Failed to delete item", error);
                            });
                    }
                });
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