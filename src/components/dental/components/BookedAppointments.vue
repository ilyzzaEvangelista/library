<template>
  <div>
      <v-dialog v-model="modal" :width="$vuetify.breakpoint.smAndDown ? '100%' : '1300px'" scrollable>
          <span v-if="mode === 'new'">
              <AppointmentForm :stat="'new'" :appointment="selectedItem" @appointment-added="addedAppointment" @appointment-updated="updatedAppointment" />
          </span>

          <span v-else>
              <v-snackbar v-model="snackbar" :timeout="5000" color="white" top>
                  <v-icon color="red" class="mr-3 mb-1">mdi-information-outline</v-icon>
                  <span class="black--text">{{ snackbarMessage }}</span>
              </v-snackbar>

              <v-card class="elevation-0 pa-3">
                  <v-card-title class="pa-0">
                      <v-toolbar class="elevation-0" flat>
                          <v-spacer></v-spacer>
                          <v-card-title class="headline text-center text-wrap" style="white-space: normal;">
                              Welcome, {{ capitalizedUsername ? capitalizedUsername : 'Admin' }}!
                          </v-card-title>
                          <v-spacer></v-spacer>

                          <v-toolbar-items>
                              <v-tooltip bottom>
                                  <template #activator="{ on, attrs }">
                                      <v-btn icon v-bind="attrs" v-on="on" @click="cancelDialog">
                                          <v-icon>mdi-logout</v-icon>
                                      </v-btn>
                                  </template>
                                  <span>Logout</span>
                              </v-tooltip>
                          </v-toolbar-items>
                      </v-toolbar>
                  </v-card-title>

                  <v-divider class="my-2" />

                  <v-container fluid>
                      <v-row>
                          <v-col class="text-left">
                              <div class="d-flex flex-column">
                                  <h2>Booked Appointments</h2>
                                  <p>You may use this section to search, look at images, and modify or remove an appointment of a client.</p>
                              </div>
                          </v-col>
                      </v-row>

                      <v-row dense>
                          <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="searchTerm" class="mb-3" label="Search Appointment" append-icon="mdi-magnify" single-line hide-details outlined dense />
                          </v-col>
                      </v-row>

                      <!-- Horizontal scroll for small screens -->
                      <v-col cols="12">
                          <div style="overflow-x: auto;">
                              <v-data-table :headers="headers" :items="paginatedAppointments" :loading="loading" item-value="title" class="elevation-1" hide-default-footer dense>
                                  <template v-slot:[`item.image`]="{ item }">
                                      <v-btn class="text-capitalized" small v-if="item.image" text @click="viewImage(item.image)">
                                          View Image
                                      </v-btn>
                                      <p class="mt-3" v-else>N/A</p>
                                  </template>

                                  <template v-slot:[`item.date`]="{ item }">
                                      <p class="mt-3">{{ formatDate(item.date) }}</p>
                                  </template>

                                  <template v-slot:[`item.actions`]="{ item }">
                                      <div class="d-flex flex-column flex-sm-row justify-center align-center" :class="{ 'mb-5': $vuetify.breakpoint.name === 'xs' }">
                                          <AppointmentForm :appointment="item" @appointment-added="addedAppointment" @appointment-updated="updatedAppointment" />
                                          <v-btn small color="#B71C1C" class="mx-2 mt-2 mt-sm-0 text-capitalized" style="color: white;" @click="removeBook(item)">
                                              {{ formattedLabels.delete }}
                                          </v-btn>
                                      </div>
                                  </template>
                              </v-data-table>
                          </div>
                      </v-col>

                      <v-pagination v-model="page" :length="pageCount" color="#1A237E" class="mt-4" />
                  </v-container>
              </v-card>
          </span>
      </v-dialog>

      <v-dialog v-model="imageDialog" max-width="600px">
          <v-card>
              <v-card-title class="headline">
                  <v-spacer></v-spacer>
                  Image Preview
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                      <v-tooltip bottom>
                          <template #activator="{ on, attrs }">
                              <v-btn icon v-bind="attrs" v-on="on" @click="imageDialog = false">
                                  <v-icon>mdi-close</v-icon>
                              </v-btn>
                          </template>
                          <span>Logout</span>
                      </v-tooltip>
                  </v-toolbar-items>
              </v-card-title>

              <v-divider></v-divider>

              <v-card-text class="pa-5">
                  <v-img :src="selectedImage" aspect-ratio="1.5" max-height="500" contain />
              </v-card-text>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
  import AppointmentForm from "./AppointmentForm.vue";
  import firebase from "firebase/app";
  import "firebase/database";
  import { db2 } from "@/firebase/init";
  export default {
      name: "BookAppointments",
      components: { AppointmentForm },
      props: {
          mode: {
              type: String,
              default: "",
          },
          username: {
              type: String,
              required: true,
          },
          account_status: {
              type: String,
              default: "",
          },
      },
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
                  { text: "X-ray", value: "image", align: "center" },
                  { text: "Actions", value: "actions", align: "center" },
              ],
              bookedAppointments: [],
              selectedItem: null,
              snackbar: false,
              snackbarMessage: "",
              upcomingAppointment: null,
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
              const term = this.searchTerm.trim().toLowerCase();

              if (!term) return this.bookedAppointments;

              return this.bookedAppointments.filter((appointment) => {
                  const valuesToSearch = [appointment.name, appointment.age?.toString(), appointment.email, appointment.contact, appointment.service, this.formatDate(appointment.date)];

                  return valuesToSearch.some((val) => (val || "").toLowerCase().includes(term));
              });
          },

          paginatedAppointments() {
              const start = (this.page - 1) * this.itemsPerPage;
              return this.filteredAppointments.slice(start, start + this.itemsPerPage);
          },
          pageCount() {
              return Math.ceil(this.filteredAppointments.length / this.itemsPerPage);
          },

          capitalizedUsername() {
            if (this.username && this.username.length > 0) {
                return this.username.charAt(0).toUpperCase() + this.username.slice(1);
            }
            return ''; // return an empty string if username is not defined or empty
        }

      },
      watch: {
          modal(v) {
              if (v == false) {
                  this.modal = false;
                  this.$emit("btnModal", { type: "close" });
              }
          },
          searchTerm() {
              this.page = 1;
          },
          account_status(v) {
              console.log("Account status changed to:", v);
              if (v === "logged_in") {
                  this.modal = true;
              }
          },
      },

      methods: {
          viewImage(imageUrl) {
              this.selectedImage = imageUrl;
              this.imageDialog = true;
          },
          capitalizeSentence(text) {
              return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
          },
          openDialog() {
              this.modal = true;
          },

          fetchAppointment() {
              this.loading = true;
              const inventoryRef = db2.ref("dental/appointment"); // Change this to db2 if needed
              inventoryRef.on("value", (snapshot) => {
                  const data = snapshot.val();
                  if (data) {
                      this.bookedAppointments = Object.entries(data).map(([id, val]) => ({
                          id,
                          name: val.name,
                          age: val.age,
                          email: val.email,
                          contact: val.contact,
                          service: val.service,
                          date: val.date,
                          image: val.image,
                      }));
                  } else {
                      this.bookedAppointments = [];
                  }
                  this.page = 1;
                  this.loading = false;
              });
          },

          showSnackbar() {
              if (this.upcomingAppointment) {
                  this.snackbarMessage = `Upcoming Appointment: ${this.upcomingAppointment.name} 
                              on ${this.formatDate(this.upcomingAppointment.date)} 
                              for ${this.upcomingAppointment.service}`;
                  this.snackbar = true;
              }
          },

          cancelDialog() {
              this.$emit("logout");
              this.modal = false;
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
                          this.bookedAppointments.splice(index, 1, {
                              ...this.bookedAppointments[index],
                              ...updatedItems,
                          });
                      }
                  }
                  this.selectedItem = null;
                  this.loading = false;
              }, 3000);
          },

          // Remove appointment from db2
          removeBook(item) {
              this.$swal({
                  title: "Are you sure?",
                  text: "This appointment will be permanently deleted.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#8BC34A",
                  cancelButtonColor: "#EF9A9A",
                  confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                  if (result.isConfirmed) {
                      const transactionId = item.id;
                      firebase
                          .database()
                          .ref("dental/appointment/" + transactionId) 
                          .remove()
                          .then(() => {
                              this.bookedAppointments = this.bookedAppointments.filter((t) => t.id !== transactionId);
                              this.page = 1;
                              this.$toast.success("Item Removed!");
                          })
                          .catch((error) => {
                              this.$toast.error("Failed to delete item", error);
                          });
                  }
              });
          },
      },
      mounted() {
          this.fetchAppointment(); // Fetch appointments from db2 when mounted
      },
  };
</script>

<style scoped>
  .text-capitalized {
      text-transform: capitalize;
  }
</style>