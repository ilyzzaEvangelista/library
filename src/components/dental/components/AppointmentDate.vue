<template>
    <div>
        <!-- Services Button -->
        <v-btn text @click="openDialog">Dates</v-btn>

        <!-- Dialog to show services -->
        <v-dialog v-model="modal" max-width="1000px">
            <v-card class="elevation-0">
                <v-card-title class="pa-0">
                    <v-toolbar class="elevation-0">
                        <v-spacer></v-spacer>
                        <v-card-title class="headline">Available Dates</v-card-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon @click="cancelDialog">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                </v-card-title>
                <v-divider></v-divider>

                <!-- Services Grid -->
                <v-card-text>
                    <v-container>
                        <v-card>
                            <v-card-title>
                                <span class="headline">Current Month Calendar</span>
                            </v-card-title>
                            <v-card-text>
                                <v-calendar v-model="selectedDate" :events="calendarEvents" color="green" :first-day-of-week="1" class="mx-auto" :show-week="true">
                                    <template v-slot:event="props">
                                        <!-- Tooltip for each event -->
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <div v-bind="attrs" v-on="on" class="event-tooltip" :style="{ backgroundColor: props.event.color || 'red' }">
                                                    {{ props.event.name }}
                                                </div>
                                            </template>
                                            <span>{{ props.event.name }}</span>
                                        </v-tooltip>
                                    </template>
                                </v-calendar>
                            </v-card-text>
                        </v-card>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modal: false,
                selectedDate: null,
                calendarEvents: [], // Initially empty, will be populated with dates from localStorage
            };
        },
        mounted() {
            this.loadAppointmentsFromLocalStorage();
        },
        methods: {
            openDialog() {
                this.modal = true;
            },
            cancelDialog() {
                this.modal = false;
            },
            loadAppointmentsFromLocalStorage() {
                // Fetch appointments data from localStorage
                const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

                // Map stored appointments into calendar events
                const events = storedAppointments.map((appointment) => {
                    return {
                        name: `Taken: ${appointment.name}`, // Tooltip text
                        start: appointment.date, // Assume appointment.date is in "YYYY-MM-DD" format
                        end: appointment.date, // If you need end date as well
                        color: "#1A237E", // Set the color for marked dates
                        style: "white--text",
                    };
                });

                // Set the calendar events based on appointments
                this.calendarEvents = events;
            },
        },
    };
</script>

<style scoped>
    /* Style the date numbers in the calendar */
    .v-calendar__date--current,
    .v-calendar__date {
        color: white !important; /* Make the date number white */
    }

    /* Optionally style selected date for better contrast */
    .v-calendar__date--selected {
        color: white !important;
        background-color: rgb(133, 193, 4) !important; /* Keep the indigo background color for selected date */
    }

    /* Optional: Add some custom styles for better visibility */
    .v-calendar__date {
        font-weight: bold;
    }
</style>