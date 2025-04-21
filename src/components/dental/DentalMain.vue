<template>
    <v-app style="background: #ffffff;">
        <BookedAppointments v-if="modal" :mode="'new'" :modal="modal" v-on:btnModal="btnModal" />
        <!-- Navigation Bar -->
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>URMAZA DENTAL CLINIC</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text @click="scrollToHome">Home</v-btn>
            <ServicesList />
            <v-btn text @click="scrollToWhoWeAre">About Us</v-btn>
            <AppointmentDate />
            <v-btn text @click="scrollToContact">Contact</v-btn>
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
                    <v-btn color="indigo" @click="openDialog" class="white--text mt-n10 mb-10" small>Book an appointment</v-btn>
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
                    <v-form v-model="formValid" @submit.prevent="submitForm">
                        <v-text-field v-model="name" label="Your Name" outlined dense required :rules="nameRules"></v-text-field>
                        <v-text-field v-model="email" label="Your Email" outlined dense required :rules="emailRules"></v-text-field>
                        <v-textarea v-model="message" label="Your Message" outlined dense required :rules="messageRules"></v-textarea>
                        <v-btn :disabled="!formValid" color="indigo" type="submit" class="white--text" block>
                            Submit
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
        
        <!-- Newsletter -->
        <v-container class="my-5 mb-10">
            <h3 class="text-center text-md-left">Subscribe to Our Newsletter</h3>
            <v-row>
                <v-col cols="12" md="8">
                    <v-text-field label="Enter your email" v-model="email" outlined dense></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-btn color="indigo" class="white--text" block>Subscribe</v-btn>
                </v-col>
            </v-row>
        </v-container>
        
        <!-- Footer -->
        <v-footer app style="background: #ffffff;">
            <v-container>
                <v-row>
                    <v-col cols="12" class="text-center">
                        <v-icon class="mx-2">mdi-facebook</v-icon>
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
        name: 'DentalMain',
        components: {
            ServicesList,
            BookedAppointments,
            AppointmentDate,
            LoginPage
        },
        data() {
            return {
                banner:
                    "https://t3.ftcdn.net/jpg/00/91/95/80/360_F_91958064_ungBuwmGQ70kPptl9mNEN27BuADArJob.jpg",
                logo:
                    "https://img.freepik.com/premium-vector/dental-logo-design-vector-templatecreative-dentist-logo-dental-clinic-vector-logo_607588-10199.jpg",
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
        mounted(){
            this.scrollToHome();
        },
        methods: {
            openDialog() {
                this.modal = true;
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
            submitForm() {
                alert("Form submitted!");
                this.name = "";
                this.email = "";
                this.message = "";
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