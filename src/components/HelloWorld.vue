<template>
    <div id="app">
        <v-app>
            <header>
                <h1>My Awesome Goodreads</h1>
            </header>

            <section>
                <CompCreate :newBook="newBook" />
            </section>

            <section class="book-list">
                <v-data-table :headers="headers" :items="books" item-value="title" class="elevation-1" hide-default-footer>
                    <template v-slot:[`item.image`]="{ item }">
                        <v-btn v-if="item.image" text small @click="viewImage(item.image)">
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
                        <div class="centerTable">
                            <v-btn small color="#1A237E" class="mx-2" style="color: white;" @click="editBook(item)">
                                {{ formattedLabels.edit }}
                            </v-btn>
                            <v-btn small color="#B71C1C" class="mx-2" style="color: white;" @click="removeBook(item)">
                                {{ formattedLabels.delete }}
                            </v-btn>
                        </div>
                    </template>
                </v-data-table>

                <!-- Edit Book Dialog -->
                <v-dialog v-model="editDialog" max-width="500px">
                    <v-card>
                        <v-card-title>Edit Book</v-card-title>
                        <v-card-text>
                            <v-text-field label="Title" v-model="editedBook.title"></v-text-field>
                            <v-text-field label="Author" v-model="editedBook.author"></v-text-field>
                            <v-textarea label="Description" v-model="editedBook.description"></v-textarea>
                            <input type="file" accept="image/*" @change="onEditFileChange" />
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="cancelEdit">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="saveBook">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="imageDialog" max-width="400px">
                    <v-card>
                        <v-card-title>Book Cover</v-card-title>
                        <v-card-text class="text-center">
                            <v-img :src="selectedImage" max-width="100%"></v-img>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="imageDialog = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </section>
        </v-app>
    </div>
</template>

<script>
    import CompCreate from "./CompCreate";
    export default {
        components: {
            CompCreate,
        },
        data() {
            return {
                imageDialog: false,
                newBook: {
                    title: "",
                    author: "",
                    description: "",
                    image: null,
                },
                headers: [
                    { text: "Cover", align: "center", value: "image", sortable: false },
                    { text: "Title & Author", align: "center", value: "title" },
                    { text: "Description", align: "center", value: "description" },
                    { text: "Actions", align: "center", value: "actions", sortable: false },
                ],
                books: [
                    // Sample Data (Replace with real data)
                    {
                        title: "Chasing the Puck",
                        author: "Lyssa Lemire",
                        description:
                            "Chasing the Puck is a full-length hockey romance novel with lots of steam, sizzling banter, no cheating, and a guaranteed HEA ending! He falls first and HARDone bed tropetutor x jockhe takes care of her when she's sickno 3rd act breakupdual POV",
                        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1720525214i/216277240.jpg",
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
        },
        methods: {
            capitalizeSentence(text) {
                return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
            },
            viewImage(image) {
                this.selectedImage = image;
                this.imageDialog = true;
            },
            onFileChange(e) {
                const file = e.target.files[0];
                this.getBase64(file).then((data) => {
                    this.newBook.image = data;
                });
            },
            getBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                });
            },
            addBook() {
                this.books.push({ ...this.newBook });
                this.newBook.title = "";
                this.newBook.author = "";
                this.newBook.description = "";
                this.newBook.image = null;
            },

            editBook(index) {
                this.editingIndex = index;
                this.editedBook = { ...this.books[index] }; // Clone the book object
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
        },
    };
</script>

<style>
    #app {
        font-family: "Arial", sans-serif;
        margin: 20px;
        color: #333;
    }

    .text-capitalized {
        text-transform: capitalize;
    }

    .truncate-text {
        white-space: nowrap; /* Prevent text from wrapping */
        overflow: hidden; /* Hide overflow */
        text-overflow: ellipsis; /* Show "..." for overflow text */
        max-width: 150px; /* Adjust width as needed */
        display: inline-block;
    }

    .centerTable {
        float: center; /* Add this line */
        display: center;
    }

    header {
        background-color: #f0f0f0;
        padding: 10px;
        text-align: center;
        margin-bottom: 20px;
    }

    .book-list {
        width: auto;
        float: left; /* Add this line */
        display: flex;
        flex-direction: column;
    }

    .book-item {
        width: auto;
        border: 1px solid #ddd;
        margin-bottom: 15px;
        padding: 15px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .book-details {
        flex: 1;
    }

    .book-deets {
        float: left; /* Add this line */
    }

    .book-cover {
        max-width: 150px;
        max-height: 200px;
        margin-right: 15px;
        border: 1px solid #eee;
    }

    .book-actions button {
        background-color: #008cba;
        color: white;
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        margin-left: 5px;
    }

    .edit-form {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .edit-form input[type="text"],
    .edit-form textarea {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .edit-form textarea {
        height: 80px;
    }

    .edit-buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }

    .edit-buttons button {
        background-color: #e74c3c;
        color: white;
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        margin-left: 5px;
    }

    .edit-button {
        background-color: #3498db;
    }

    .remove-button {
        background-color: #e74c3c;
    }

    .save-button {
        background-color: #27ae60;
    }

    .cancel-button {
        background-color: #f39c12;
    }
</style>