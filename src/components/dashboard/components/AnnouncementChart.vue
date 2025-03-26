<template>
    <div class="announcements-container">
        <v-card class="update-card" flat>
            <v-text-field v-model="searchAnnouncements" label="Search Announcements" dense outlined prepend-inner-icon="mdi-magnify" hide-details class="mx-4"></v-text-field>
            <v-container fluid>
                <v-row>
                    <v-col cols="12">
                        <v-card flat class="pa-3">
                            <v-list>
                                <template v-if="filteredAnnouncements.length">
                                    <v-list-item v-for="(event, index) in filteredAnnouncements" :key="index">
                                        <v-list-item-avatar>
                                            <v-avatar color="blue lighten-3">
                                                <v-icon color="white">mdi-calendar</v-icon>
                                            </v-avatar>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title class="font-weight-bold">{{ event.title }}</v-list-item-title>
                                            <v-list-item-subtitle>{{ event.date }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>

                                <v-list-item v-else>
                                    <v-list-item-avatar>
                                        <v-avatar color="grey lighten-3">
                                            <v-icon color="white">mdi-calendar-remove</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title class="text-grey">No events found.</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                announcements: [
                    { title: "Office Relocation on August 1st", date: "July 10, 2024" },
                    { title: "New HR Policies Update", date: "July 15, 2024" },
                    { title: "Quarterly Performance Review", date: "July 20, 2024" },
                    { title: "Wellness Program Launch", date: "July 25, 2024" },
                ],
                searchAnnouncements: "",
            };
        },
        computed: {
            filteredAnnouncements() {
                return this.announcements.filter((a) => a.title.toLowerCase().includes(this.searchAnnouncements.toLowerCase()));
            },
        },
        methods: {},
    };
</script>

<style scoped>
    .update-card {
        border-radius: 10px;
        padding: 10px;
        box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease-in-out;
    }
</style>