<template>
    <v-app>
        <!-- Navigation Bar -->
        <v-app-bar app color="indigo" dark>
            <v-toolbar-title>URMAZA DENTAL CLINIC</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text @click="scrollToHome">Home</v-btn>
            <ServicesList />
            <v-btn text @click="scrollToWhoWeAre">About Us</v-btn>
            <AppointmentDate />
            <v-btn text @click="scrollToContact">Contact</v-btn>
        </v-app-bar>

        <!-- Home -->
        <v-container class="my-5" ref="Home">
            <v-row>
                <v-card class="pa-5" flat>
                    <v-row>
                        <v-col cols="12" md="6" class="d-flex flex-column justify-center">
                            <v-img :src="logo2" alt="Dental Clinic Image" height="500px" class="mx-auto mb-4"></v-img>
                            <ApprointmentForm />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-img :src="logo" alt="Dental Clinic Image" height="220px" class="mx-auto mt-10 mb-4"></v-img>
                        </v-col>
                    </v-row>
                </v-card>
            </v-row>
        </v-container>

        <!-- Testimonials Section -->
        <v-container class="my-5" style="background-color: #e0e0e0;">
            <h2 class="pa-3">Customer's Feedback</h2>
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
                <v-card flat>
                    <v-row>
                        <v-col cols="12" md="6" class="d-flex flex-column justify-center">
                            <h2 class="display-1 mb-4">Who We Are</h2>
                            <p>{{ desc }}</p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-img :src="logo2" alt="About Us Image"></v-img>
                        </v-col>
                    </v-row>
                </v-card>
            </v-row>
        </v-container>

        <!-- Contact Us -->
        <v-container class="my-5" ref="contactUs">
            <v-card class="pa-5" flat>
                <v-card-title class="text-center">
                    <v-spacer></v-spacer>
                    <h2>Contact Us</h2>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <v-form v-model="formValid" @submit.prevent="submitForm">
                        <v-text-field v-model="name" label="Your Name" outlined dense required :rules="[nameRules]"></v-text-field>
                        <v-text-field v-model="email" label="Your Email" outlined dense required :rules="[emailRules]"></v-text-field>
                        <v-textarea v-model="message" label="Your Message" outlined dense required :rules="[messageRules]"></v-textarea>
                        <v-btn :disabled="!formValid" color="indigo" type="submit"  class="white--text">
                            Submit
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>

        <v-container class="my-5 mb-10">
            <h3>Subscribe to Our Newsletter</h3>
            <v-text-field label="Enter your email" v-model="email" outlined></v-text-field>
            <v-btn color="indigo" class="white--text">Subscribe</v-btn>
        </v-container>

        <!-- Footer -->
        <v-footer app>
            <v-row>
                <v-col class="text-center" cols="12">
                    <v-icon>mdi-facebook</v-icon>
                    <v-icon>mdi-instagram</v-icon>
                    <v-icon>mdi-twitter</v-icon>
                </v-col>
                <v-col class="text-center" cols="12">
                    <span>&copy; 2025 Your Company. All rights reserved.</span>
                </v-col>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script>
    import ServicesList from "./components/ServicesList.vue";
    import ApprointmentForm from "./components/ApproinmentForm.vue";
    import AppointmentDate from "./components/AppointmentDate.vue";
    export default {
        components: {
            ServicesList,
            ApprointmentForm,
            AppointmentDate
        },
        data() {
            return {
                logo:
                    "https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/243164681_129569229425441_2735994999141557668_n.png?_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeEbP8-5Gi-7bJRCCF4jsRTzXw_dJ_esge5fD90n96yB7owGWIt5TRDCLfqYY2vLNWIcJNofz_vQDB_GP1dlT25D&_nc_ohc=KUHazhezqFMQ7kNvgH5UebF&_nc_oc=Adl-jnskXe4gC1duCDKZuvJt8VXvvsbcI105Y_x-zHBBUE9C091ccEiqGLjOBEFsgII&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=h7GLTAE4b7RySwHanVcJMg&oh=00_AYFfofMxZ-HhGYqSZbStemTROFzJMpTBZJo3WbPIJaocuw&oe=67E99C57",
                logo2:
                    "https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/225717845_107224814993216_6814638679737985542_n.png?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGer_JGu9ORstuXjrI6_fduMBNYGzn6L18wE1gbOfovX9TSRLJEYQ-Vlfjuc8xmVv9ZHGfUTErWU0mrI5hqHQdU&_nc_ohc=eUGU-KoqauYQ7kNvgEjv29f&_nc_oc=Adkl0nhbb3lU5UTPZg1K7Iw1Qka540wz9Idytkl199maToX16oJ-K8lVvaXAKRXXb4o&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=m7ktn7SYfm4F7DjiKQhOZg&oh=00_AYGI00wWrNCXybpHG7rXIXejkZ2EL80VFRPR9Se6RiMnEA&oe=67E9919A",
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
            };
        },
        methods: {
            scrollToWhoWeAre() {
                const whoWeAre = this.$refs.whoWeAre;
                if (whoWeAre) {
                    whoWeAre.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            },
            scrollToHome() {
                const Home = this.$refs.Home;
                if (Home) {
                    Home.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            },
            scrollToContact() {
                const contactUs = this.$refs.contactUs;
                if (contactUs) {
                    contactUs.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            },
            submitForm() {
                // Add your form submission logic here
                alert("Form submitted!");
                // Reset the form after submission
                this.name = "";
                this.email = "";
                this.message = "";
            },
        },
    };
</script>

<style scoped>
    body {
        background-color: #ffffff;
        color: black; /* Change text color to black */
    }
    .floating-btn {
        position: absolute;
        bottom: 180px; /* Adjust as needed */
        left: 85%;
        transform: translateX(-50%);
    }
</style>
