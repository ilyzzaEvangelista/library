<template>
    <v-container fluid class="pa-10">
        <v-card class="main-card" flat>
            <v-row>
                <!-- Certificates Section -->
                <v-col cols="12" md="6">
                    <h3 class="section-title">Certificates</h3>
                    <v-card v-for="(cert, index) in certificates" :key="index" class="cert-card" flat>
                        <a class="certificate-title" :href="cert.link" target="_blank" rel="noopener noreferrer">
                            {{ cert.title }}
                        </a>
                        <p class="certificate-subtitle ma-0">{{ cert.subtitle }}</p>
                        <p class="certificate-source">{{ cert.source }}</p>
                    </v-card>
                </v-col>

                <!-- Skills Section -->
                <v-col cols="12" md="6">
                    <h3 class="section-title">Skills</h3>
                    <v-row justify="center" class="skills-container">
                        <v-tooltip bottom v-for="(skill, index) in skills" :key="index">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon :color="skill.color" v-bind="attrs" v-on="on" size="50" class="skill-icon">
                                    {{ skill.icon }}
                                </v-icon>
                            </template>
                            <span>{{ skill.label }}</span>
                        </v-tooltip>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                skills: [
                    { icon: "mdi-vuejs", color: "success", label: "Vue.js - Progressive JavaScript Framework" },
                    { icon: "mdi-language-javascript", color: "yellow", label: "JavaScript - Programming Language of the Web" },
                    { icon: "mdi-github", color: "", label: "GitHub - Version Control & Collaboration" },
                    { icon: "mdi-api", color: "blue", label: "REST API - Backend Communication" },
                    { icon: "mdi-language-css3", color: "blue", label: "CSS - Styling the Web" },
                    { icon: "mdi-bootstrap", color: "purple", label: "Bootstrap - Responsive Framework" },
                ],
                certificates: [
                    {
                        title: "VUE - The Complete Guide 2023",
                        subtitle: "(Includes Vue Router & Composition API)",
                        source: "Udemy - Certificate of Completion (2023)",
                        link: "https://www.udemy.com/certificate/UC-939757df-89ee-4bab-a22c-9afa7b68a49a/",
                    },
                    {
                        title: "REACT - The Complete Guide 2023",
                        subtitle: "(Includes React Router & Redux)",
                        source: "Udemy - Certificate of Completion (2023)",
                        link: "https://www.udemy.com/certificate/UC-65476329-a79a-423d-b224-983fb934ecbd/",
                    },
                ],
            };
        },
    };
</script>

<style scoped>
    #app {
        font-family: "Arial", sans-serif;
        margin: 90px;
        color: #ffffff;
    }
    .cert-container {
        max-width: auto;
        margin: auto;
        padding: 80px 70px;
        border-radius: 20px;
    }

    .main-card {
        padding: 40px;
        border-radius: 16px;
    }

    .section-title {
        font-size: 24px;
        font-weight: 600;
        text-transform: uppercase;
        color: #333;
        margin-bottom: 20px;
    }

    .cert-card {
        padding: 16px;
        border-radius: 12px;
        transition: all 0.3s ease;
    }

    .cert-card:hover {
        transform: translateY(-5px);
    }

    .certificate-title {
        font-size: 18px;
        font-weight: 500;
        color: #1e88e5;
        text-decoration: none;
        transition: color 0.3s;
    }

    .certificate-title:hover {
        color: #1565c0;
    }

    .certificate-subtitle {
        font-size: 14px;
        color: #666;
    }

    .certificate-source {
        font-size: 14px;
        color: #444;
        font-style: italic;
    }

    .skills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        justify-content: center;
    }

    .skill-icon {
        transition: transform 0.3s ease;
    }

    .skill-icon:hover {
        transform: scale(1.2);
    }
</style>