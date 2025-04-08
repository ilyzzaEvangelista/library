<template>
  <div class="chart-container">
      <v-menu offset-y right>
          <template v-slot:activator="{ on: onMenu }">
              <v-tooltip top color="#FAFAFA">
                  <template v-slot:activator="{ on: onTooltip }">
                      <v-btn class="menu-btn" color="white" v-on="{ ...onMenu, ...onTooltip }" icon>
                          <v-icon color="black" size="20">mdi-chart-bar</v-icon>
                      </v-btn>
                  </template>
                  <span class="black--text">Change Chart Type</span>
              </v-tooltip>
          </template>

          <v-list>
              <v-list-item @click="changeChartType('bar')">
                  <v-list-item-title>Bar Chart</v-list-item-title>
              </v-list-item>
              <v-list-item @click="changeChartType('horizontalBar')">
                  <v-list-item-title>Horizontal Bar Chart</v-list-item-title>
              </v-list-item>
              <v-list-item @click="changeChartType('line')">
                  <v-list-item-title>Line Chart</v-list-item-title>
              </v-list-item>
          </v-list>
      </v-menu>

      <!-- Chart Canvas -->
      <div class="canvas-wrapper">
          <canvas ref="chartCanvas"></canvas>
      </div>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  data() {
    return {
      chartType: "bar",
      chartInstance: null, // Keep reference to chart instance
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext("2d");

      // Destroy previous chart if it exists
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart(ctx, {
        type: this.chartType === 'horizontalBar' ? 'bar' : this.chartType, // fallback for unsupported type
        data: {
          labels: ["January", "February", "March", "April", "May"],
          datasets: [
            {
              label: "Sales",
              data: [12, 19, 3, 5, 8],
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: this.chartType === 'horizontalBar' ? 'y' : 'x',
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },

    changeChartType(type) {
      this.chartType = type;
      this.renderChart(); 
    },
  },
};
</script>


<style scoped>
  .chart-container {
      position: relative;
      width: 100%;
      max-width: 600px;
      height: 400px;
      padding-top: 40px; 
  }

  .menu-btn {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
  }

  .canvas-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
  }

  canvas {
      width: 100% !important;
      height: 100% !important;
  }
</style>