<template>
  <div>
      <div :class="!book.title ? 'buttonContainer' : ''">
          <v-spacer v-if="!book.title"></v-spacer>
          <v-btn dark :outlined="!book.title" :class="!book.title ? 'text-capitalized mb-5' : 'mt-1 text-capitalized'" :color="!book.title ? '' : '#1A237E'" :style="!book.title ? 'color: black;' : 'color: white;'" small @click="openDialog">{{ book.title ? 'Update' : ' Create New Book'}}</v-btn>
      </div>
      <v-dialog v-model="modal" width="500">
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
              <hr>
              <v-form @submit.prevent="submitForm">
                  <v-card-text>
                      <v-text-field v-model="bookData.title" label="Book Title" :rules="rules.rules" outlined dense required></v-text-field>
                      <v-text-field v-model="bookData.author" label="Author" :rules="rules.rules" outlined dense required></v-text-field>
                      <v-textarea v-model="bookData.description" label="Description" :rules="rules.rules" outlined dense required></v-textarea>
                      <v-file-input v-if="!book.title" v-model="bookData.image" prepend-icon="" prepend-inner-icon="mdi-file-image" type="file" accept="image/png, image/jpeg, image/bmp" @change="onFileChange" :rules="rules.rules" outlined dense />
                      <v-card v-else  class="pa-5">
                        <v-img :src="bookData.image" max-width="100%" />
                      </v-card>
                  </v-card-text>
                  <hr>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="text-capitalized" color="#1A237E" dark type="submit" small>{{ book.id ? 'Update Book' : 'Add Book' }}</v-btn>
                  </v-card-actions>
              </v-form>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
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
          mode: {
              type: String,
              default: "", // default action could be 'add', change as needed
          },
      },
      data() {
          return {
              modal: false,
              image: null,
              rules: {
                  rules: [(v) => !!v || "This is a required field."],
              },
              bookData: { ...this.book }, // Create a local copy of the book prop
          };
      },
      watch: {
          // Watch for changes to the prop and update the local data
          book: {
              handler(newBook) {
                  this.bookData = { ...newBook }; // Update local data if the book prop changes
              },
              deep: true, // Deep watch to handle nested properties
          },
      },
      methods: {
          openDialog() {
              this.modal = true;
          },
          cancelDialog() {
              this.modal = false;
              this.bookData = { title: "", author: "", description: "", image: null }; // Reset when closing the dialog
          },
          addBook() {
              this.$emit("book-added", { ...this.bookData }); // Emit the new book data
              this.modal = false;
              this.bookData = { title: "", author: "", description: "", image: null }; // Reset
          },
          onFileChange() {
              this.image = URL.createObjectURL(this.bookData.image);
          },
          submitForm() {
              if (this.book.id) {
                  this.$emit("book-updated", { ...this.bookData }); // Emit updated book data
              } else {
                  this.$emit("book-added", { ...this.bookData }); // Emit new book data
              }
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