<template>
    <div>
        <!-- Services Button -->
        <v-btn color="indigo" @click="openDialog" class="white--text floating-btn">Book an appointment</v-btn>

        <!-- Dialog to show services -->
        <v-dialog v-model="modal" max-width="700px">
            <v-card class="elevation-0">
                <v-card-title class="pa-0">
                    <v-toolbar class="elevation-0">
                        <v-spacer></v-spacer>
                        <v-card-title class="headline">Appointment Request Form</v-card-title>
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
                        <v-form @submit.prevent="submitForm">
                            <!-- Name -->
                            <v-text-field v-model="form.name" label="Name" outlined dense required></v-text-field>

                            <!-- Age -->
                            <v-text-field v-model="form.age" label="Age" type="number" outlined dense required></v-text-field>

                            <!-- Email -->
                            <v-text-field v-model="form.email" label="Email" type="email" outlined dense required></v-text-field>

                            <!-- Contact Number -->
                            <v-text-field v-model="form.contact" label="Contact Number" type="tel" outlined dense required></v-text-field>

                            <!-- Services Select -->
                            <v-select v-model="form.service" :items="services" item-text="title" label="Select Service" outlined dense required></v-select>

                            <!-- Date Picker -->
                            <v-text-field type="date" v-model="form.date" label="Appointment Date" outlined dense required></v-text-field>

                            <!-- X-ray File Input -->
                            <v-file-input v-model="form.xray" label="Upload X-ray Image" prepend-icon="" prepend-inner-icon="mdi-file-image" accept="image/png, image/jpeg, image/bmp" type="file" outlined dense required></v-file-input>
                        </v-form>
                    </v-container>
                </v-card-text>

                <v-divider></v-divider>
                <!-- Dialog Actions -->
                <v-card-actions>
                    <v-btn class="text-capitalized" color="indigo" dark type="submit" block>Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modal: false,
                form: {
                    name: "",
                    age: "",
                    email: "",
                    contact: "",
                    service: null,
                    date: null,
                    xray: null,
                },
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
                // Reset form data
                this.form = {
                    name: "",
                    age: "",
                    email: "",
                    contact: "",
                    service: null,
                    date: null,
                    xray: null,
                };
            },
            submitForm() {
                // Here you can handle form submission logic
                console.log(this.form);
                this.cancelDialog();
            },
        },
    };
</script>

<style scoped>
    .floating-btn {
        position: absolute;
        bottom: 180px; /* Adjust as needed */
        left: 85%;
        transform: translateX(-50%);
    }
</style>
