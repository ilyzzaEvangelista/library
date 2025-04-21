<template>
    <div id="app">
        <v-app>
            <!-- App Bar -->
            <AppBar @scrollToContact="scrollToContact" @scrollToHome="scrollToHome" @scrollToCertificates="scrollToCertificates" />
            
            <v-container class="fill-height" fluid style="background: #ffffff;">
                <v-row v-if="!selectedProject" ref="homeSection" align="center" >
                    <v-col cols="12" md="6">
                        <div class="d-flex flex-column align-start ml-16 pl-10 pt-10">
                            <h1 class="black--text display-2 font-weight-bold">Hi <span>👋</span>,</h1>
                            <h1 class="black--text display-2 font-weight-bold">I’m Ilyzza,</h1>
                            <h2 class="primary--text" style="font-size: 50px; font-weight: 600;">Front-end Developer</h2>

                        
                            <p class="black--text subtitle-1 mt-4">
                                I design and develop experiences that make people's lives<br>
                                simpler through Web and Mobile apps. I work with HTML5,<br>
                                CSS3, JavaScript, Vue, Vuetify, and Bootstrap.
                            </p>
                        
                            <div class="mt-6">
                                <v-btn @click="scrollToProject" color="black" dark>SEE MY PROJECTS</v-btn>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" md="5">
                        <v-img :src="require('@/assets/landing/profile.png')" alt="Charles working" class="mt-10" aspect-ratio="1" ></v-img>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <ProjectList ref="projectSection" :setSelectedProject="setSelectedProject" />
                        <!-- Hide these sections when a project is selected -->
                        <CertificatesList v-if="!selectedProject" ref="certificateSection" />
                        <ContactMe v-if="!selectedProject" ref="contactSection" />         
                    </v-col>
                </v-row>
            </v-container>

        </v-app>
    </div>
</template>

<script>
    import ProjectList from "./components/ProjectList.vue";
    import ContactMe from "./components/ContactMe.vue";
    import CertificatesList from "./components/CertificatesList.vue";
    import AppBar from "./components/AppBar.vue";

    export default {
        name: "App",
        components: {
            ProjectList,
            ContactMe,
            CertificatesList,
            AppBar,
        },
        data() {
            return {
                selectedProject: null,
                user: {
                    name: "FRONTEND DEVELOPER",
                    email: "Ilyzza Evangelista",
                    avatar: "https://logos.textgiraffe.com/logos/logo-name/41165735-designstyle-girlish-m.png",
                },
            };
        },
        methods: {
            scrollToContact() {
                const contactSection = this.$refs.contactSection?.$el;
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                }
            },
            scrollToCertificates() {
                const certificateSection = this.$refs.certificateSection?.$el;
                if (certificateSection) {
                    certificateSection.scrollIntoView({ behavior: "smooth" });
                }
            },
            scrollToHome() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
            scrollToProject() {
                const projectSection = this.$refs.projectSection?.$el;
                if (projectSection) {
                    projectSection.scrollIntoView({ behavior: "smooth" });
                }
            },
            setSelectedProject(project) {
                this.selectedProject = project;
            },
        },
    };
</script>

<style scoped>
    #app {
        font-family: "Arial", sans-serif;
        color: #ffffff;
    }
    .main-section {
        background: #ffffff;
        min-height: 80vh;
    }
    .illustration {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .btn-lg {
        font-size: 1.25rem;
        padding: 0.75rem 2rem;
    }
    ul {
        list-style: none;
        padding-left: 0;
    }
    li {
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
    }
    .search-bar .v-input__slot {
        border-radius: 24px;
        background: #fff;
    }
    .primary--text {
        background: linear-gradient(270deg, #F48FB1, #90CAF9, #F48FB1);
        background-size: 600% 600%;
        animation: gradientMove 5s ease infinite;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
        font-weight: bold;
      }
      
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      
</style>