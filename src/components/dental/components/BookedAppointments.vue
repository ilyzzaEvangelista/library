<template>
    <div class="pa-5">
        <v-dialog v-model="modal" width="1300px" @input="loadAppointments">
            <v-card class="elevation-0 pa-5">
                <v-card-title class="pa-0">
                    <v-toolbar class="elevation-0">
                        <v-spacer></v-spacer>
                        <v-card-title class="headline">Booked Appointments</v-card-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon @click="cancelDialog">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                </v-card-title>
                <v-divider></v-divider>

                <div class="pa-3">
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="4">
                                <v-text-field v-model="searchTerm" class="mb-5" label="Search Books" append-icon="mdi-magnify" single-line hide-details outlined dense />
                            </v-col>
                            <v-col cols="8">
                                <div class="d-flex justify-end mt-7">
                                    <AppointmentForm :appointment="selectedItem" @appointment-added="addedAppointment" @appointment-updated="updatedAppointment" />
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </div>

                <v-data-table :headers="headers" :items="paginatedAppointments" :loading="loading" item-value="title" class="elevation-1" hide-default-footer>
                    <template v-slot:[`item.image`]="{ item }">
                        <v-btn class="text-capitalized" small v-if="item.image" text @click="viewImage(item.image)">
                            View Image
                        </v-btn>
                        <p v-else>N/A</p>
                    </template>

                    <template v-slot:[`item.date`]="{ item }">
                        <p class="mt-3"> {{ formatDate(item.date)}}</p>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                        <div class="d-flex justify-center align-center">
                            <AppointmentForm :appointment="item" @appointment-added="addedAppointment" @appointment-updated="updatedAppointment" />
                            <v-btn small color="#B71C1C" class="mx-2 text-capitalized" style="color: white;" @click="removeBook(item)">
                                {{ formattedLabels.delete }}
                            </v-btn>
                        </div>
                    </template>
                </v-data-table>

                <v-pagination v-model="page" :length="pageCount" color="#1A237E" class="mt-4"></v-pagination>
            </v-card>
        </v-dialog>

        <v-dialog v-model="imageDialog" max-width="400px">
            <v-card>
                <v-card-title class="pa-0">
                    <v-toolbar class="elevation-0">
                        <v-spacer></v-spacer>
                        <v-card-title>Book Cover</v-card-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon @click="imageDialog = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                </v-card-title>
                <hr />
                <v-card-text class="text-center mt-5">
                    <v-img :src="selectedImage" max-width="100%"></v-img>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import AppointmentForm from "./AppointmentForm.vue";

    export default {
        components: { AppointmentForm },
        data() {
            return {
                modal: true,
                page: 1,
                itemsPerPage: 5,
                loading: false,
                searchTerm: "",
                selectedImage: null,
                imageDialog: false,
                headers: [
                    { text: "Name", value: "name" },
                    { text: "Age", value: "age" },
                    { text: "Email", value: "email" },
                    { text: "Contact", value: "contact" },
                    { text: "Service", value: "service" },
                    { text: "Date", value: "date" },
                    { text: "X-ray", value: "image", align: 'center' },
                    { text: "Actions", value: "actions", align: 'center' },
                ],
                bookedAppointments: [],
                selectedItem: null,
            };
        },
        computed: {
            formattedLabels() {
                return {
                    edit: this.capitalizeSentence("edit"),
                    delete: this.capitalizeSentence("delete"),
                };
            },

            filteredAppointments() {
                return this.bookedAppointments.filter((form) => {
                    const searchTermLower = (this.searchTerm || "").toLowerCase();
                    const name = (form.name || "").toLowerCase();
                    const service = (form.service || "").toLowerCase();
                    return name.includes(searchTermLower) || service.includes(searchTermLower);
                });
            },

            pageCount() {
                return Math.ceil(this.filteredAppointments.length / this.itemsPerPage);
            },

            paginatedAppointments() {
                const start = (this.page - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.filteredAppointments.slice(start, end);
            },
        },
        watch: {
            modal(v) {
                if (v == false) {
                    this.modal = false;
                    this.$emit("btnModal", { type: "close" });
                }
            },
        },
        methods: {
            capitalizeSentence(text) {
                return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
            },
            openDialog() {
                this.modal = true;
            },

            cancelDialog() {
                this.modal = false;
                this.bookedAppointments = [];
            },

            formatDate(date) {
                return new Date(date).toLocaleDateString("en-US", { dateStyle: "long" });
            },

            updatedAppointment(updatedItems) {
                this.loading = true;

                setTimeout(() => {
                    if (updatedItems && updatedItems.id) {
                        const index = this.bookedAppointments.findIndex((appointment) => appointment.id === updatedItems.id);
                        if (index !== -1) {
                            this.bookedAppointments.splice(index, 1, updatedItems);
                            localStorage.setItem("appointments", JSON.stringify(this.bookedAppointments));
                        }
                    }
                    this.selectedItem = null;
                    this.loading = false;
                    this.loadAppointments();
                }, 3000);
            },

            addedAppointment(item) {
                this.loading = true;
                setTimeout(() => {
                    this.bookedAppointments.unshift(item);
                    this.loading = false;
                }, 3000);
            },

            viewImage(image) {
                this.selectedImage = image;
                this.imageDialog = true;
            },

            removeBook(item) {
                const index = this.bookedAppointments.findIndex((appointment) => appointment.id === item.id);
                if (index !== -1) {
                    this.bookedAppointments.splice(index, 1);
                    localStorage.setItem("appointments", JSON.stringify(this.bookedAppointments));
                }
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
        mounted() {
            this.loadAppointments(); 
        },
    };
</script>

<style scoped>
    .text-capitalized {
        text-transform: capitalize;
    }
</style>