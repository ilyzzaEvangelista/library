<template>
    <v-container fluid style="background: #ffffff;">
        <v-app-bar app color="indigo" dark>
            <v-toolbar-title>INVENTORY</v-toolbar-title>
        </v-app-bar>
        <v-card flat>
            <h1 class="font-weight-bold" style="font-size: 50px;">INVENTORY</h1>
            <h1 class="font-weight-bold" style="font-size: 50px;">MANAGEMENT</h1>
            <div class="mb-6 grey--text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <InventoryModal/>
        </v-card>

        <!-- Footer -->
        <!-- <v-footer app>
            <v-row>
                <v-col class="text-center" cols="12">
                    <v-icon>mdi-facebook</v-icon>
                    <v-icon>mdi-instagram</v-icon>
                    <v-icon>mdi-twitter</v-icon>
                </v-col>
                <v-col class="text-center" cols="12">
                    <span>&copy; 2025 Your Company. All rights reserved.</span>
                </v-col>
            </v-row>
        </v-footer> -->
    </v-container>
</template>

<script>
    import InventoryModal from './components/InventoryModal.vue';
    export default {
        components:{ InventoryModal }
    };
</script>

<style scoped>
#app {
    color: #ffffff;
}
</style>