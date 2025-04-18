<template>
    <div>
        <div :class="!book ? 'buttonContainer' : ''">
            <v-spacer v-if="!book"></v-spacer>
            <v-btn dark :outlined="!book" :class="'text-capitalized'" :color="book ? '#1A237E' : ''" :style="book ? 'color: white;' : 'color: black;'" small :disabled="loading" @click="openDialog(book)">
                {{ book ? 'Update' : 'Create New Book' }}
            </v-btn>
        </div>

        <v-dialog v-model="modal" width="1000">
            <v-card>
                <v-card-title class="pa-0">
                    <v-toolbar class="elevation-0">
                        <v-spacer></v-spacer>
                        <v-card-title>{{ book ? 'Edit Book' : 'Add a New Book' }}</v-card-title>
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
                    <v-card class="pa-5" flat>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="6">
                                    <v-card class="fill-height pa-5 pt-10 align-center justify-center" outlined>
                                        <v-text-field v-model="bookData.title" label="Book Title" :disabled="loading" :rules="rules.rules" outlined dense required></v-text-field>
                                        <v-text-field v-model="bookData.author" label="Author" :disabled="loading" :rules="rules.rules" outlined dense required></v-text-field>
                                        <v-textarea v-model="bookData.description" label="Description" :disabled="loading" :rules="rules.rules" outlined dense required></v-textarea>
                                        <v-file-input prepend-icon="" prepend-inner-icon="mdi-file-image" type="file" accept="image/png, image/jpeg, image/bmp" @change="onFileChange" :rules="rules.rules" :disabled="loading" outlined dense />
                                    </v-card>
                                </v-col>
                                <v-col cols="6">
                                    <v-card class="fill-height pa-5 align-center justify-center" outlined>
                                        <h5>Book Cover</h5>
                                        <div class="d-flex justify-center align-center mt-3">
                                            <v-img :src="bookData.image || previewImage" max-width="60%"  />
                                        </div>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-card>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="text-capitalized" color="#1A237E" :loading="loading" dark type="submit" small>
                            {{ book ? 'Update Book' : 'Add Book' }}
                        </v-btn>
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
                    id: null,
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
                image: null, // Store raw File object here
                previewImage: "", // For displaying preview
                rules: {
                    rules: [(v) => !!v || "This is a required field."],
                },
                bookData: {
                    id: null,
                    title: "",
                    author: "",
                    description: "",
                    image: "", // Used for display only
                },
                loading: false,
            };
        },
        watch: {
            book: {
                handler(newBook) {
                    this.bookData = { ...newBook };
                    this.previewImage = typeof newBook.image === "string" ? newBook.image : "";
                },
                deep: true,
            },
        },
        methods: {
            openDialog(book) {
                this.modal = true;
                this.loading = true;
                if (book) {
                    this.bookData = { ...book };
                    this.previewImage = book.image;
                } else {
                    this.bookData = {
                        id: null,
                        title: "",
                        author: "",
                        description: "",
                        image: "",
                    };
                    this.previewImage = "";
                }

                setTimeout(() => {
                    this.loading = false;
                }, 1000);
            },
            cancelDialog() {
                this.modal = false;
                this.bookData = { title: "", author: "", description: "", image: null };
                this.previewImage = "";
            },
            onFileChange(event) {
                const file = event instanceof File ? event : event?.target?.files?.[0] || event?.[0];
                if (file && file instanceof Blob) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.bookData.image = e.target.result;
                    };
                    reader.readAsDataURL(file);
                } else {
                    console.warn("Invalid file format or no file selected");
                }
            },
            submitForm() {
                this.loading = true;

                setTimeout(() => {
                    let books = JSON.parse(localStorage.getItem("books")) || [];

                    if (this.bookData.id) {
                        // Update
                        books = books.map((b) => (b.id === this.bookData.id ? { ...this.bookData, image: this.bookData.image || b.image } : b));
                        this.$emit("book-updated", { ...this.bookData });
                        this.$toast.success("Successfully updated book!", {
                            position: POSITION.BOTTOM_RIGHT,
                            timeout: 2000,
                            icon: "mdi-checkbox-marked-circle-outline",
                            pauseOnHover: true,
                        });
                    } else {
                        // Add
                        const newBook = {
                            ...this.bookData,
                            id: Date.now(),
                            image: this.bookData.image,
                        };
                        books.push(newBook);
                        this.$emit("book-added", newBook);
                        this.$toast.success("New book added successfully!", {
                            position: POSITION.BOTTOM_RIGHT,
                            timeout: 2000,
                            icon: "mdi-checkbox-marked-circle-outline",
                            pauseOnHover: true,
                        });
                    }

                    localStorage.setItem("books", JSON.stringify(books));
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