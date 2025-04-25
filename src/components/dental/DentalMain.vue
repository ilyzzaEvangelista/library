<template>
    <v-app style="background: #ffffff;">
        <BookedAppointments v-if="modal" :mode="'new'" :modal="modal" v-on:btnModal="btnModal" />
        <!-- Navigation Bar -->
        <AppointmentDate v-if="showAppointment" @appointmentDateBtn="showAppointment = false" />
        <ServicesList v-if="showServices" @servicesBtn="showServices = false" />
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>URMAZA DENTAL CLINIC</v-toolbar-title>
        
            <v-spacer />
        
            <!-- Menu Button -->
            <v-menu offset-y left>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon class="menu-btn" v-bind="attrs" v-on="on">
                        <v-icon color="white" size="25">mdi-menu</v-icon>
                    </v-btn>
                </template>
        
                <!-- Menu List -->
                <v-list>
                    <v-list-item @click="scrollToHome">
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>
        
                    <v-list-item @click="openServices">
                        <v-list-item-title>Service List</v-list-item-title>
                    </v-list-item>
        
                    <v-list-item @click="scrollToWhoWeAre">
                        <v-list-item-title>About Us</v-list-item-title>
                    </v-list-item>
        
                    <v-list-item @click="openAppointment">
                        <v-list-item-title>Appointment Dates</v-list-item-title>
                    </v-list-item>
        
                    <v-list-item @click="scrollToContact">
                        <v-list-item-title>Contact</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        
            <!-- Login Component -->
            <LoginPage />
        </v-app-bar>
        

        <!-- Home -->
        <v-container ref="Home">
            <v-row>
                <v-col cols="12" md="6" class="d-flex flex-column align-center justify-center">
                    <v-img style="max-height: 400px;" :src="require('@/assets/dental/logo.png')" alt="Dental Clinic Logo" contain></v-img>
                </v-col>

                <v-col cols="12" md="6" class="d-flex flex-column align-center justify-center">
                    <v-img style="max-height: 450px; margin-bottom: 10px;" :src="require('@/assets/dental/banner.png')" alt="Dental Clinic Banner" contain></v-img>
                    <v-btn color="indigo" @click="openDialog" class="white--text mt-n5 mb-5" small>Book an appointment</v-btn>
                </v-col>
            </v-row>
        </v-container>

        <!-- Testimonials Section -->
        <v-container class="my-5" style="background: #ffffff;">
            <h2 class="pa-3 text-center">Customer's Feedback</h2>
            <v-row>
                <v-col v-for="testimonial in testimonials" :key="testimonial.name" cols="12" sm="6" md="4">
                    <v-card class="mx-auto" outlined>
                        <v-card-text class="text-center">
                            <v-icon color="primary" class="display-2">mdi-quote</v-icon>
                            <p class="mt-4">{{ testimonial.feedback }}</p>
                            <v-divider></v-divider>
                            <div class="text-center mt-2">
                                <strong>{{ testimonial.name }}</strong>
                                <p>{{ testimonial.position }}</p>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <!-- About Us Section -->
        <v-container class="my-5" ref="whoWeAre">
            <v-row>
                <v-col cols="12" md="6" class="pa-4 d-flex flex-column justify-center">
                    <h2 class="text-h4 text-md-h3 mb-4">Who We Are</h2>
                    <p class="black--text">{{ desc }}</p>
                </v-col>
                <v-col cols="12" md="6" class="pa-4">
                    <v-img :src="require('@/assets/dental/logo.png')" alt="About Us Image" contain max-height="300"></v-img>
                </v-col>
            </v-row>
        </v-container>

        <!-- Contact Us -->
        <v-container class="my-5" ref="contactUs">
            <v-card class="pa-4" flat>
                <v-card-title class="text-center">
                    <v-spacer></v-spacer>
                    <h2 class="text-h5 text-md-h4">Contact Us</h2>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <v-form v-model="formValid" @submit.prevent="sendEmail">
                        <v-text-field v-model="name" label="Your Name" outlined dense required :rules="nameRules"></v-text-field>
                        <v-text-field v-model="email" label="Your Email" outlined dense required :rules="emailRules"></v-text-field>
                        <v-btn :disabled="!formValid" color="indigo" type="submit" class="white--text" block>
                            Submit
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>

        <!-- Footer -->
        <v-footer app style="background: #ffffff;">
            <v-container>
                <v-row>
                    <v-col cols="12" class="text-center">
                        <a href="https://www.facebook.com/urmazadental" target="_blank" class="mx-2" aria-label="Facebook">
                            <v-icon>mdi-facebook</v-icon>
                        </a>
                        <v-icon class="mx-2">mdi-instagram</v-icon>
                        <v-icon class="mx-2">mdi-twitter</v-icon>
                    </v-col>
                    <v-col cols="12" class="text-center">
                        <span>&copy; 2025 URMAZA Dental Clinic. All rights reserved.</span>
                    </v-col>
                </v-row>
            </v-container>
        </v-footer>
    </v-app>
</template>

<script>
    import ServicesList from "./components/ServicesList.vue";
    import BookedAppointments from "./components/BookedAppointments.vue";
    import AppointmentDate from "./components/AppointmentDate.vue";
    import LoginPage from "./components/LoginPage.vue";
    export default {
        name: "DentalMain",
        components: {
            ServicesList,
            BookedAppointments,
            AppointmentDate,
            LoginPage,
        },
        data() {
            return {
                showAppointment: false,
                showServices: false,
                banner: "https://t3.ftcdn.net/jpg/00/91/95/80/360_F_91958064_ungBuwmGQ70kPptl9mNEN27BuADArJob.jpg",
                logo: "https://img.freepik.com/premium-vector/dental-logo-design-vector-templatecreative-dentist-logo-dental-clinic-vector-logo_607588-10199.jpg",
                desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit dictumst tempus, condimentum massa habitasse commodo primis feugiat sagittis id, scelerisque mus montes aptent pharetra gravida nostra molestie.",
                testimonials: [
                    {
                        name: "John Smith",
                        position: "Founder, Tech Corp",
                        feedback: "Dignissim class mus facilisis suscipit pulvinar.",
                    },
                    {
                        name: "Jane Doe",
                        position: "Marketing Director, Bright Ideas",
                        feedback: "Eget orci dapibus mus accumsan nisi.",
                    },
                    {
                        name: "Kim Chiu",
                        position: "CEO, Global Solutions",
                        feedback: "Congue cum ridiculus platea nostra malesuada.",
                    },
                ],
                name: "",
                email: "",
                message: "",
                formValid: false,
                nameRules: [(v) => !!v || "Name is required"],
                emailRules: [(v) => !!v || "Email is required", (v) => /.+@.+\..+/.test(v) || "Email must be valid"],
                messageRules: [(v) => !!v || "Message is required"],
                modal: false,
            };
        },
        mounted() {
            this.scrollToHome();
        },
        methods: {
            openDialog() {
                this.modal = true;
            },
            openAppointment() {
                this.showAppointment = false;
                this.$nextTick(() => {
                    this.showAppointment = true;
                });
            },
            openServices() {
                this.showServices = false;
                this.$nextTick(() => {
                    this.showServices = true;
                });
            },
            sendEmail() {
                const recipient = "urmazadental@gmail.com";
                const subject = encodeURIComponent("Dental Appointment");
                const body = encodeURIComponent(`Name: ${this.name}\nEmail: ${this.email}\nMessage: `);

                // Open Gmail compose window in a new tab
                window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`, "_blank");
            },
            scrollToWhoWeAre() {
                const whoWeAre = this.$refs.whoWeAre;
                if (whoWeAre) {
                    whoWeAre.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            },
            scrollToHome() {
                window.scrollTo(0, 0);
            },
            scrollToContact() {
                const contactUs = this.$refs.contactUs;
                if (contactUs) {
                    contactUs.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            },
            async btnModal() {
                this.modal = !this.modal;
            },
        },
    };
</script>

<style scoped>
    body {
        background-color: #ffffff;
        color: black;
    }
    .floating-btn {
        margin-top: 20px;
    }
</style>