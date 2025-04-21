<template>
  <div>
      <v-btn class="text-capitalized mr-3 white--text" color="indigo" @click="openDialog">Inventory Chart</v-btn>
      <v-dialog v-model="dialog" width="700">
          <v-card class="pa-5">
              <v-card-title>
                  <v-spacer></v-spacer>
                  Inventory Chart
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                      <v-btn icon @click="dialog = false">
                          <v-icon>mdi-close</v-icon>
                      </v-btn>
                  </v-toolbar-items>
              </v-card-title>

              <v-divider></v-divider>

              <v-row justify="end" class="mt-6">
                  <v-select v-model="filter" :items="['Today', 'This Week', 'This Month']" label="Filter" dense outlined style="max-width: 200px;"></v-select>
              </v-row>

              <canvas ref="salesChart"></canvas>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
  import Chart from "chart.js";

  export default {
      props: {
          inventorySales: Array, // Pass inventory data here
      },
      data() {
          return {
              dialog: false,
              chart: null,
              filter: "This Month",
          };
      },
      watch: {
          filter() {
              this.renderChart();
          },
          inventorySales: "renderChart", // Re-render chart when inventory data changes
      },
      mounted() {
          this.renderChart();
      },
      methods: {
          openDialog() {
              this.dialog = true;
              this.$nextTick(() => {
                  this.renderChart();
              });
          },
          renderChart() {
              if (this.chart) {
                  this.chart.destroy();
              }

              const labels = [];
              const expenseData = [];
              const salesData = [];

              const today = new Date();
              const startOfWeek = new Date(today);
              startOfWeek.setDate(today.getDate() - today.getDay());

              const groupedExpenses = {};
              const groupedSales = {};

              // Group expenses and sales data by date
              this.inventorySales.forEach((item) => {
                  const date = item.timestamp;
                  if (this.includeInFilter(date)) {
                      groupedExpenses[date] = (groupedExpenses[date] || 0) + item.expense;
                      groupedSales[date] = (groupedSales[date] || 0) + item.salesInput;
                  }
              });

              const allDates = [...new Set([...Object.keys(groupedExpenses), ...Object.keys(groupedSales)])].sort();

              allDates.forEach((date) => {
                  labels.push(this.formatDate(date));
                  expenseData.push(groupedExpenses[date] || 0);
                  salesData.push(groupedSales[date] || 0);
              });

              const ctx = this.$refs.salesChart.getContext("2d");
              this.chart = new Chart(ctx, {
                  type: "bar",
                  data: {
                      labels,
                      datasets: [
                          {
                              label: "Expenses (₱)",
                              backgroundColor: "rgba(75, 192, 192, 0.5)",
                              borderColor: "rgba(75, 192, 192, 1)",
                              borderWidth: 1,
                              data: expenseData,
                          },
                          {
                              label: "Sales (₱)",
                              backgroundColor: "rgba(75, 145, 192, 0.5)",
                              borderColor: "rgba(75, 145, 192)",
                              borderWidth: 1,
                              data: salesData,
                          },
                      ],
                  },
                  options: {
                      responsive: true,
                      scales: {
                          yAxes: [
                              {
                                  ticks: {
                                      beginAtZero: true,
                                  },
                              },
                          ],
                      },
                  },
              });
          },
          includeInFilter(dateStr) {
              const date = new Date(dateStr);
              const today = new Date();
              switch (this.filter) {
                  case "Today":
                      return date.toDateString() === today.toDateString();
                  case "This Week": {
                      const startOfWeek = new Date(today);
                      startOfWeek.setDate(today.getDate() - today.getDay());
                      return date >= startOfWeek && date <= today;
                  }
                  case "This Month": {
                      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                      return date >= startOfMonth && date <= today;
                  }
                  default:
                      return true;
              }
          },
          formatDate(dateStr) {
              return new Date(dateStr).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
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