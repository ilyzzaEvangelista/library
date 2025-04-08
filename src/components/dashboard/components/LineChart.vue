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
                salesData: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                    productA: [1500, 1800, 2000, 2200, 2500], // Sales data for Product A
                    productB: [1200, 1400, 1600, 1800, 2100], // Sales data for Product B
                },
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

                const chartOptions = {
                    series: [76, 67, 61, 90],
                    chart: {
                        height: 390,
                        type: "radialBar",
                        
                    },
                    plotOptions: {
                        radialBar: {
                            offsetY: 0,
                            startAngle: 0,
                            endAngle: 270,
                            hollow: {
                                margin: 5,
                                size: "30%",
                                background: "transparent",
                                image: undefined,
                            },
                            dataLabels: {
                                name: {
                                    show: false,
                                },
                                value: {
                                    show: false,
                                },
                            },
                            barLabels: {
                                enabled: true,
                                useSeriesColors: true,
                                offsetX: -8,
                                fontSize: "16px",
                                formatter: function (seriesName, opts) {
                                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
                                },
                            },
                        },
                    },
                    colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
                    labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                legend: {
                                    show: false,
                                },
                            },
                        },
                    ],
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