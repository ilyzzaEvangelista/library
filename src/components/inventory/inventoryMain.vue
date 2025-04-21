<template>
    <v-container fluid class="fill-height" style="background: #ffffff;">
        <v-app-bar app color="indigo" dark>
            <v-toolbar-title>INVENTORY</v-toolbar-title>
        </v-app-bar>

        <v-container fluid class="book-list mb-5">
            <v-row>
                <v-col cols="12" md="6" class="d-flex flex-column align-center justify-center">
                    <h1 class="font-weight-bold" style="font-size: 50px;">INVENTORY</h1>
                    <h1 class="font-weight-bold" style="font-size: 50px;">MANAGEMENT</h1>
                    <div class="mb-6 grey--text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                    <InventoryModal/>
                </v-col>
        
                <v-col cols="12" md="6" class="d-flex flex-column align-center justify-center">
                    <v-img style="max-height: 400px;" :src="require('@/assets/inventory/inventory.jpg')" alt="Dental Clinic Banner" contain></v-img>
                </v-col>
            </v-row>
           
            <v-footer app style="background: #ffffff;">
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
            </v-footer>
        </v-container>
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