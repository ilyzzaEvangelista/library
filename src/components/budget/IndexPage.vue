<template>
    <div>
        <!-- Navigation Bar -->
        <v-app-bar app color="#388E3C" dark>
            <v-toolbar-title>BUDGET TRACKER</v-toolbar-title>
            <v-spacer></v-spacer>
            <LoginPage />
        </v-app-bar>

        <!-- Title -->
        <v-container fluid class="fill-height pa-0">
            <v-row align="center" justify="center" class="fill-height">
                <v-col cols="12" class="d-flex flex-column align-center justify-center text-center">
                    <p style="color: #388e3c; font-size: 50px; font-weight: 700;">Simple way</p>
                    <p style="font-size: 50px;">to manage <span style="color: #388e3c; font-weight: 700;">personal finances</span></p>
                    <v-btn class="white--text text-capitalized" large color="#43A047">Register</v-btn>
                </v-col>
            </v-row>
        </v-container>

        <!-- Traits -->
        <v-container fluid class="fill-height pa-0 mt-10">
            <v-row>
                <v-col cols="12" class="mb-5">
                    <v-row>
                        <v-col v-for="project in projects" :key="project.id" cols="12" md="3">
                            <v-card class="full-card">
                                <v-img :src="project.image" class="project-image mt-10" contain elevation-1 />
                                <v-card-title class="project-title">{{ project.name }}</v-card-title>
                                <v-card-subtitle class="project-desc">{{ project.description }}</v-card-subtitle>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>

        <!-- Simple money tracker -->
        <v-container fluid class="mt-10">
            <v-row align="center" justify="center">
                <!-- Left Panel: Transactions -->
                <v-col cols="12" md="6" lg="4" xl="4">
                    <v-card class="pa-4" elevation="2">
                        <v-tabs v-model="tab" background-color="grey lighten-4">
                            <v-tab disabled>Last Month</v-tab>
                            <v-tab class="font-weight-bold">This Month</v-tab>
                            <v-tab disabled>Future</v-tab>
                        </v-tabs>
                        <v-divider></v-divider>
                        <v-card-text>
                            <div class="d-flex align-center mb-4">
                                <div>
                                    <div class="text-h4 font-weight-bold">28</div>
                                    <div class="grey--text">Monday</div>
                                    <div class="grey--text text-caption">June 2021</div>
                                </div>
                                <v-spacer></v-spacer>
                                <div class="text-h5 font-weight-bold green--text">+10,400,000</div>
                            </div>
                            <v-list dense>
                                <v-list-item>
                                    <v-list-item-avatar>
                                        <v-icon color="amber">mdi-bus</v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>Transportation</v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <span>50,000</span>
                                    </v-list-item-action>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-avatar>
                                        <v-icon color="blue">mdi-food</v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>Food & Beverage</v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <span>50,000</span>
                                    </v-list-item-action>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>

                <!-- Right Panel: Description -->
                <v-col cols="12" md="6" lg="4" xl="4" class="d-flex align-center">
                    <div>
                        <div class="text-h3 font-weight-bold mb-2">Simple money tracker</div>
                        <div class="text-body-1 grey--text">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit id cras enim egestas tellus eu accumsan himenaeos
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>

        <!-- Painless budgeting -->
        <v-container fluid class="mt-10">
            <v-row align="center" justify="center">
                <!-- Left Panel: Transactions -->
                <v-col cols="12" md="6" lg="4" xl="4" class="d-flex align-center">
                    <div>
                        <div class="text-h3 font-weight-bold mb-2">Painless budgeting</div>
                        <div class="text-body-1 grey--text">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit id cras enim egestas tellus eu accumsan himenaeos
                        </div>
                    </div>
                </v-col>

                <!-- Right Panel: Description -->
                <v-col cols="12" md="6" lg="4" xl="4">
                    <v-card class="pa-4" elevation="2">
                        <v-list dense>
                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-avatar color="blue lighten-3">
                                        <v-icon color="blue darken-2">mdi-food</v-icon>
                                    </v-avatar>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>Food & Beverage</v-list-item-title>
                                    <v-progress-linear :value="80" color="green" height="6" rounded class="mb-1" />
                                    <v-chip x-small color="grey lighten-2" class="ma-0">Today</v-chip>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <span class="font-weight-bold">4,000,000</span>
                                </v-list-item-action>
                            </v-list-item>

                            <v-divider />

                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-avatar color="amber lighten-3">
                                        <v-icon color="red">mdi-bus</v-icon>
                                    </v-avatar>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>Transportation</v-list-item-title>
                                    <v-progress-linear :value="30" color="red" height="6" rounded class="mb-1" />
                                    <v-chip x-small color="grey lighten-2" class="ma-0">Today</v-chip>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <span class="font-weight-bold red--text">450,000</span>
                                </v-list-item-action>
                            </v-list-item>

                            <v-divider />

                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-avatar color="teal lighten-3">
                                        <v-icon color="teal darken-2">mdi-basket</v-icon>
                                    </v-avatar>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>Mua sắm</v-list-item-title>
                                    <v-progress-linear :value="60" color="orange" height="6" rounded class="mb-1" />
                                    <v-chip x-small color="grey lighten-2" class="ma-0">Today</v-chip>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <span class="font-weight-bold">2,800,000</span>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        
        <!-- Feedback -->
        <v-container fluid class="fill-height pa-10 mt-5">
            <v-spacer></v-spacer>
            <h2 class="pa-3">See what others have to say</h2>
            <v-spacer></v-spacer>
            <v-row>
                <v-col v-for="testimonial in testimonials" :key="testimonial.name" cols="12" sm="6" md="4">
                    <v-card class="mx-auto" outlined>
                        <v-card-text class="text-center">
                            <v-icon color="primary" class="display-2">mdi-quote</v-icon>
                            <p class="mt-4">{{ testimonial.feedback }}</p>
                            <v-divider></v-divider>
                            <div class="text-center mt-2">
                                <strong>{{ testimonial.name }}</strong>
                                <p>{{ testimonial.position }}</p>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

         <!-- Download -->
        <v-container fluid class="fill-height">
            <v-row align="center" justify="center">
              <v-col cols="12" md="10">
                <v-card class="rounded-2xl" color="#388E3C" dark>
                  <v-card-text class="py-10 px-6 px-md-12">
                    <v-row class="d-flex flex-column flex-md-row">
                      <!-- Left Text Content -->
                      <v-col
                        cols="12"
                        md="6"
                        class="text-center text-md-left d-flex flex-column justify-center mb-8 mb-md-0"
                      >
                        <div>
                          <h1 class="text-h4 text-md-h3 font-weight-bold mb-4">
                            Take your finances to the next level!
                          </h1>
                          <p class="text-body-1 mb-6">
                            Don’t hesitate, money matters.
                          </p>
                          <div class="d-flex flex-wrap justify-center justify-md-start">
                            <v-btn
                              color="black"
                              class="ma-2 rounded-xl elevation-2"
                              href="#"
                              target="_blank"
                              rel="noopener"
                            >
                              <v-icon left>mdi-apple</v-icon>
                              App Store
                            </v-btn>
                            <v-btn
                              color="black"
                              class="ma-2 rounded-xl elevation-2"
                              href="#"
                              target="_blank"
                              rel="noopener"
                            >
                              <v-icon left>mdi-google-play</v-icon>
                              Google Play
                            </v-btn>
                          </div>
                        </div>
                      </v-col>
          
                      <!-- Right Image -->
                      <v-col cols="12" md="6" class="text-center">
                        <v-img
                          :src="require('@/assets/budget/phone.png')"
                          max-width="300"
                          class="mx-auto"
                          contain
                        ></v-img>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
        </v-container>
          
        <!-- Footer -->
        <v-footer app>
            <v-row>
                <v-col class="text-center" cols="12">
                    <v-icon>mdi-facebook</v-icon>
                    <v-icon>mdi-instagram</v-icon>
                    <v-icon>mdi-twitter</v-icon>
                </v-col>
                <v-col class="text-center" cols="12">
                    <span>&copy; 2025 Your Company. All rights reserved.</span>
                </v-col>
            </v-row>
        </v-footer>
    </div>
</template>

<script>
    import LoginPage from "./views/LoginPage.vue";

    export default {
        components: {
            LoginPage,
        },
        data() {
            return {
                tab: 1,
                modal: false,
                projects: [
                    {
                        id: 1,
                        name: "100% Secured data",
                        image: "https://cdn-icons-png.flaticon.com/512/10108/10108414.png",
                    },
                    {
                        id: 2,
                        name: "1 Million+ users",
                        image: "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/users5.png",
                    },
                    {
                        id: 3,
                        name: "100K+ 5-star Reviews",
                        image: "https://cdn-icons-png.flaticon.com/512/2065/2065224.png",
                    },
                    {
                        id: 4,
                        name: "App of the day",
                        image: "https://cdn-icons-png.freepik.com/512/4168/4168977.png",
                    },
                ],
                testimonials: [
                    {
                        name: "John Smith",
                        position: "Founder, Tech Corp",
                        feedback: "Lorem ipsum dolor sit amet consectetur adipiscing elit id cras enim egestas tellus eu accumsan himenaeos, platea non imperdiet cubilia suscipit molestie at quisque mus aenean dictum tempor felis.",
                    },
                    {
                        name: "Jane Doe",
                        position: "Marketing Director, Bright Ideas",
                        feedback:
                            "Lorem ipsum dolor sit amet consectetur adipiscing elit id cras enim egestas tellus eu accumsan himenaeos, platea non imperdiet cubilia suscipit molestie at quisque mus aenean dictum tempor felis.",
                    },
                    {
                        name: "Kim Chiu",
                        position: "CEO, Global Solutions",
                        feedback:
                            "Lorem ipsum dolor sit amet consectetur adipiscing elit id cras enim egestas tellus eu accumsan himenaeos, platea non imperdiet cubilia suscipit molestie at quisque mus aenean dictum tempor felis.",
                    },
                ],
            };
        },
    };
</script>

<style scoped>
    body {
        background-color: #ffffff;
        color: black;
    }
    .text-capitalized {
        text-transform: capitalize;
    }
    .full-card {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .project-image {
        width: 100%;
        max-height: 150px;
        object-fit: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
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
    .v-list-item-avatar {
        background: transparent;
    }
    .text-primary {
        color: #1976d2 !important;
    }
    .text-error {
        color: #e53935 !important;
    }
</style>
