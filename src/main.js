import App from "@/App.vue";
import {createApp} from 'vue'
import {createRouter, createWebHistory} from "vue-router";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueApexCharts from "vue3-apexcharts";
import './style.css';

const routes = [
	{
		path: '/:any*',
		component: App
	}
]

const router = createRouter({
	                            history: createWebHistory(),
	                            routes,
                            });


const app = createApp({});
app.use(router);
app.use(VueApexCharts);

app.mount('#app');