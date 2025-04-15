<template>
    <div>
        <DashboardPage v-if="dashboardDialog" @logout="logout" />
        <v-btn text @click="handleAuthAction">
            {{ isLoggedIn ? "Logout" : "Login" }}
          </v-btn>

        <v-dialog v-model="modal" width="500">
            <v-card>
                <v-card-title class="pa-0">
                    <v-toolbar class="elevation-0">
                        <v-spacer></v-spacer>
                        <v-card-title class="headline">Admin Login</v-card-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon @click="close">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text class="mt-5">
                    <v-form ref="form" @submit.prevent="loginUser">
                        <v-text-field v-model="email" type="email" placeholder="type admin@email.com" outlined dense required />
                        <v-text-field v-model="password" type="password" placeholder="type admin123" outlined dense required />
                        <v-btn class="white--text text-capitalized" type="submit" width="100" color="#388E3C">Login</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import firebase from "firebase/app";
    import "firebase/auth";
    import DashboardPage from "../components/DashboardPage.vue";

    export default {
        components: { DashboardPage },
        props: {
            isLoggedIn: Boolean,
        },
        data() {
            return {
                email: "",
                password: "",
                modal: false,
                dashboardDialog: false,
                user: null, // 🔥 track user directly
            };
        },
        computed: {
            userLoggedIn() {
                    return !!this.user;
                },
        },
        mounted() {
            firebase.auth().onAuthStateChanged((user) => {
                this.user = user;
            });
        },
        methods: {
            handleAuthAction() {
                if (this.isLoggedIn) {
                    firebase
                        .auth()
                        .signOut()
                        .then(() => {
                            this.$emit("logout");
                        });
                } else {
                    this.modal = true;
                }
            },
            close() {
                this.modal = false;
                this.$refs.form.reset();
            },
            async loginUser() {
                try {
                    await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
                    this.modal = false;
                    this.$toast.success("Login successful!");
                    this.openTransactionDialog();
                    this.$refs.form.reset();
                } catch (err) {
                    this.$toast.error("Login failed!");
                }
            },
            async logout() {
                try {
                    await firebase.auth().signOut();
                    this.$toast.success("Logged out!");
                    this.$refs.form.reset();
                } catch (error) {
                    this.$toast.error("Logout failed: " + error.message);
                }
            },
            openTransactionDialog() {
                this.dashboardDialog = true;
            },
        },
    };
</script>

<style scoped>
    .text-capitalized {
        text-transform: capitalize;
    }
</style>