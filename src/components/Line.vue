<script>
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";
import {Line} from "vue-chartjs";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

export default {
	name: 'LineChart',
	props: ['data', 'options'],
	components: {Line},
	computed: {
		chartData() {
			return this.data;
		},
		chartOptions() {
			return this.options;
		}
	},
	beforeMount() {
		console.log(this.data);
	}
}
</script>

<template>
	<Line
		id="my-chart-id"
		:options="chartOptions"
		:data="chartData"
	/>
</template>