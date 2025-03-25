<template>
  <div id="app">
    <v-app>
      <v-container fluid class="project-container">
        <div class="profile-container">
          <div class="profile-header">
            <img :src="user.avatar" alt="User Avatar" class="profile-avatar" />
            <h2 class="user-name">{{ user.name }}</h2>
            <p class="user-email">{{ user.email }}</p>
          </div>
          <hr class="divider" />

          <div>
            <!-- v-breadcrumbs for navigation -->
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
                  <v-img :src="project.image" class="project-image" height="250px" />
                  <v-card-title class="project-title">{{ project.name }}</v-card-title>
                  <v-card-subtitle class="project-desc">{{ project.description }}</v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>

            <!-- Conditionally display the GoodreadsComponent if the Library project is selected -->
            <GoodreadsComponent v-if="selectedProject && selectedProject.name === 'Library'" />
            <VueDashboard v-if="selectedProject && selectedProject.name === 'Dashboard'" />
          </div>
        </div>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import GoodreadsComponent from './GoodreadsComponent.vue';
import VueDashboard from './VueDashboard.vue';
export default {
  components: {
    GoodreadsComponent,
    VueDashboard
  },
  data() {
    return {
      user: {
        name: "FRONTEND DEVELOPER",
        email: "Ilyzza Evangelista",
        avatar: "https://img.freepik.com/premium-vector/software-developer-vector-illustration-communication-technology-cyber-security_1249867-5464.jpg?semt=ais_hybrid",
      },
      projects: [
        {
          id: 1,
          name: "Library",
          description: "A library built with Vue and Vuetify.",
          image: "https://img.freepik.com/free-vector/text-books-library-isolated-icon_24877-83372.jpg",
          link: "", // Internal Route
        },

        {
          id: 2,
          name: "Dashboard",
          description: "A dashboard built with Vue and Vuetify.",
          image: "https://static.vecteezy.com/system/resources/previews/048/734/931/non_2x/dashboard-colored-outline-icon-icon-related-to-overview-data-analytics-elements-illustration-vector.jpg",
          link: "", // Internal Route
        },
      ],
      selectedProject: null,
      breadcrumbs: [
        {
          text: "Home",
          disabled: false,
          link: "/",
        }
      ]
    };
  },
  watch: {
    selectedProject(newVal) {
      // Update breadcrumb disabled state based on selectedProject
      this.breadcrumbs[0].disabled = !newVal; // Disable if no project is selected, enable if selected
    }
  },
  methods: {
    selectProject(project) {
      this.selectedProject = project; // Set the selected project when a project card is clicked
    },

    resetCrumbs() {
      this.selectedProject = null; // Reset selected project when breadcrumb is clicked
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
      border: 4px solid #f48fb1;
  }
  .user-name {
      font-size: 1.8rem;
      font-weight: bold;
      margin-top: 10px;
      color: #ec407a;
  }
  .user-email {
      font-size: 1rem;
      color: #f48fb1;
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
      object-fit: cover;
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
