<template>
    <div id="app">
        <v-app>
            <!-- App Bar -->
            <AppBar @scrollToContact="scrollToContact" @scrollToHome="scrollToHome" @scrollToCertificates="scrollToCertificates" />

            <div class="profile-header" v-if="!selectedProject">
                <img :src="user.avatar" alt="User Avatar" class="profile-avatar" />
                <h2 class="user-name">{{ user.name }}</h2>
                <p class="user-email">{{ user.email }}</p>
            </div>
            <hr class="divider" />

            <!-- Main Content -->
            <v-row>
                <v-col cols="12">
                    <ProjectList ref="homeSection" :setSelectedProject="setSelectedProject" />
                    <!-- Hide these sections when a project is selected -->
                    <CertificatesList v-if="!selectedProject" ref="certificateSection" />
                    <ContactMe v-if="!selectedProject" ref="contactSection" />         
                </v-col>
            </v-row>
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
                const homeSection = this.$refs.homeSection?.$el;
                if (homeSection) {
                    homeSection.scrollIntoView({ behavior: "smooth" });
                }
            },
            setSelectedProject(project) {
                this.selectedProject = project;
            },
        },
    };
</script>

<style scoped>
    .profile-header {
        margin-top: 5%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .profile-avatar {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        padding: 4px; 
        background: linear-gradient(45deg, #a5c6f7, #f48fb1); 
        display: inline-block;
    }

    .profile-avatar img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: block;
        background: white; 
        padding: 4px;
    }
    .user-name {
        font-size: 1.8rem;
        font-weight: bold;
        margin-top: 10px;
        color: #000000;
    }
    .user-email {
        font-size: 1rem;
        color: #e91e63;
    }
</style>