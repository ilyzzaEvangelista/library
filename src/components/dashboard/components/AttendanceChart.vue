<template>
  <div class="chart-container">
    <!-- Menu for Chart Type Selection -->
    <div class="d-flex justify-start align-center">
      <v-menu offset-y left>
        <template v-slot:activator="{ on }">
          <v-tooltip top color="#FAFAFA">
            <template v-slot:activator="{ on: tooltip }">
              <v-btn class="menu-btn" color="white" v-on="{ ...on, ...tooltip }" icon>
                <v-icon color="black" size="20">mdi-chart-bar</v-icon>
              </v-btn>
            </template>
            <span class="black--text">Change Chart Type</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item
            v-for="(option, index) in chartTypes"
            :key="index"
            @click="changeChartType(option)"
          >
            <v-list-item-title>{{ capitalizeWords(option) + ' Chart' }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Menu for Date Range Filter -->
      <v-menu offset-y left>
        <template v-slot:activator="{ on }">
          <v-tooltip top color="#FAFAFA">
            <template v-slot:activator="{ on: tooltip }">
              <v-btn class="menu-btn filter-btn" color="white" v-on="{ ...on, ...tooltip }" icon>
                <v-icon color="black" size="20">mdi-filter-variant</v-icon>
              </v-btn>
            </template>
            <span class="black--text">Filter</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item
            v-for="(option, index) in filterOptions"
            :key="index"
            @click="updateFilter(option)"
          >
            <v-list-item-title>{{ option }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="canvas-wrapper">
      <div ref="attendanceChart"></div>
    </div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts';

export default {
  data() {
    return {
      selectedChartType: 'bar',
      selectedFilter: 'This Week',
      chartTypes: ['bar', 'line', 'pie'],
      filterOptions: ['This Week', 'This Month', 'Custom Range'],
      attendanceData: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        present: [30, 28, 32, 31, 29],
        absent: [2, 3, 1, 2, 4],
      },
      chartInstance: null,
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    capitalizeWords(text) {
      return text
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    },
    renderChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      let seriesData;
      const isPie = this.selectedChartType === 'pie';

      if (isPie) {
        seriesData = [
          this.attendanceData.present.reduce((a, b) => a + b, 0),
          this.attendanceData.absent.reduce((a, b) => a + b, 0),
        ];
      } else {
        seriesData = [
          { name: 'Present', data: this.attendanceData.present },
          { name: 'Absent', data: this.attendanceData.absent },
        ];
      }

      const chartOptions = {
        chart: {
          type: this.selectedChartType,
          height: '100%',
          width: '100%',
        },
        series: seriesData,
        ...(isPie && {
          labels: ['Present', 'Absent'],
        }),
        xaxis: {
          categories: isPie ? [] : this.attendanceData.labels,
        },
        fill: {
          opacity: this.selectedChartType === 'line' ? 1 : 2,
        },
        colors: ['rgba(75, 192, 192, 0.5)', '#FF6384'],
        height: 350,
        stacked: !isPie,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'last',
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: '13px',
                  fontWeight: 900,
                },
              },
            },
          },
        },
        legend: {
          position: 'bottom',
          offsetY: 15,
        },
        tooltip: {
          y: {
            formatter: (val) => `${val} student(s)`,
          },
        },
      };

      this.chartInstance = new ApexCharts(this.$refs.attendanceChart, chartOptions);
      this.chartInstance.render();
    },
    changeChartType(type) {
      this.selectedChartType = type;
      this.renderChart();
    },
    updateFilter(option) {
      this.selectedFilter = option;

      if (option === 'This Month') {
        this.attendanceData = {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          present: [120, 110, 130, 125],
          absent: [10, 15, 12, 14],
        };
      } else if (option === 'This Week') {
        this.attendanceData = {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          present: [30, 28, 32, 31, 29],
          absent: [2, 3, 1, 2, 4],
        };
      } else {
        this.attendanceData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          present: [150, 140, 160, 155, 165],
          absent: [12, 18, 15, 10, 14],
        };
      }

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
  gap: 40px;
}

.canvas-wrapper {
  width: 100%;
  height: 100%;
}

.menu-container {
  display: flex;
  align-items: flex-end;
  gap: 40px;
}

.menu-btn {
  position: absolute;
  top: -7px;
  right: 35px;
  z-index: 10;
}

.filter-btn {
  right: 70px;
}

.apexcharts.toolbar {
  color: black;
}
</style>
