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
                                <v-calendar v-model="selectedDate" :events="calendarEvents" color="indigo" :first-day-of-week="1" class="mx-auto" :show-week="true"></v-calendar>
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
                calendarEvents: [
                    { name: "Taken Date 1", start: "2025-03-10", end: "2025-03-10", color: "red" },
                    { name: "Taken Date 2", start: "2025-03-15", end: "2025-03-15", color: "red" },
                    { name: "Taken Date 3", start: "2025-03-20", end: "2025-03-20", color: "red" },
                    { name: "Taken Date 4", start: "2025-03-25", end: "2025-03-25", color: "red" },
                ],
            };
        },
        methods: {
            openDialog() {
                this.modal = true;
            },
            cancelDialog() {
                this.modal = false;
            },
        },
    };
</script>

<style scoped>
   
</style>