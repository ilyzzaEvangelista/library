<template>
    <div>
        <v-row>
            <v-col cols="4">
                <v-card outlined>
                    <!-- Heading with sales amount -->
                    <h2 class="d-flex justify-start align-center ml-3 mt-4">{{formattedAmount}}</h2>
                    <h5 class="d-flex justify-start align-center ml-3">Sales</h5>

                    <!-- Line chart component -->
                    <line-chart />
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card outlined>
                    <!-- Heading with expenses amount -->
                    <h2 class="d-flex justify-start align-center ml-3 mt-4">{{formattedExpenses}}</h2>
                    <h5 class="d-flex justify-start align-center ml-3">Expenses</h5>
                    <!-- Line chart component -->
                    <ExpensesChart />
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card outlined>
                    <!-- Heading with profit amount -->
                    <h2 class="d-flex justify-start align-center ml-3 mt-4">{{formattedProfit}}</h2>
                    <h5 class="d-flex justify-start align-center ml-3">Profit</h5>
                    <!-- Line chart component -->
                    <ProfitChart />
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import LineChart from "./LineChart.vue";
import ExpensesChart from "./ExpensesChart.vue";
import ProfitChart from "./ProfitChart.vue";
export default {
    components: {
        LineChart,
        ExpensesChart,
        ProfitChart
    },
    data() {
        return {
            amount: 123987, // Initial sales amount
            expenses: 10000, // Initial expenses
            profit: 13478, // Initial profit
        };
    },
    computed: {
        // Format the sales amount with a dollar sign and commas
        formattedAmount() {
            return `$${this.amount.toLocaleString()}`;
        },
        // Format the expenses amount with a dollar sign and commas
        formattedExpenses() {
            return `$${this.expenses.toLocaleString()}`;
        },
        // Format the profit amount with a dollar sign and commas
        formattedProfit() {
            return `$${this.profit.toLocaleString()}`;
        },
    },
    mounted() {
        // Update the sales, expenses, and profit amounts every second
        setInterval(() => {
            this.amount += 3; // Increment sales by 3
            this.expenses += 5; // Increment expenses by 5
            this.profit += 2; // Increment profit by 2
        }, 1000);
    },
};
</script>

<style scoped>
.chart-container {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
