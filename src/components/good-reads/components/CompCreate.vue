<template>
    <div>
        <div :class="!book.title ? 'buttonContainer' : ''">
            <v-spacer v-if="!book.title"></v-spacer>
            <v-btn dark :outlined="!book.title" :class="!book.title ? 'text-capitalized' : 'text-capitalized'" :color="!book.title ? '' : '#1A237E'" :style="!book.title ? 'color: black;' : 'color: white;'" small @click="openDialog">
                {{ book.title ? 'Update' : ' Create New Book'}}
            </v-btn>
        </div>

        <v-dialog v-model="modal" :width="!book.title ? 500 : 1000">
            <v-card>
                <v-card-title class="pa-0">
                    <v-toolbar class="elevation-0">
                        <v-spacer></v-spacer>
                        <v-card-title>{{ book.title ? 'Edit Book' : 'Add a New Book' }}</v-card-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon @click="cancelDialog">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                </v-card-title>
                <v-divider></v-divider>

                <v-progress-linear :active="loading" :indeterminate="loading" absolute top color="primary"></v-progress-linear>

                <v-form @submit.prevent="submitForm">
                    <template v-if="!book.title">
                        <v-card class="pa-5" flat>
                            <v-text-field v-model="bookData.title" label="Book Title" :disabled="loading" :rules="rules.rules" outlined dense required></v-text-field>
                            <v-text-field v-model="bookData.author" label="Author" :disabled="loading" :rules="rules.rules" outlined dense required></v-text-field>
                            <v-textarea v-model="bookData.description" label="Description" :disabled="loading" :rules="rules.rules" outlined dense required></v-textarea>
                            <v-file-input
                                v-model="bookData.image"
                                prepend-icon=""
                                prepend-inner-icon="mdi-file-image"
                                type="file"
                                accept="image/png, image/jpeg, image/bmp"
                                @change="onFileChange"
                                :rules="rules.rules"
                                :disabled="loading"
                                outlined
                                dense
                            />
                        </v-card>
                    </template>

                    <template v-else>
                        <v-card class="pa-5" flat>
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="6">
                                        <v-card class="fill-height pa-5 pt-10 align-center justify-center" outlined>
                                            <v-text-field v-model="bookData.title" label="Book Title" :disabled="loading" :rules="rules.rules" outlined dense required></v-text-field>
                                            <v-text-field v-model="bookData.author" label="Author" :disabled="loading" :rules="rules.rules" outlined dense required></v-text-field>
                                            <v-textarea v-model="bookData.description" label="Description" :disabled="loading" :rules="rules.rules" outlined dense required></v-textarea>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-card class="fill-height pa-5 align-center justify-center" outlined>
                                            <h5>Book Cover</h5>
                                            <div class="d-flex justify-center align-center mt-3">
                                                <v-img :src="bookData.image" max-width="50%" />
                                            </div>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-card>
                    </template>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="text-capitalized" color="#1A237E" :loading="loading" :disable="loading" dark type="submit" small>{{ book.title ? 'Update Book' : 'Add Book' }}</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { POSITION } from "vue-toastification";

    export default {
        props: {
            book: {
                type: Object,
                default: () => ({
                    title: "",
                    author: "",
                    description: "",
                    image: "",
                }),
            },
        },
        data() {
            return {
                modal: false,
                image: null,
                rules: {
                    rules: [(v) => !!v || "This is a required field."],
                },
                bookData: { ...this.book },
                loading: false,
            };
        },
        watch: {
            book: {
                handler(newBook) {
                    this.bookData = { ...newBook }; // Update local data if the book prop changes
                },
                deep: true,
            },
        },
        methods: {
            openDialog() {
                this.modal = true;
                this.loading = true; // Start loading, show progress bar
                // Set a 5-second delay to stop the loading
                setTimeout(() => {
                    this.loading = false;
                }, 3000);
            },
            cancelDialog() {
                this.modal = false;
                this.bookData = { title: "", author: "", description: "", image: null }; // Reset when closing the dialog
            },
            onFileChange() {
                this.image = URL.createObjectURL(this.bookData.image);
            },
            submitForm() {
                this.loading = true;

                setTimeout(() => {
                    if (this.book.id) {
                        this.$emit("book-updated", { ...this.bookData }); // Emit updated book data
                        this.$toast.success("Successfully updated book!", {
                            position: POSITION.BOTTOM_RIGHT,
                            timeout: 2000,
                            icon: "mdi-checkbox-marked-circle-outline",
                            pauseOnHover: true,
                        });
                    } else {
                        this.$emit("book-added", { ...this.bookData }); // Emit new book data
                        this.$toast.success("New book added successfully!", {
                            position: POSITION.BOTTOM_RIGHT,
                            timeout: 2000,
                            icon: "mdi-checkbox-marked-circle-outline",
                            pauseOnHover: true,
                        });
                    }
                    this.modal = false;
                    this.loading = false;
                }, 3000);
            },
        },
    };
</script>

<style scoped>
    .buttonContainer {
        display: flex;
        justify-content: flex-end;
    }
    .text-capitalized {
        text-transform: capitalize;
    }
</style>