<template>
  <div id="app">
      <v-app>
          <!-- App Bar -->
          <AppBar @scrollToContact="scrollToContact" @scrollToHome="scrollToHome" />

          <!-- Main Content -->
          <v-row>
            <v-col cols="12" md="3" lg="2">
                <SideBar />
            </v-col>
            <v-col cols="12" md="9" lg="10">
                <ProjectList ref="homeSection" />
                <ContactMe ref="contactSection" />
            </v-col>
        </v-row>
      </v-app>
  </div>
</template>

<script>
  import ProjectList from "./components/ProjectList.vue";
  import ContactMe from "./components/ContactMe.vue";
  import SideBar from './components/SideBar.vue'
  import AppBar from "./components/AppBar.vue";

  export default {
      name: "App",
      components: {
          ProjectList,
          ContactMe,
          SideBar,
          AppBar
      },
      methods: {
          scrollToContact() {
              const contactSection = this.$refs.contactSection?.$el;
              if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
              }
          },

          scrollToHome() {
              const homeSection = this.$refs.homeSection?.$el;
              if (homeSection) {
                homeSection.scrollIntoView({ behavior: "smooth" });
              }
          }
      }
  };
</script>

<style>
  body {
      background-color: #ffffff;
  }

  #app {
      font-family: "Poppins", sans-serif;
      text-align: center;
      color: #333;
      background-color: #f4f4f4;
  }

  .modern-app-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: linear-gradient(135deg, #b0c8f7, #F06292);
      color: #fff;
      padding: 12px 20px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
      border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  }

  .logo {
      font-size: 1.4rem;
      font-weight: bold;
      letter-spacing: 1px;
  }

  .nav-btn {
      color: #fff !important;
      text-transform: uppercase;
      font-weight: 500;
      transition: 0.3s;
      border-radius: 20px;
      padding: 6px 16px;
  }

  .nav-btn:hover {
      background: rgba(255, 255, 255, 0.2);
  }
</style>