<template>
    <div>
        <v-container fluid class="mt-5">
            <div class="profile-container">
                <div>
                    <v-breadcrumbs :items="breadcrumbs" divider="/" class="my-4">
                        <template v-slot:item="{ item }">
                            <v-breadcrumbs-item @click="resetCrumbs" :disabled="item.disabled" class="indigo--text crumb">
                                {{ item.text }}
                            </v-breadcrumbs-item>
                        </template>
                    </v-breadcrumbs>

                    <v-row v-if="!selectedProject" class="ml-2">
                        <v-col v-for="project in projects" :key="project.id" cols="12" md="3">
                            <v-card @click="selectProject(project)" class="full-card">
                                <v-img :src="project.image" class="project-image mt-10" contain elevation-1 />
                                <v-card-title class="project-title">{{ project.name }}</v-card-title>
                                <v-card-subtitle class="project-desc">{{ project.description }}</v-card-subtitle>
                            </v-card>
                        </v-col>                        
                    </v-row>
                    <router-view to="/library" v-if="selectedProject?.name === 'Library'"></router-view>
                    <router-view to="/dashboard" v-if="selectedProject?.name === 'Dashboard'"></router-view>
                    <router-view to="/dental" v-if="selectedProject?.name === 'Appointment System'"></router-view>
                    <router-view to="/budget-tracker" v-if="selectedProject?.name === 'Budget Tracker'"></router-view>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
    export default {
        props: {
            setSelectedProject: Function, // Function passed from App.vue
        },
        data() {
            return {
                projects: [
                    {
                        id: 1,
                        name: "Library",
                        description: "A library built with Vue and Vuetify. This allows the user to search, add, edit, and remove books.",
                        image: "https://cdn-icons-png.flaticon.com/512/10278/10278270.png",
                    },
                    {
                        id: 2,
                        name: "Dashboard",
                        description: "A dashboard constructed with Vue and Vuetify. This dashboard displays the date, time, weather, and temperature. Highlights of the office, including future vacations, public holidays, and corporate updates (searchable). Includes charts created using ApexCharts and Chart.js as well.",
                        image: "https://static.vecteezy.com/system/resources/previews/048/734/931/non_2x/dashboard-colored-outline-icon-icon-related-to-overview-data-analytics-elements-illustration-vector.jpg",
                    },
                    {
                        id: 3,
                        name: "Appointment System",
                        description: "An appointment scheduling system for dentists created with Vue and Vuetify. The user can look through services, check available dates, and make an appointment. The dentist has the ability to see, search, and remove the list of all appointments.",
                        image: "https://cdn-icons-png.flaticon.com/512/10634/10634599.png",
                    },
                    {
                        id: 4,
                        name: "Budget Tracker",
                        description: "Add expenses, categorize them, and track spending. Use charts (via Chart.js) for visual summaries. Firebase for user auth and storing expense data.",
                        image: "https://img.freepik.com/premium-vector/expense-tracker-icons-monthly-daily-spending-management_1256803-16852.jpg",
                    },
                ],
                selectedProject: null,
                breadcrumbs: [{ text: "Home", disabled: false, link: "/" }],
            };
        },
        watch: {
            selectedProject(newVal) {
                this.breadcrumbs[0].disabled = !newVal;
            },
        },
        methods: {
            selectProject(project) {
                this.selectedProject = project;
                this.setSelectedProject(project);
                if (project.name === "Appointment System" && this.$route.path !== "/dental") {
                    this.$router.push("/dental");
                }else if(project.name === "Dashboard" && this.$route.path !== "/dashboard"){
                    this.$router.push("/dashboard");
                }else if(project.name === "Library" && this.$route.path !== "/library"){
                    this.$router.push("/library");
                }else if(project.name === "Budget Tracker" && this.$route.path !== "/budget-tracker"){
                    this.$router.push("/budget-tracker");
                }
            },
            resetCrumbs() {
                this.selectedProject = null;
                this.setSelectedProject(null);
                this.$router.push("/");
            }
        },
    };
</script>

<style scoped>
    .project-container {
        max-width: auto;
        margin: auto;
        padding: 40px 20px;
    }
    .profile-container {
        border-radius: 20px;
        padding: 20px;
        text-align: center;
    }
    .divider {
        margin: 20px 0;
        border: none;
        height: 1px;
        background: #ddd;
    }
    .project-title {
        font-size: 1rem; /* was 1.2rem */
    }
    
    .project-desc {
        font-size: 0.75rem; /* was 0.9rem */
    }
    .project-card {
        border-radius: 12px;
        overflow: hidden;
        transition: transform 0.3s ease-in-out, box-shadow 0.3s;
    }
    .project-card:hover {
        transform: translateY(-5px);
    }
    .project-image {
        max-height: 100px; /* reduced from 150px */
        margin-top: 5px;   /* reduced margin */
    }
    .project-title {
        font-size: 1.2rem;
        font-weight: bold;
        color: #1e88e5;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .full-card {
        height: 100%;
        padding: 10px; /* added padding */
        gap: 5px; /* optional: for better spacing between items */
    }    

    .full-card:hover {
        transform: translateY(-5px);
        box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.1);
    }
</style>