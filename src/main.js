import App from "@/App.vue";
import {createApp} from 'vue'
import {createRouter, createWebHistory} from "vue-router";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueApexCharts from "vue3-apexcharts";

const routes = [{
    path: '/', component: App
}]

const router = createRouter({
    history: createWebHistory(), routes,
});

createApp({}).use(router).use(VueApexCharts).mount('#app');
