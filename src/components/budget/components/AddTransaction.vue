<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                    <span class="headline">{{ isEdit ? 'Edit' : 'Add' }} Transaction</span>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="form.description" label="Description" outlined dense />
                <v-text-field v-model="form.amount" label="Amount" type="number" outlined dense />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                    <v-btn class="text-capitalized white--text" color="#388E3C" width="100" @click="saveTransaction">
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
            transaction: Object,
        },
        data() {
            return {
                dialog: this.value,
                form: {
                    description: "",
                    amount: "",
                },
            };
        },
        computed: {
            isEdit() {
                return !!this.transaction?.id;
            },
        },
        watch: {
            value(val) {
                this.dialog = val;
            },
            dialog(val) {
                this.$emit("input", val);
            },
            transaction: {
                immediate: true,
                handler(newVal) {
                    this.form = {
                        description: newVal?.description || "",
                        amount: newVal?.amount || "",
                    };
                },
            },
        },
        methods: {
            saveTransaction() {
                const payload = {
                    ...this.form,
                    id: this.transaction?.id || null,
                };
                this.$emit("save", payload);
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