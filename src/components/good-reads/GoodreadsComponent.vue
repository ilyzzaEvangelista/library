<template>
    <div id="app">
        <v-app-bar app color="indigo" dark>
            <v-toolbar-title>LIST OF BOOKS</v-toolbar-title>
        </v-app-bar>

        <header>
            <h1>My Literary Journey</h1>
        </header>

        <section>
            <v-row>
                <v-col cols="4">
                    <v-text-field v-model="searchTerm" class="mb-5" label="Search Books" append-icon="mdi-magnify" single-line hide-details outlined dense />
                </v-col>
                <v-col cols="8">
                    <CompCreate :book="selectedBook" @book-added="handleBookAdded" />
                </v-col>
            </v-row>
        </section>

        <section class="book-list">
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
        </section>
    </div>
</template>

<script>
    import CompCreate from "./components/CompCreate.vue";
    export default {
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
                    { text: "Book Cover", align: "center", value: "image", sortable: false },
                    { text: "Title & Author", align: "center", value: "title" },
                    { text: "Description", align: "center", value: "description" },
                    { text: "Actions", align: "center", value: "actions", sortable: false },
                ],
                books: [],
                editDialog: false,
                editingIndex: null,
                editedBook: {
                    title: "",
                    author: "",
                    description: "",
                    image: null,
                },
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
            addBook() {
                this.loading = true; // Start loading
                setTimeout(() => {
                    this.books.push({ ...this.newBook });
                    this.newBook.title = "";
                    this.newBook.author = "";
                    this.newBook.description = "";
                    this.newBook.image = null;
                    this.loading = false; // Stop loading after 3 seconds
                }, 3000); // 3-second delay
            },
            handleBookUpdated(updatedBook) {
                this.loading = true;
                setTimeout(() => {
                    const index = this.books.findIndex((book) => book.id === updatedBook.id);
                    if (index !== -1) {
                        this.books.splice(index, 1, updatedBook);
                        this.saveBooksToLocalStorage(); 
                    }
                    this.selectedBook = null;
                    this.loading = false;
                }, 3000);
            },
            editBook(index) {
                this.editingIndex = index;
                this.editedBook = { ...this.books[index] };
                this.editDialog = true;
            },
            saveBook() {
                if (this.editingIndex !== null) {
                    this.books[this.editingIndex] = { ...this.editedBook };
                }
                this.editDialog = false;
                this.editedBook = { title: "", author: "", description: "", image: null };
            },
            cancelEdit() {
                this.editDialog = false;
            },
            removeBook(book) {
                const index = this.books.indexOf(book);
                if (index !== -1) {
                    this.books.splice(index, 1);
                    this.saveBooksToLocalStorage(); 
                }
            },
            onEditFileChange(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        this.editedBook.image = reader.result;
                    };
                }
            },
            handleBookAdded(bookData) {
                this.loading = true;
                setTimeout(() => {
                    this.books.unshift(bookData);
                    this.saveBooksToLocalStorage(); 
                    this.loading = false;
                }, 3000);
            },
            saveBooksToLocalStorage() {
                localStorage.setItem("books", JSON.stringify(this.books));
            },
            loadBooksFromLocalStorage() {
                const storedBooks = localStorage.getItem("books");
                if (storedBooks) {
                    this.books = JSON.parse(storedBooks);
                }
            },
        },
        mounted() {
            this.loadBooksFromLocalStorage();
        },
    };
</script>

<style scoped>
    #app {
        font-family: "Arial", sans-serif;
        margin: 20px;
        color: #333;
    }

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

    header {
        background-color: #f0f0f0;
        padding: 10px;
        text-align: center;
        margin-bottom: 20px;
    }
</style>