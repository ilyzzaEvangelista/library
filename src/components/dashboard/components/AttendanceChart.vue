<template>
    <div class="chart-container">
        <!-- Menu for Chart Type Selection -->
        <v-menu offset-y right>
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
                <v-list-item v-for="(option, index) in chartTypes" :key="index" @click="changeChartType(option)">
                    <v-list-item-title>{{ capitalizeWords(option) + ' Chart' }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <!-- Menu for Date Range Filter -->
        <v-menu offset-y right>
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
                <v-list-item v-for="(option, index) in filterOptions" :key="index" @click="updateFilter(option)">
                    <v-list-item-title>{{ option }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <div class="canvas-wrapper">
            <canvas ref="attendanceChart"></canvas>
        </div>
    </div>
</template>

<script>
    import Chart from "chart.js";

    export default {
        data() {
            return {
                selectedChartType: "bar",
                selectedFilter: "This Week",
                chartTypes: ["bar", "line", "pie"],
                filterOptions: ["This Week", "This Month", "Custom Range"],
                attendanceData: {
                    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(" ");
            },
            renderChart() {
                if (this.chartInstance) {
                    this.chartInstance.destroy();
                }
                const ctx = this.$refs.attendanceChart.getContext("2d");
                this.chartInstance = new Chart(ctx, {
                    type: this.selectedChartType,
                    data: {
                        labels: this.attendanceData.labels,
                        datasets: [
                            {
                                label: "Present",
                                backgroundColor: "rgba(54, 162, 235, 0.6)",
                                borderColor: "rgba(54, 162, 235, 1)",
                                data: this.attendanceData.present,
                                fill: this.selectedChartType !== "line",
                            },
                            {
                                label: "Absent",
                                backgroundColor: "rgba(255, 99, 132, 0.6)",
                                borderColor: "rgba(255, 99, 132, 1)",
                                data: this.attendanceData.absent,
                                fill: this.selectedChartType !== "line",
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
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
            changeChartType(type) {
                this.selectedChartType = type;
                this.renderChart();
            },
            updateFilter(option) {
                this.selectedFilter = option;

                // Update Data Based on Filter Selection
                if (option === "This Month") {
                    this.attendanceData = {
                        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                        present: [120, 110, 130, 125],
                        absent: [10, 15, 12, 14],
                    };
                } else if (option === "This Week") {
                    this.attendanceData = {
                        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                        present: [30, 28, 32, 31, 29],
                        absent: [2, 3, 1, 2, 4],
                    };
                } else {
                    this.attendanceData = {
                        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
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
    .canvas-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }

    .chart-container {
        position: relative;
        width: 100%;
        max-width: 600px;
        height: 400px;
        gap: 40px;
    }

    .menu-container {
        display: flex;
        align-items: flex-end;
        gap: 40px;
    }

    .menu-btn {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
    }

    .filter-btn {
        right: 50px;
    }
</style>