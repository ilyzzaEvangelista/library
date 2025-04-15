<template>
    <div id="app">
        <!-- <v-app> -->
        <v-container fluid class="pa-10">
            <v-card class="pa-5 contact-card" flat>
                <h2 class="contact-title">Contact Me</h2>
                <p class="contact-subtitle">
                    I'd love to hear from you! Feel free to reach out.
                </p>
                <v-form ref="form" class="contact-form">
                    <v-text-field v-model="name" label="Your Name" outlined dense></v-text-field>
                    <v-text-field v-model="email" label="Your Email" outlined dense></v-text-field>
                    <v-btn color="primary" class="mt-3" @click="sendEmail">
                        Send Message
                    </v-btn>
                </v-form>
            </v-card>
        </v-container>
        <!-- </v-app> -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: "",
                email: "",
                message: "",
                recipientEmail: "your-email@gmail.com", // Replace with your email
            };
        },
        methods: {
            sendEmail() {
                const recipient = "ilyzzaevanz@gmail.com"; // Replace with your email
                const subject = encodeURIComponent("New Contact Message");
                const body = encodeURIComponent(`Name: ${this.name}\nEmail: ${this.email}\nMessage: `);

                // Open Gmail compose window in a new tab
                window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`, "_blank");
            },
        },
    };
</script>

<style scoped>
    .contact-container {
        max-width: auto;
        margin: auto;
        padding: 80px 70px;
        border-radius: 20px;
    }

    .contact-card {
        padding: 40px;
        border-radius: 16px;
    }

    .contact-title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 10px;
    }

    .contact-subtitle {
        text-align: center;
        margin-bottom: 20px;
        color: gray;
    }

    .contact-form {
        display: flex;
        flex-direction: column;
    }
</style>