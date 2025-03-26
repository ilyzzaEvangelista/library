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

                    <v-row v-if="!selectedProject" class="ml-5">
                        <v-col v-for="project in projects" :key="project.id" cols="12" md="4">
                            <v-card @click="selectProject(project)" class="full-card">
                                <v-img :src="project.image" class="project-image mt-10" contain elevation-1 />
                                <v-card-title class="project-title">{{ project.name }}</v-card-title>
                                <v-card-subtitle class="project-desc">{{ project.description }}</v-card-subtitle>
                            </v-card>
                        </v-col>                        
                    </v-row>

                    <GoodreadsComponent v-if="selectedProject?.name === 'Library'" />
                    <VueDashboard v-if="selectedProject?.name === 'Dashboard'" />
                    <DentalMain v-if="selectedProject?.name === 'Appointment System'" />
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
    import GoodreadsComponent from "./good-reads/GoodreadsComponent.vue";
    import VueDashboard from "./dashboard/VueDashboard.vue";
    import DentalMain from "./dental/DentalMain.vue";
    export default {
        props: {
            setSelectedProject: Function, // Function passed from App.vue
        },
        components: {
            GoodreadsComponent,
            VueDashboard,
            DentalMain
        },
        data() {
            return {
                projects: [
                    {
                        id: 1,
                        name: "Library",
                        description: "A library built with Vue and Vuetify.",
                        image: "https://cdn-icons-png.flaticon.com/512/10278/10278270.png",
                    },
                    {
                        id: 2,
                        name: "Dashboard",
                        description: "A dashboard built with Vue and Vuetify.",
                        image: "https://static.vecteezy.com/system/resources/previews/048/734/931/non_2x/dashboard-colored-outline-icon-icon-related-to-overview-data-analytics-elements-illustration-vector.jpg",
                    },
                    {
                        id: 3,
                        name: "Appointment System",
                        description: "A dental appointment system built with Vue and Vuetify.",
                        image: "https://cdn-icons-png.flaticon.com/512/10634/10634599.png",
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
            },
            resetCrumbs() {
                this.selectedProject = null;
                this.setSelectedProject(null);
            },
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
    .projects-title {
        font-size: 1.5rem;
        font-weight: bold;
        color: #2196f3;
        margin-bottom: 10px;
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
        width: 100%;
        max-height: 150px;
        object-fit: cover; 
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
    }

    .project-title {
        font-size: 1.2rem;
        font-weight: bold;
        color: #1e88e5;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .project-desc {
        font-size: 0.9rem;
        color: #555;
    }

    .full-card {
        height: 100%;
        display: flex;
        flex-direction: column;
    }    

    .full-card:hover {
        transform: translateY(-5px);
        box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.1);
    }
</style>