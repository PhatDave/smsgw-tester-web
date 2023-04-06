<script lang="ts">
import {DefaultChartOptions} from "../API/CommonObjects";
import Entity from "../API/Entity/Entity";
import ActionButton from "./ActionButton.vue";
import JobComp from "./JobComp.vue";
import ProcessorContainer from "./ProcessorContainer.vue";

export default {
	name: "Entity",
	components: {ProcessorContainer, ActionButton, JobComp},
	props: {
		entity: Entity
	},
	data() {
		return {
			chartOptionsRX: DefaultChartOptions.chartOptions,
			chartOptionsTX: DefaultChartOptions.chartOptions,
		}
	},
	emits: ['deleteEntity'],
	beforeMount() {
		this.chartOptionsRX.xaxis = this.entity.graphDataRX.xaxis;
		this.chartOptionsTX.xaxis = this.entity.graphDataTX.xaxis;
	},
	methods: {
		deleteEntity() {
			this.$emit('deleteEntity', this.entity);
		},
	},
	computed: {
		multiSendJobTitle(): string {
			return "Multi Send";
		},
		singleSendJobTitle(): string {
			return "Single Send";
		}
	}
}
</script>

<template>
	<div class="buttonContainer">
		<ActionButton :action="entity.actions.disconnect"/>
		<ActionButton :action="entity.actions.connect"/>
		<ActionButton :action="entity.actions.bind"/>
	</div>
	<div>
		<div class="row g-1 align-items-center">
			<!-- TODO: Generify these inputs -->
			<div class="col-5">
				<input :value="entity.username" class="form-control" placeholder="Username" type="text"
				       @input="event => entity.username = event.target.value">
			</div>
			<div class="col-5">
				<input :value="entity.password" class="form-control" placeholder="Password" type="text"
				       @input="event => entity.password = event.target.value">
			</div>
			<div class="col-2">
				<button class="btn btn-sm btn-danger w-100" type="button" @dblclick="deleteEntity">Delete</button>
			</div>
			<!-- TODO: Progress Bar -->
		</div>
		<div class="row">
			<JobComp :entity="entity"
			         :job="entity.defaultSingleJob"
			         :title="singleSendJobTitle"/>
			<JobComp :entity="entity"
			         :job="entity.defaultMultipleJob"
			         :title="multiSendJobTitle"/>
		</div>
		<div class="container row text-center my-2 align-items-center justify-content-center">
			<h6>Processors</h6>
			<div class="processorContainer">
				<ProcessorContainer :entity="entity"
				                    :processors="entity.availablePreprocessors"/>
				<ProcessorContainer :entity="entity"
				                    :processors="entity.availablePostprocessors"/>
			</div>
		</div>
		<div class="graphs">
			<div>
				<h5>Receive</h5>
				<apexchart ref="chart" :options="chartOptionsRX" :series="entity.graphDataRX.series"
				           height="250"
				           type="area"></apexchart>
			</div>
			<div>
				<h5>Send</h5>
				<apexchart ref="chart" :options="chartOptionsTX" :series="entity.graphDataTX.series"
				           height="250"
				           type="area"></apexchart>
			</div>
		</div>
	</div>
</template>

<style scoped>
input {
	border: none;
	border-bottom: 1px solid #eee;
	border-radius: 0;
	background-color: inherit;
}

input:focus,
textarea:focus {
	outline: none !important;
	box-shadow: none;
	border-bottom: 1px solid #eee;
	background-color: inherit;
}

textarea {
	border: none;
	border-bottom: 1px solid #eee;
	border-radius: 0;
}

.processorContainer {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 1fr;
}

.buttonContainer {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	padding: 0.3vh;
}

.graphs {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 1fr;
	width: 100%;
}
</style>