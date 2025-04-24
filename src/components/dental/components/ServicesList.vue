<template>
    <div>
        <!-- Services Button -->
        <v-btn class="mt-5" text @click="openDialog">Services</v-btn>

        <!-- Dialog to show services -->
        <v-dialog v-model="modal" max-width="1000px">
            <v-card class="elevation-0">
                <v-card-title class="pa-0">
                    <v-toolbar class="elevation-0">
                        <v-spacer></v-spacer>
                        <v-card-title class="headline">Our Services</v-card-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon @click="cancelDialog">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                </v-card-title>
                <v-divider></v-divider>

                <!-- Services Grid -->
                <v-card-text>
                    <v-container>
                        <v-row class="service-card-container">
                            <v-col v-for="service in services" :key="service.title" cols="12">
                                <v-expansion-panels>
                                    <v-expansion-panel>
                                        <v-expansion-panel-header class="faq-header">{{ service.title }}</v-expansion-panel-header>
                                        <v-expansion-panel-content class="small-text mt-5">
                                            {{ service.description }}
                                            <v-img :src="service.image" height="250px" class="service-card-image"></v-img>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modal: true,
                services: [
                    {
                        title: "Braces",
                        description: "Straighten your teeth with customized braces for a more confident smile.",
                        image: "https://dentalartsnola.com/wp-content/uploads/2024/07/adult-getting-braces-checked-by-dentsit-scaled.jpeg",
                    },
                    {
                        title: "Teeth Whitening",
                        description: "Achieve a brighter smile with professional teeth whitening solutions.",
                        image: "https://cdn.prod.website-files.com/65b959875cd83698c73de80b/65e62babd062dfeba5db20a8_Champaign%20Dental_Q1%20Blog%20Content-1-Professional%20Teeth%20Whitening%20Techniques-%20What%20Work.png",
                    },
                    {
                        title: "Consultations",
                        description: "Get expert advice on dental care and treatment options tailored to you.",
                        image: "https://via.placeholder.com/400x300",
                    },
                    {
                        title: "Clear Aligners",
                        description: "Invisible and comfortable aligners to straighten your teeth discreetly.",
                        image: "https://via.placeholder.com/400x300",
                    },
                    {
                        title: "Extraction",
                        description: "Safe and painless tooth extraction services for better oral health.",
                        image: "https://via.placeholder.com/400x300",
                    },
                    {
                        title: "Root Canal Treatment",
                        description: "Relieve pain and save your tooth with our effective root canal treatments.",
                        image: "https://via.placeholder.com/400x300",
                    },
                    {
                        title: "Dental Implant",
                        description: "Restore your smile with durable and natural-looking dental implants.",
                        image: "https://via.placeholder.com/400x300",
                    },
                    {
                        title: "Cleaning",
                        description: "Professional cleaning services to maintain a healthy, bright smile.",
                        image: "https://via.placeholder.com/400x300",
                    },
                    {
                        title: "Pasta / Filling",
                        description: "Fill cavities and restore the strength of your teeth with high-quality dental fillings.",
                        image: "https://via.placeholder.com/400x300",
                    },
                ],
            };
        },
        methods: {
            openDialog() {
                this.modal = true;
            },
            cancelDialog() {
                this.modal = false;
                this.$emit('servicesBtn');
            },
        },
    };
</script>

<style scoped>
    .service-card-container {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }

    .service-card {
        border-radius: 15px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .service-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    .service-card-image {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        object-fit: cover;
    }

    .service-card-title {
        text-align: center;
        font-weight: bold;
        font-size: 1.25rem;
        color: #333;
    }

    .service-card-description {
        text-align: center;
        font-size: 1rem;
        color: #555;
    }

    .v-dialog .v-card {
        max-width: 1000px;
    }

    .v-btn {
        margin-bottom: 20px;
    }

    .v-toolbar-title {
        font-size: 1.5rem;
        font-weight: bold;
        color: #333;
    }

    .service-expansion-panel {
        margin-bottom: 1rem;
        border-radius: 12px;
    }

    .service-card-image {
        border-radius: 12px 12px 0 0;
        object-fit: cover;
    }

    .service-card-title {
        font-weight: bold;
        color: #333;
        padding-left: 1rem;
    }

    .service-card-description {
        text-align: left;
        color: #555;
    }
</style>