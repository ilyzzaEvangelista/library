<template>
    <div id="app">
        <v-list class="highlights-list">
            <v-list-item v-if="todaysHoliday">
                <v-list-item-icon>
                    <v-icon color="red">mdi-calendar-star</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="text-body-1 font-weight-medium"> 🎉 Public Holiday: <strong>{{ todaysHoliday }}</strong> </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="upcomingLeave">
                <v-list-item-icon>
                    <v-icon color="orange">mdi-briefcase-off</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="text-body-1 font-weight-medium"> 📆 Your upcoming leave: <strong>{{ upcomingLeave }}</strong> </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="companyUpdateToday">
                <v-list-item-icon>
                    <v-icon color="blue">mdi-newspaper</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="text-body-1 font-weight-medium"> 🏢 Company Update: <strong>{{ companyUpdateToday }}</strong> </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="!todaysHoliday && !upcomingLeave && !companyUpdateToday">
                <v-list-item-content class="text-center">
                    <v-list-item-title class="text-grey text-body-1">
                        🚀 No special updates for today.
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                todaysHoliday: "Independence Day 🇵🇭 (June 12, 2024)",
                upcomingLeave: "June 28, 2024 (Annual Leave)",
                companyUpdateToday: "Quarterly Meeting at 3 PM 🏢",
            };
        },
    };
</script>

<style scope>
    .highlights-list {
        margin-top: 1px;
    }

    .v-list-item-icon {
        min-width: 36px;
    }
</style>