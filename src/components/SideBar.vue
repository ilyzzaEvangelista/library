<template>
    <v-app>
        <v-main class="shade">
            <v-container fluid>
                <h3 class="certificate-title">Certificates</h3>

                <div class="certificate">
                    <v-card flat color="transparent" class="bordered-card">
                        <a class="certificate-title" href="https://www.udemy.com/certificate/UC-939757df-89ee-4bab-a22c-9afa7b68a49a/" target="_blank" rel="noopener noreferrer">
                            VUE - The Complete Guide 2023
                        </a>
                        <p class="certificate-subtitle">(Includes Vue Router & Composition API)</p>
                        <p class="certificate-source">Udemy - Certificate of Completion (2023)</p>
                    </v-card>
                </div>

                <div class="certificate mt-5">
                    <v-card color="transparent" class="bordered-card" flat>
                        <a class="certificate-title" href="https://www.udemy.com/certificate/UC-65476329-a79a-423d-b224-983fb934ecbd/" target="_blank" rel="noopener noreferrer">
                            REACT - The Complete Guide 2023
                        </a>
                        <p class="certificate-subtitle">(Includes React Router & Redux)</p>
                        <p class="certificate-source">Udemy - Certificate of Completion (2023)</p>
                    </v-card>
                </div>

                <hr />
                <h3 class="certificate-title mb-5">Skills</h3>
                <v-row justify="center" class="skills-container">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon color="success" v-bind="attrs" v-on="on" size="40">mdi-vuejs</v-icon>
                        </template>
                        <span>Vue.js - Progressive JavaScript Framework</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon color="yellow" v-bind="attrs" v-on="on" size="40">mdi-language-javascript</v-icon>
                        </template>
                        <span>JavaScript - Programming Language of the Web</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on" size="40">mdi-github</v-icon>
                        </template>
                        <span>GitHub - Version Control & Collaboration</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon color="blue" v-bind="attrs" v-on="on" size="40">mdi-api</v-icon>
                        </template>
                        <span>REST API - Backend Communication</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon color="blue" v-bind="attrs" v-on="on" size="40">mdi-language-css3</v-icon>
                        </template>
                        <span>CSS - Styling the Web</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon color="purple" v-bind="attrs" v-on="on" size="40">mdi-bootstrap</v-icon>
                        </template>
                        <span>Bootstrap - Responsive Framework</span>
                    </v-tooltip>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
            };
        },
    };
</script>

<style scoped>
    .shade {
        position: fixed;
        top: 0;
        left: 0;
        width: 17%;
        height: 100vh; /* Ensures full height */
        background: linear-gradient(135deg, #b0c8f7, #f06292);
    }

    .certificate-title {
        color: #fff !important;
        text-transform: uppercase capitalize;
        font-weight: 500;
        transition: 0.3s;
        border-radius: 20px;
        padding: 6px 16px;
        text-decoration: none;
    }

    .certificate:hover {
        background: rgba(255, 255, 255, 0.071);
    }

    .bordered-card {
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        padding: 16px;
    }
</style>
