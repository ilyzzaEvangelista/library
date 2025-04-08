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

                        <v-card-title>
                            <span class="headline">Calendar</span>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon @click="cancelDialog">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                </v-card-title>
                <v-divider></v-divider>

                <v-progress-linear :active="loading" :indeterminate="loading" absolute top color="#1A237E"></v-progress-linear>

                <!-- Month Navigation -->
                <v-row class="d-flex justify-center align-center mr-10 my-5">
                    <v-btn @click="goToPreviousMonth" icon>
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <span class="headline mt-0">{{ formattedMonth }}</span>
                    <v-btn @click="goToNextMonth" icon>
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-row>
                <v-card-text >
                    <v-container class="pt-0">
                        <v-card flat>
                            <v-card-text>
                                <v-calendar v-model="selectedDate" :events="calendarEvents" color="#BDBDBD" :first-day-of-week="1" class="mx-auto" :show-week="true" :min-date="minDate" :max-date="maxDate">
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
                selectedDate: new Date(),
                calendarEvents: [],
                loading: false,
                minDate: new Date().toISOString().split("T")[0],
                maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
            };
        },
        computed: {
            // Display the current month and year
            formattedMonth() {
                const options = { year: "numeric", month: "long" };
                return this.selectedDate.toLocaleDateString("en-US", options);
            },
        },
        mounted() {
            this.loadAppointmentsFromLocalStorage();
        },
        methods: {
            openDialog() {
                this.loadAppointmentsFromLocalStorage();
                this.modal = true;
            },
            cancelDialog() {
                this.modal = false;
            },
            loadAppointmentsFromLocalStorage() {
                this.loading = true;
                const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
                const events = storedAppointments.map((appointment) => {
                    return {
                        name: `Reserved`,
                        start: appointment.date,
                        end: appointment.date,
                        color: "#0077B5",
                        style: "white--text",
                    };
                });
                this.calendarEvents = events;
                this.loading = false;
            },
            goToPreviousMonth() {
                const prevMonth = new Date(this.selectedDate);
                prevMonth.setMonth(prevMonth.getMonth() - 1);
                this.selectedDate = prevMonth;
            },
            goToNextMonth() {
                const nextMonth = new Date(this.selectedDate);
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                this.selectedDate = nextMonth;
            },
        },
    };
</script>