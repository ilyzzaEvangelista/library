<template>
    <div class="chart-container">
        <div class="canvas-wrapper">
            <div ref="salesChart"></div>
        </div>
    </div>
</template>

<script>
    import ApexCharts from "apexcharts";

    export default {
        data() {
            return {
                chartInstance: null,
            };
        },
        mounted() {
            this.renderChart();
        },
        methods: {
            renderChart() {
                if (this.chartInstance) {
                    this.chartInstance.destroy();
                }

                var chartOptions = {
                    series: [
                        {
                            name: "Income",
                            type: "column",
                            data: [1.4, 2, 2.5, 1.5],
                        },
                        {
                            name: "Cashflow",
                            type: "column",
                            data: [1.1, 3, 3.1],
                        },
                        {
                            name: "Revenue",
                            type: "line",
                            data: [20, 29, 37],
                        },
                    ],
                    chart: {
                        height: 350,
                        type: "line",
                        stacked: false,
                        zoom: {
                            enabled: false,
                        },
                        toolbar: {
                            show: true, // Show the toolbar (if you want other toolbar features)
                            tools: {
                                download: false, // Disable the download button
                            },
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        width: [1, 1, 4],
                    },
                    title: {
                        text: "",
                        align: "left",
                        offsetX: 110,
                    },
                    xaxis: {
                        categories: [2009, 2010, 2011,],
                    },
                    yaxis: [
                        {
                            seriesName: "Income",
                            axisTicks: {
                                show: true,
                            },
                            axisBorder: {
                                show: true,
                                color: "#008FFB",
                            },
                            labels: {
                                style: {
                                    colors: "#008FFB",
                                },
                            },
                            title: {
                                text: "Income (thousand crores)",
                                style: {
                                    color: "#008FFB",
                                },
                            },
                            tooltip: {
                                enabled: true,
                            },
                        },
                        {
                            seriesName: "Cashflow",
                            opposite: true,
                            axisTicks: {
                                show: true,
                            },
                            axisBorder: {
                                show: true,
                                color: "#00E396",
                            },
                            labels: {
                                style: {
                                    colors: "#00E396",
                                },
                            },
                            title: {
                                text: "Operating Cashflow (thousand crores)",
                                style: {
                                    color: "#00E396",
                                },
                            },
                        },
                        {
                            seriesName: "Revenue",
                            opposite: true,
                            axisTicks: {
                                show: true,
                            },
                            axisBorder: {
                                show: true,
                                color: "#FEB019",
                            },
                            labels: {
                                style: {
                                    colors: "#FEB019",
                                },
                            },
                            title: {
                                text: "Revenue (thousand crores)",
                                style: {
                                    color: "#FEB019",
                                },
                            },
                        },
                    ],
                    tooltip: {
                        fixed: {
                            enabled: true,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                        },
                    },
                    legend: {
                        horizontalAlign: "left",
                        offsetX: 40,
                    },
                };

                // Create the chart instance and render
                this.chartInstance = new ApexCharts(this.$refs.salesChart, chartOptions);
                this.chartInstance.render();
            },
        },
    };
</script>

<style scoped>
    .chart-container {
        position: relative;
        width: auto;
        height: auto;
    }

    .canvas-wrapper {
        width: auto;
        height: auto;
    }
</style>