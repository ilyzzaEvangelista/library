<template>
    <div>
        <!-- Show BookedAppointments only if logged in -->
        <BookedAppointments v-if="modal" @logout="logout" />

        <!-- Show Login button if not logged in -->
        <v-tooltip bottom color="#FAFAFA">
            <template v-slot:activator="{ on: tooltip }">
              <v-btn class="menu-btn" @click="openDialog" color="white" v-on="{ ...on, ...tooltip }" icon>
                <v-icon size="20" color="white">mdi-login</v-icon>
              </v-btn>
            </template>
            <span class="black--text bold">Login here</span>
          </v-tooltip>

        <v-dialog v-model="dialog" width="500">
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
                <v-card-text class="pa-3">
                    <v-form ref="form">
                        <v-text-field v-model="username" :rules="rules.rules" label="Username" outlined dense></v-text-field>
                        <v-text-field v-model="password" :rules="rules.rules" label="Password" type="password" outlined dense></v-text-field>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="text-capitalized" color="#1A237E" dark width="100" @click="login">Login</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import BookedAppointments from "./BookedAppointments.vue";

    export default {
        components: { BookedAppointments },
        data() {
            return {
                username: "",
                password: "",
                adminCredentials: {
                    username: "admin",
                    password: "admin", // Replace with a more secure method in production
                },
                dialog: false,
                modal: false,
                rules: {
                    rules: [(v) => !!v || "This is a required field."],
                },
            };
        },
        methods: {
            login() {
                if (this.username === this.adminCredentials.username && this.password === this.adminCredentials.password) {
                    localStorage.setItem("isLoggedIn", true); // Save login state
                    this.openBook(); // Open BookedAppointments modal
                } else {
                    alert("Invalid credentials");
                }
            },
            logout() {
                localStorage.removeItem("isLoggedIn"); // Remove login state
                this.close(); // Close the login dialog
                this.dialog = false; // Ensure dialog is closed
                this.modal = false; // Hide the BookedAppointments modal
            },
            close() {
                this.dialog = false; // Close login dialog
                this.$refs.form.reset(); // Reset the form fields
            },
            openDialog() {
                this.dialog = true; // Show login dialog
            },
            openBook() {
                this.modal = true; // Show the BookedAppointments component
            },
        },
    };
</script>

<style scoped>
    .text-capitalized {
        text-transform: capitalize;
    }
</style>