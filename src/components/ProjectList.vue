<template>
  <div>
      <v-container fluid class="mt-5">
          <div class="profile-container">
              <div class="profile-header">
                  <img :src="user.avatar" alt="User Avatar" class="profile-avatar" />
                  <h2 class="user-name">{{ user.name }}</h2>
                  <p class="user-email">{{ user.email }}</p>
              </div>
              <hr class="divider" />

              <div>
                  <v-breadcrumbs :items="breadcrumbs" divider="/" class="my-4">
                      <template v-slot:item="{ item }">
                          <v-breadcrumbs-item @click="resetCrumbs" :disabled="item.disabled" class="indigo--text crumb">
                              {{ item.text }}
                          </v-breadcrumbs-item>
                      </template>
                  </v-breadcrumbs>

                  <!-- Conditionally render the project cards only if no project is selected -->
                  <v-row v-if="!selectedProject" class="ml-5">
                      <v-col v-for="project in projects" :key="project.id" cols="12" md="4">
                          <v-card @click="selectProject(project)">
                              <v-img :src="project.image" class="project-image" contain height="200px" />
                              <v-card-title class="project-title">{{ project.name }}</v-card-title>
                              <v-card-subtitle class="project-desc">{{ project.description }}</v-card-subtitle>
                          </v-card>
                      </v-col>
                  </v-row>

                  <!-- Show the selected component based on project selection -->
                  <GoodreadsComponent v-if="selectedProject?.name === 'Library'" />
                  <VueDashboard v-if="selectedProject?.name === 'Dashboard'" />
              </div>
          </div>
      </v-container>
  </div>
</template>

<script>
  import GoodreadsComponent from "./GoodreadsComponent.vue";
  import VueDashboard from "./VueDashboard.vue";

  export default {
      props: {
          setSelectedProject: Function, // Function passed from App.vue
      },
      components: {
          GoodreadsComponent,
          VueDashboard,
      },
      data() {
          return {
              user: {
                  name: "FRONTEND DEVELOPER",
                  email: "Ilyzza Evangelista",
                  avatar: "https://logos.textgiraffe.com/logos/logo-name/41165735-designstyle-girlish-m.png",
              },
              projects: [
                  {
                      id: 1,
                      name: "Library",
                      description: "A library built with Vue and Vuetify.",
                      image: "https://img.freepik.com/free-vector/text-books-library-isolated-icon_24877-83372.jpg",
                  },
                  {
                      id: 2,
                      name: "Dashboard",
                      description: "A dashboard built with Vue and Vuetify.",
                      image: "https://static.vecteezy.com/system/resources/previews/048/734/931/non_2x/dashboard-colored-outline-icon-icon-related-to-overview-data-analytics-elements-illustration-vector.jpg",
                  },
              ],
              selectedProject: null,
              breadcrumbs: [{ text: "Home", disabled: false, link: "/" }],
          };
      },
      watch: {
          selectedProject(newVal) {
              this.breadcrumbs[0].disabled = !newVal;
          },
      },
      methods: {
          selectProject(project) {
              this.selectedProject = project;
              this.setSelectedProject(project);
          },
          resetCrumbs() {
              this.selectedProject = null;
              this.setSelectedProject(null);
          },
      },
  };
</script>

<style scoped>
  .project-container {
      max-width: auto;
      margin: auto;
      padding: 40px 20px;
  }
  .profile-container {
      border-radius: 20px;
      padding: 20px;
      text-align: center;
  }
  .profile-header {
      margin-top: 2%;
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  .profile-avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    padding: 4px; /* Acts like a border */
    background: linear-gradient(45deg, #a5c6f7, #F48FB1); /* Gradient border */
    display: inline-block;
  }
  
  .profile-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
    background: white; /* Ensures the inner image doesn't inherit the gradient */
    padding: 4px; /* Adjust to match border thickness */
  }
  
  .user-name {
      font-size: 1.8rem;
      font-weight: bold;
      margin-top: 10px;
      color: #000000;
  }
  .user-email {
      font-size: 1rem;
      color: #E91E63;
  }
  .divider {
      margin: 20px 0;
      border: none;
      height: 1px;
      background: #ddd;
  }
  .projects-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2196f3;
      margin-bottom: 10px;
  }
  .project-card {
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.3s ease-in-out, box-shadow 0.3s;
  }
  .project-card:hover {
      transform: translateY(-5px);
  }
  .project-image {
      width: 100%;
      max-height: 200px;
      object-fit: cover; /* Ensures uniform image sizing */
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .project-title {
      font-size: 1.2rem;
      font-weight: bold;
      color: #1e88e5;
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  .project-desc {
      font-size: 0.9rem;
      color: #555;
  }
</style>