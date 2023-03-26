import App from "@/App.vue";
import {createApp} from 'vue'
import {createRouter, createWebHistory} from "vue-router";

import './style.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const routes = [{
    path: '/', component: App
}]

const router = createRouter({
    history: createWebHistory(), routes,
});

createApp({}).use(router).mount('#app');
