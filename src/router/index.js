import Vue from 'vue';
import VueRouter from 'vue-router';
import CompCreate from '../components/good-reads/components/CompCreate.vue';
import ContactMe from '../components/ContactMe.vue';
import GoodreadsComponent from '../components/good-reads/GoodreadsComponent.vue';
import ProjectList from '../components/ProjectList.vue';
import SideBar from '../components/CertificatesList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/comp-create',
    name: 'CompCreate',
    component: CompCreate
  },
  {
    path: '/contact-me',
    name: 'ContactMe',
    component: ContactMe
  },
  {
    path: '/goodreads',
    name: 'Goodreads',
    component: GoodreadsComponent
  },
  {
    path: '/project-list',
    name: 'ProjectList',
    component: ProjectList
  },
  {
    path: '/side-bar',
    name: 'SideBar',
    component: SideBar
  },
];

const router = new VueRouter({
  routes,
});

export default router
