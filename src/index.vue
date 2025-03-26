<template>
    <div id="app">
        <v-app>
            <!-- App Bar -->
            <AppBar @scrollToContact="scrollToContact" @scrollToHome="scrollToHome" @scrollToCertificates="scrollToCertificates" />

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