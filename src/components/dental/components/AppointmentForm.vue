<template>
    <div>
        <v-btn color="#1A237E" @click="openDialog" small class="white--text text-capitalized">
            {{ appointment ? 'Update' : 'Book an appointment' }}
        </v-btn>

        <v-dialog v-model="modal" :width="dialogWidth">
            <v-card flat>
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
                <v-progress-linear :active="loading" :indeterminate="loading" absolute top color="#1A237E"></v-progress-linear>
                <v-card-text flat>
                    <v-container>
                        <v-form @submit.prevent="submitForm">
                            <!-- Name -->
                            <v-text-field v-model="form.name" label="Name" :rules="rules.rules" outlined dense required></v-text-field>

                            <!-- Age -->
                            <v-text-field v-model="form.age" label="Age" type="number" :rules="rules.rules" outlined dense required></v-text-field>

                            <!-- Email -->
                            <v-text-field v-model="form.email" label="Email" type="email" :rules="rules.rules" outlined dense required></v-text-field>

                            <!-- Contact Number -->
                            <v-text-field v-model="form.contact" label="Contact Number" type="tel" :rules="rules.rules" outlined dense required></v-text-field>

                            <!-- Services Select -->
                            <v-select v-model="form.service" :items="services" item-text="title" label="Select Service" :rules="rules.rules" outlined dense required></v-select>

                            <!-- Date Picker -->
                            <v-text-field type="date" v-model="form.date" label="Appointment Date" :rules="rules.rules" outlined dense required></v-text-field>

                            <!-- X-ray File Input -->
                            <v-file-input prepend-icon="" prepend-inner-icon="mdi-file-image" type="file" accept="image/png, image/jpeg, image/bmp" @change="onFileChange" :rules="rules.rules" :disabled="loading" outlined dense />
                        </v-form>
                    </v-container>
                </v-card-text>

                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="text-capitalized" color="#1A237E" small width="150px" dark @click="submitForm">
                        {{ appointment ? 'Update' : 'Submit' }}
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { POSITION } from "vue-toastification";
    export default {
        props: {
            appointment: {
                type: Object,
                default: () => ({
                    name: "",
                    age: "",
                    email: "",
                    contact: "",
                    service: null,
                    date: null,
                    image: null,
                }),
            },
        },
        data() {
            return {
                modal: false,
                form: { ...this.appointment },
                services: [
                    { title: "Braces", description: "Straighten your teeth with customized braces for a more confident smile." },
                    { title: "Teeth Whitening", description: "Achieve a brighter smile with professional teeth whitening solutions." },
                    { title: "Consultations", description: "Get expert advice on dental care and treatment options tailored to you." },
                    { title: "Clear Aligners", description: "Invisible and comfortable aligners to straighten your teeth discreetly." },
                    { title: "Extraction", description: "Safe and painless tooth extraction services for better oral health." },
                    { title: "Root Canal Treatment", description: "Relieve pain and save your tooth with our effective root canal treatments." },
                    { title: "Dental Implant", description: "Restore your smile with durable and natural-looking dental implants." },
                    { title: "Cleaning", description: "Professional cleaning services to maintain a healthy, bright smile." },
                    { title: "Pasta / Filling", description: "Fill cavities and restore the strength of your teeth with high-quality dental fillings." },
                ],
                isAdmin: false,
                bookedAppointments: [],
                loading: false,
                rules: {
                    rules: [(v) => !!v || "This is a required field."],
                },
            };
        },
        computed: {
            dialogWidth() {
                return this.isAdmin ? 1200 : 700;
            },
        },
        watch: {
            appointment: {
                handler(item) {
                    this.form = { ...item };
                },
                deep: true,
            },
        },
        mounted() {
            this.loadAppointments();
        },
        methods: {
            openDialog() {
                this.modal = true;
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                }, 3000);
            },
            viewImage(image) {
                this.selectedImage = image;
                this.imageDialog = true;
            },
            onFileChange(event) {
                const file = event instanceof File ? event : event?.target?.files?.[0] || event?.[0];
                if (file && file instanceof Blob) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.form.image = e.target.result;
                    };
                    reader.readAsDataURL(file);
                } else {
                    console.warn("Invalid file format or no file selected");
                }
            },
            cancelDialog() {
                this.modal = false;
                this.form = {
                    name: "",
                    age: "",
                    email: "",
                    contact: "",
                    service: null,
                    date: null,
                    image: null,
                };
            },
            submitForm() {
                this.loading = true;
                setTimeout(() => {
                    if (this.appointment) {
                        const updatedAppointments = this.bookedAppointments.map((appointment) => (appointment.id === this.appointment.id ? { ...this.form } : appointment));
                        this.bookedAppointments = updatedAppointments;
                        localStorage.setItem("appointments", JSON.stringify(this.bookedAppointments));
                        this.$emit("appointment-updated", { ...updatedAppointments });
                        this.$toast.success("Successfully updated appointment!", {
                            position: POSITION.BOTTOM_RIGHT,
                            timeout: 2000,
                            icon: "mdi-checkbox-marked-circle-outline",
                            pauseOnHover: true,
                        });
                    } else {
                        this.bookedAppointments.push({ ...this.form });
                        localStorage.setItem("appointments", JSON.stringify(this.bookedAppointments));
                        this.$emit("appointment-added", { ...this.form });
                        this.$toast.success("New appointment added successfully!", {
                            position: POSITION.BOTTOM_RIGHT,
                            timeout: 2000,
                            icon: "mdi-checkbox-marked-circle-outline",
                            pauseOnHover: true,
                        });
                    }

                    this.modal = false;
                    this.loading = false;
                }, 3000);
            },
            loadAppointments() {
                const storedAppointments = localStorage.getItem("appointments");
                if (storedAppointments) {
                    this.bookedAppointments = JSON.parse(storedAppointments);
                } else {
                    this.bookedAppointments = [];
                }
            },
        },
    };
</script>

<style scoped>
    .floating-btn {
        position: absolute;
        bottom: 180px;
        left: 85%;
        transform: translateX(-50%);
    }
    .text-capitalized {
        text-transform: capitalize;
    }
</style>