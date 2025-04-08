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
                            name: "",
                            data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
                        },
                    ],
                    chart: {
                        height: 350,
                        type: "line",
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
                    forecastDataPoints: {
                        count: 7,
                    },
                    stroke: {
                        width: 5,
                        curve: "smooth",
                    },
                    xaxis: {
                        type: "datetime",
                        categories: [
                            "1/11/2000",
                            "2/11/2000",
                            "3/11/2000",
                            "4/11/2000",
                            "5/11/2000",
                            "6/11/2000",
                            "7/11/2000",
                            "8/11/2000",
                            "9/11/2000",
                            "10/11/2000",
                            "11/11/2000",
                            "12/11/2000",
                            "1/11/2001",
                            "2/11/2001",
                            "3/11/2001",
                            "4/11/2001",
                            "5/11/2001",
                            "6/11/2001",
                        ],
                        tickAmount: 10,
                        labels: {
                            formatter: function (value, timestamp, opts) {
                                return opts.dateFormatter(new Date(timestamp), "MMM");
                            },
                        },
                    },
                    fill: {
                        type: "gradient",
                        gradient: {
                            shade: "dark",
                            gradientToColors: ["#1ab7ea"],
                            shadeIntensity: 1,
                            type: "horizontal",
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [0, 100, 100, 100],
                        },
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