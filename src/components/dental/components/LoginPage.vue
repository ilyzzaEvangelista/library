<template>
    <div>
        <!-- Show BookedAppointments only if logged in -->
        <BookedAppointments v-if="modal" :account_status="status" :username="username" @logout="logout" />

        <!-- Show Login/Register button if not logged in -->
        <v-tooltip bottom color="#FAFAFA">
            <template v-slot:activator="{ on }">
                <v-btn class="menu-btn" @click="openDialog" color="white" v-bind="on" icon>
                    <v-icon size="20" color="white">mdi-login</v-icon>
                </v-btn>
            </template>
            <span class="black--text bold">Login here</span>
        </v-tooltip>

        <!-- Dialog for Login/Register -->
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="pa-0">
                    <v-toolbar class="elevation-0">
                        <v-spacer></v-spacer>
                        <v-card-title class="headline">{{ isRegistering ? "Admin Register" : "Admin Login" }}</v-card-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon @click="close">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-3">
                    <v-form ref="form">
                        <v-text-field v-if="isRegistering || true" v-model="email" :rules="rules.rules" label="Email" outlined dense></v-text-field>
                        <v-text-field v-model="username" label="Username" outlined dense></v-text-field>
                        <v-text-field v-model="password" label="Password" type="password" outlined dense></v-text-field>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn text @click="toggleRegister">
                        {{ isRegistering ? "Back to Login" : "Create Account" }}
                    </v-btn>

                    <v-spacer></v-spacer>
                    <v-btn class="text-capitalized" color="#1A237E" dark width="100" @click="isRegistering ? register() : login()">
                        {{ isRegistering ? "Register" : "Login" }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import "firebase/auth";
    import "firebase/database"; 
    import { auth2, db2 } from "../../../firebase/init"; 
    import BookedAppointments from "./BookedAppointments.vue";
    export default {
        components: {
            BookedAppointments,
        },
        data() {
            return {
                username: "",
                password: "",
                email: "",
                isRegistering: false,
                dialog: false,
                modal: false,
                rules: {
                    rules: [(v) => !!v || "This is a required field.", (v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
                },
                status: null,
            };
        },

        methods: {
            openDialog() {
                this.dialog = true;
            },

            // Register a new account using the second Firebase app
            async register() {
                if (this.$refs.form.validate()) {
                    try {
                        const userCredential = await auth2.createUserWithEmailAndPassword(this.email, this.password);
                        const user = userCredential.user;

                        await db2.ref(`dental/accounts/${user.uid}`).set({
                            username: this.username,
                            email: this.email,
                            status: "logged_in",
                        });

                        this.status = "logged_in";
                        this.$toast.success("Account registered successfully");

                        this.isRegistering = false;
                        this.$refs.form.reset();
                        this.dialog = false;
                    } catch (error) {
                        console.error("Registration error:", error);
                        this.$toast.error(error.message);
                    }
                }
            },

            // Login using the second Firebase app
            async login() {
                if (this.$refs.form.validate()) {
                    try {
                        const userCredential = await auth2.signInWithEmailAndPassword(this.email, this.password);
                        const user = userCredential.user;

                        const snapshot = await db2.ref(`dental/accounts/${user.uid}`).once("value");
                        const data = snapshot.val();

                        this.username = data?.username;
                        this.status = "logged_in";
                        this.dialog = false;

                        this.$toast.success("Logged in successfully");
                        this.openBook();
                    } catch (error) {
                        console.error("Login error:", error);
                        this.$toast.error("Invalid credentials");
                    }
                }
            },

            async logout() {
                try {
                    await auth2.signOut(); // Logout from second Firebase app
                    this.status = "logged_out";
                    this.username = "";
                    this.$toast.success("Logged out successfully");
                    this.dialog = false;
                    this.loginStatus = false;
                } catch (error) {
                    console.error("Logout error:", error);
                    this.$toast.error("Logout failed");
                }
            },

            checkLoginStatus() {
                auth2.onAuthStateChanged((user) => {
                    if (user) {
                        this.loginStatus = true;
                        this.openBook();
                    } else {
                        this.loginStatus = false;
                    }
                });
            },

            // Toggle between register and login modes
            toggleRegister() {
                this.isRegistering = !this.isRegistering;
                this.$refs.form.reset();
            },

            // Open the BookedAppointments modal
            openBook() {
                console.log(this.modal)
                this.modal = true;
            },

            // Close the login/register dialog
            close() {
                this.dialog = false;
                this.$refs.form.reset();
            },
        },

        mounted() {
            auth2.onAuthStateChanged(async (user) => {
                if (user) {
                    const snapshot = await db2.ref(`dental/accounts/${user.uid}`).once("value");
                    const data = snapshot.val();
                    this.username = data?.username;
                    this.status = "logged_in";
                    this.openBook();
                } else {
                    this.status = "logged_out";
                }
            });
        },
    };
</script>

<style scoped>
    .text-capitalized {
        text-transform: capitalize;
    }
</style>