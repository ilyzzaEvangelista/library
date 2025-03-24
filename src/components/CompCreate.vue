<template>
      <div>
        <div class="buttonContainer">
          <v-btn outlined class="text-capitalized" style="color: black;" small @click="openDialog">Create New Book</v-btn>
        </div>
        <v-dialog v-model="modal" width="500">
          <v-card>
            <v-card-title>
              <span class="headline">Add a New Book</span>
            </v-card-title>
            <v-card-text>
              <v-text-field label="Title" v-model="bookData.title"></v-text-field>
              <v-text-field label="Author" v-model="bookData.author"></v-text-field>
              <v-textarea label="Description" v-model="bookData.description"></v-textarea>
              <input type="file" accept="image/*" @change="onFileChange" />
              <img v-if="bookData.image" :src="bookData.image" style="max-width: 100px;" />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="cancelDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="addBook">Add Book</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        modal: false,
        bookData: { // Local copy of book data
          title: '',
          author: '',
          description: '',
          image: null
        }
      }
    },
    methods: {
      openDialog() {
        this.modal = true;
      },
      cancelDialog() {
        this.modal = false;
        // Reset bookData when cancelling
        this.bookData = { title: '', author: '', description: '', image: null };
      },
      addBook() {
        this.$emit('book-added', { ...this.bookData }); // Emit the new book data
        this.modal = false;
        this.bookData = { title: '', author: '', description: '', image: null }; // Reset
      },
      onFileChange(e) {
        const file = e.target.files[0];
        this.getBase64(file).then(data => {
          this.bookData.image = data;
        });
      },
      getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
    }
  }
  </script>

<style scoped>
 .buttonContainer{
  display: flex;
  justify-content: flex-end; 
 }
  .button {
    background-color: #190086;
    color: white;
  }

  .text-capitalized {
    text-transform: capitalize;
  }
  

</style>