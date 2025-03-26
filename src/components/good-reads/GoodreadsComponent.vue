<template>
    <div id="app">
        <header>
            <h1>My Literary Journey</h1>
        </header>

        <section>
            <v-row>
                <v-col cols="4">
                    <v-text-field v-model="searchTerm" class="mb-5" label="Search Books" append-icon="mdi-magnify" single-line hide-details outlined dense />
                </v-col>
                <v-col cols="8">
                    <CompCreate :book="selectedBook" @book-added="handleBookAdded" @book-updated="handleBookUpdated" />
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
                        <CompCreate :book="item" @book-added="handleBookAdded" @book-updated="handleBookUpdated" />
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
                books: [
                    {
                        title: "Chasing the Puck",
                        author: "Lyssa Lemire",
                        description:
                            "Chasing the Puck is a full-length hockey romance novel with lots of steam, sizzling banter, no cheating, and a guaranteed HEA ending! He falls first and HARDone bed tropetutor x jockhe takes care of her when she's sickno 3rd act breakupdual POV",
                        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1720525214i/216277240.jpg",
                    },
                    {
                        title: "The Silent Patient",
                        author: "Alex Michaelides",
                        description: "A psychological thriller about a woman who shoots her husband and then refuses to speak. The twist will leave you speechless.",
                        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1668782119i/40097951.jpg",
                    },
                    {
                        title: "Where the Crawdads Sing",
                        author: "Delia Owens",
                        description: "A beautiful and haunting coming-of-age story of a girl growing up in the swamps of North Carolina. A blend of romance, mystery, and nature.",
                        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582135294i/36809135.jpg",
                    },
                    {
                        title: "The Midnight Library",
                        author: "Matt Haig",
                        description: "A novel about the choices that go into a life well lived, featuring a woman who explores alternate lives in the Midnight Library, where each book represents a different possibility.",
                        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
                    },
                    {
                        title: "The Seven Husbands of Evelyn Hugo",
                        author: "Taylor Jenkins Reid",
                        description: "An old Hollywood star recounts her life story, including her seven marriages, in this compelling tale about love, identity, and the price of fame.",
                        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1664458703i/32620332.jpg",
                    },
                    {
                        title: "The Vanishing Half",
                        author: "Brit Bennett",
                        description: "A gripping story about twin sisters who lead very different lives, one passing as white and the other living as a Black woman in a small Southern town.",
                        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1577090827l/51791252.jpg",
                    },
                ],
                editDialog: false,
                editingIndex: null,
                editedBook: {
                    title: "",
                    author: "",
                    description: "",
                    image: null,
                },
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
                this.loading = true; // Start loading
                setTimeout(() => {
                    const index = this.books.findIndex((book) => book.id === updatedBook.id);
                    if (index !== -1) {
                        this.books.splice(index, 1, updatedBook);
                    }
                    this.selectedBook = null;
                    this.loading = false; // Stop loading after 3 seconds
                }, 3000); // 3-second delay
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
            removeBook(index) {
                this.books.splice(index, 1);
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
                this.loading = true; // Start loading
                setTimeout(() => {
                    // Add the new book to the beginning of the array
                    this.books.unshift(bookData);
                    this.loading = false; // Stop loading after 3 seconds
                }, 3000); // 3-second delay
            },
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