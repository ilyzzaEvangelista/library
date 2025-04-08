<template>
    <v-app>
        <v-container fluid>
            <v-app-bar app color="indigo" dark>
                <v-toolbar-title>DASHBOARD</v-toolbar-title>
            </v-app-bar>
    
            <!-- Greetings & Weather -->
            <v-row>
                <v-col cols="12">
                    <v-card class="dashboard-container">
                        <v-row>
                            <v-col cols="6">
                                <v-card-text class="header-content mb-3">
                                    <!-- Greeting Section -->
                                    <div class="greeting">
                                        <span class="text-h4 font-weight-bold">{{ greeting }}! 👋</span>
                                    </div>

                                    <!-- Date & Weather Info -->
                                    <div class="details">
                                        <v-icon class="icon">mdi-calendar-today</v-icon>
                                        <span class="text-body-1">{{ currentDate }}</span>

                                        <v-icon class="icon">mdi-weather-partly-cloudy</v-icon>
                                        <span class="text-body-1">{{ weather.description }}, {{ weather.temp }}°C</span>
                                    </div>

                                    <!-- Quick Updates -->
                                    <div v-if="upcomingLeave || companyUpdate" class="quick-updates">
                                        <v-chip v-if="upcomingLeave" color="red" dark>
                                            📆 Upcoming Leave: {{ upcomingLeave }}
                                        </v-chip>

                                        <v-chip v-if="companyUpdate" color="blue" dark>
                                            🏢 {{ companyUpdate }}
                                        </v-chip>
                                    </div>
                                </v-card-text>

                                <v-divider></v-divider>
                                <v-col cols="12">
                                    <v-card-title class="text-h5 font-weight-bold">🌟 Today's Highlights</v-card-title>
                                    <TodaysHightlights/>
                                </v-col>
                            </v-col>
                            <v-col cols="6">
                                <v-col cols="12">
                                    <v-card-title class="text-h5 font-weight-bold">📊 Company Updates</v-card-title>
                                    <v-col cols="12">
                                        <AnnouncementChart />
                                    </v-col>
                                </v-col>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <v-card class="pa-3" elevation="1">
                        <CardList />
                    </v-card>
                </v-col>    
            </v-row>

            <!-- Third Row: Employees & Attendance -->
            <v-row>
                <v-col cols="12" md="6">
                    <v-card class="dashboard-card pb-5">
                        <v-card-title>Employee List using Chart.js</v-card-title>
                        <v-divider></v-divider>
                        <ListofEmployees />
                    </v-card>
                </v-col>

                <v-col cols="12" md="6">
                    <v-card class="dashboard-card pb-5">
                        <v-card-title>Attendance Overview Apexcharts </v-card-title>
                        <v-divider></v-divider>
                        <AttendanceChart />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    import axios from 'axios';
    import ListofEmployees from "./components/ListofEmployees.vue";
    import AttendanceChart from "./components/AttendanceChart.vue";
    import AnnouncementChart from "./components/AnnouncementChart.vue";
    import TodaysHightlights from "./components/TodaysHightlights.vue";
    import CardList from './components/CardList.vue';
    export default {
        components: {
            ListofEmployees,
            AttendanceChart,
            AnnouncementChart,
            TodaysHightlights,
            CardList
        },
        data() {
            return {
                currentDate: new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
                greeting: "",
                weather: { temp: "", description: "" },
                upcomingLeaves: [{ date: "2024-06-15", type: "Annual Leave" }],
                companyUpdates: [
                    { date: "2024-06-12", message: "New policy update on remote work." },
                    { date: "2024-06-15", message: "Company-wide virtual meeting at 10 AM." },
                ],
            };
        },
        methods: {
            fetchWeather() {
                axios
                    .get("https://api.open-meteo.com/v1/forecast?latitude=14.5995&longitude=120.9842&current_weather=true")
                    .then((response) => {
                        const weatherData = response.data.current_weather;
                        this.weather.temp = weatherData.temperature;
                        this.weather.description = weatherData.weathercode;
                    })
                    .catch((error) => console.error("Weather API error:", error));
            },
            setGreeting() {
                const hour = new Date().getHours();
                if (hour < 12) {
                    this.greeting = "Good morning";
                } else if (hour < 18) {
                    this.greeting = "Good afternoon";
                } else {
                    this.greeting = "Good evening";
                }
            },
        },
        mounted() {
            this.setGreeting();
            this.fetchWeather();
        },
    };
</script>

<style scoped>
    .header-card {
        background: linear-gradient(135deg, #ffffff, #ffffff);
        color: white;
        padding: 20px;
        border-radius: 12px;
        text-align: center;
    }

    .header-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .dashboard-card {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .dashboard-container {
        background: linear-gradient(135deg, #f7f7f7, #ffffff);
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        padding: 20px;
        border-radius: 12px;
    }

    .header-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 10px;
        padding-bottom: 12px;
    }

    .details {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .quick-updates {
        display: flex;
        gap: 10px;
        margin-top: 10px;
    }

</style>