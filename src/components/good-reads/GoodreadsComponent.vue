<template>
    <v-container fluid class="fill-height" style="background: #ffffff;">
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>LIST OF BOOKS</v-toolbar-title>
        </v-app-bar>

        <v-container fluid class="book-list mb-5">
            <div class="d-flex justify-center align-center pa-5">
                <h1>My Literary Journey</h1>
            </div>
            <v-row>
                <v-col cols="4">
                    <v-text-field v-model="searchTerm" class="mb-5" label="Search Books" append-icon="mdi-magnify" single-line hide-details outlined dense />
                </v-col>
                <v-col cols="8">
                    <CompCreate :book="selectedBook" @init="fetchBooks" />
                </v-col>
            </v-row>
            <v-data-table :headers="headers" :items="paginatedBooks" :loading="loading" item-value="title" class="elevation-1" hide-default-footer>
                <template v-slot:[`item.image`]="{ item }">
                    <v-btn class="text-capitalized" small v-if="item.image" text @click="viewImage(item.image)">
                        View Image
                    </v-btn>
                </template>

                <template v-slot:[`item.title`]="{ item }"> <strong>{{ item.title }}</strong> by {{ item.author }} </template>

                <template v-slot:[`item.description`]="{ item }">
                    <span class="truncate-text" :title="item.description">
                        {{ item.description }}
                    </span>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                    <div class="d-flex justify-center align-center">
                        <CompCreate :book="item" @book-updated="handleBookUpdated" />
                        <v-btn small color="#B71C1C" class="mx-2 text-capitalized" style="color: white;" @click="removeBook(item)">
                            {{ formattedLabels.delete }}
                        </v-btn>
                    </div>
                </template>
            </v-data-table>

            <v-pagination v-model="page" :length="pageCount" color="#1A237E" class="mt-4"></v-pagination>

            <v-dialog v-model="imageDialog" max-width="400px">
                <v-card>
                    <v-card-title class="pa-0">
                        <v-toolbar class="elevation-0">
                            <v-spacer></v-spacer>
                            <v-card-title>Book Cover</v-card-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-btn icon @click="imageDialog = false">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                    </v-card-title>
                    <hr />
                    <v-card-text class="text-center mt-5">
                        <v-img :src="selectedImage" max-width="100%"></v-img>
                    </v-card-text>
                </v-card>
            </v-dialog>

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
    import axios from "@/axios"; // Import your axios instance
    import CompCreate from "./components/CompCreate.vue";

    export default {
        name: "GoodreadsComponent",
        components: {
            CompCreate,
        },
        data() {
            return {
                loading: false,
                page: 1,
                itemsPerPage: 5,
                searchTerm: "",
                selectedImage: null,
                imageDialog: false,
                newBook: {
                    title: "",
                    author: "",
                    description: "",
                    image: null,
                },
                headers: [
                    { text: "Title & Author", align: "center", value: "title" },
                    { text: "Description", align: "center", value: "description" },
                    { text: "Actions", align: "center", value: "actions", sortable: false },
                ],
                books: [],
                selectedBook: null,
            };
        },
        computed: {
            formattedLabels() {
                return {
                    edit: this.capitalizeSentence("edit"),
                    delete: this.capitalizeSentence("delete"),
                };
            },
            filteredBooks() {
                return this.books.filter((book) => {
                    const searchTermLower = this.searchTerm.toLowerCase();
                    return book.title.toLowerCase().includes(searchTermLower) || book.author.toLowerCase().includes(searchTermLower) || book.description.toLowerCase().includes(searchTermLower);
                });
            },
            pageCount() {
                return Math.ceil(this.filteredBooks.length / this.itemsPerPage);
            },
            paginatedBooks() {
                const start = (this.page - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.filteredBooks.slice(start, end);
            },
        },
        methods: {
            capitalizeSentence(text) {
                return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
            },
            viewImage(image) {
                this.selectedImage = image;
                this.imageDialog = true;
            },
            fetchBooks() {
                this.loading = true;
                axios
                    .get("/books")
                    .then((response) => {
                        this.books = response.data;
                    })
                    .catch((error) => {
                        console.error("Error fetching books:", error);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            addBook() {
                this.loading = true;
                axios
                    .post("/books", this.newBook)
                    .then((response) => {
                        this.books.unshift(response.data);
                        this.newBook.title = "";
                        this.newBook.author = "";
                        this.newBook.description = "";
                        this.newBook.image = null;
                        this.loading = false;
                    })
                    .catch((error) => {
                        console.error("Error adding book:", error);
                    });
            },
            handleBookUpdated(updatedBook) {
                this.loading = true;
                axios
                    .put(`/books/${updatedBook.id}`, updatedBook)
                    .then((response) => {
                        const index = this.books.findIndex((book) => book.id === updatedBook.id);
                        if (index !== -1) {
                            this.books.splice(index, 1, response.data);
                        }
                        this.loading = false;
                    })
                    .catch((error) => {
                        console.error("Error updating book:", error);
                    });
            },
            removeBook(book) {
                this.loading = true;
                axios
                    .delete(`/books/${book.id}`)
                    .then(() => {
                        const index = this.books.indexOf(book);
                        if (index !== -1) {
                            this.books.splice(index, 1);
                        }
                        this.loading = false;
                    })
                    .catch((error) => {
                        console.error("Error deleting book:", error);
                    });
            },
        },
        mounted() {
            this.fetchBooks();
        },
    };
</script>

<style scoped>
    .text-capitalized {
        text-transform: capitalize;
    }

    .truncate-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 150px;
        display: inline-block;
    }
</style>