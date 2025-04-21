<template>
    <div id="app">
        <v-app-bar app color="modern-app-bar" class="" flat>
            <v-container class="d-flex align-center justify-space-between">
                <v-spacer></v-spacer>
                <v-btn text class="nav-btn" @click="ToHome">Home</v-btn>
                <v-btn text class="nav-btn" @click="ToCertificates">Certificates</v-btn>
                <v-btn text class="nav-btn" @click="ToContact">Contact</v-btn>
            </v-container>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        methods: {
            ToContact() {
                this.$emit("scrollToContact");
            },
            ToHome() {
                this.$emit("scrollToHome");
            },
            ToCertificates() {
                this.$emit("scrollToCertificates");
            },
        },
    };
</script>

<style>
    body {
        background-color: #ffffff;
    }

    #app {
        font-family: "Poppins", sans-serif;
        text-align: center;
        color: #333;
        background-color: #f4f4f4;
    }

    .modern-app-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: linear-gradient(135deg, #90CAF9, #F48FB1);
        color: #fff;
        padding: 12px 20px;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    }

    .logo {
        font-size: 1.4rem;
        font-weight: bold;
        letter-spacing: 1px;
    }

    .nav-btn {
        color: #fcfcfc !important;
        text-transform: uppercase;
        font-weight: 500;
        transition: 0.3s;
        border-radius: 20px;
        padding: 6px 16px;
    }

    .nav-btn:hover {
        background: rgba(32, 32, 32, 0.2);
    }
</style>