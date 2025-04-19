<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <span class="headline">{{ isEdit ? 'Edit' : 'Add' }} inventory</span>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field v-model="form.name" label="Item Name" outlined dense />
                    <v-text-field v-model.number="form.amount" label="Amount" type="number" outlined dense />
                    <v-text-field v-model.number="form.size" label="Size" outlined dense>
                        <template #append>
                            <v-select v-model="form.unit" :items="['grams', 'oz']" dense hide-details solo flat style="width: 120px; margin-bottom: 20px;" />
                        </template>
                    </v-text-field>
                    <v-text-field v-model.number="form.quantity" label="Quantity" type="number" outlined dense />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn class="text-capitalized white--text" color="indigo" width="100" @click="saveinventory">
                    {{ isEdit ? 'Update' : 'Add' }}
                </v-btn>
                <v-spacer />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: {
            value: Boolean,
            inventory: Object,
        },
        data() {
            return {
                dialog: this.value,
                form: {
                    name: "",
                    amount: "",
                    quantity: "",
                    size: "",
                    unit: "grams",
                },
            };
        },
        computed: {
            isEdit() {
                return !!this.inventory?.id;
            },
        },
        watch: {
            value(val) {
                this.dialog = val;
            },
            dialog(val) {
                this.$emit("input", val);
            },
            inventory: {
                immediate: true,
                handler(newVal) {
                    this.form = {
                        name: newVal?.name || "",
                        amount: newVal?.amount || "",
                        size: newVal?.size || "",
                        quantity: newVal?.quantity || "",
                    };
                },
            },
        },

        methods: {
            saveinventory() {
                const payload = {
                    ...this.form,
                    id: this.inventory?.id || null,
                };
                this.$emit("save", payload);
                this.$refs.form.reset();
                this.dialog = false;
            },
        },
    };
</script>

<style scoped>
    .text-capitalized {
        text-transform: capitalize;
    }
</style>