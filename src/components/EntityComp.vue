<script lang="ts">
import {DefaultChartOptions} from "../API/CommonObjects";
import Entity from "../API/Entity/Entity";
import Styles from "../API/Entity/StatusStyles/Styles";
import ActionButton from "./ActionButton.vue";
import InputFieldComponent from "./InputFieldComponent.vue";
import JobComp from "./JobComp.vue";
import ProcessorContainer from "./ProcessorContainer.vue";

export default {
	name: "Entity",
	components: {InputFieldComponent, ProcessorContainer, ActionButton, JobComp},
	props: {
		entity: Entity
	},
	data() {
		return {
			chartOptionsRX: DefaultChartOptions.chartOptions,
			chartOptionsTX: DefaultChartOptions.chartOptions,
		}
	},
	emits: {
		deleteEntity: (entity: Entity) => true
	},
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
		Styles() {
			return Styles
		},
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
		<div class="infoContainer">
			<InputFieldComponent :entity="entity" field="username"/>
			<InputFieldComponent :entity="entity" field="password"/>
			<button @dblclick="deleteEntity" class="BAD">Delete</button>
		</div>
		<div class="row">
			<JobComp :entity="entity"
			         :job="entity.defaultSingleJob"
			         :title="singleSendJobTitle"/>
			<JobComp :entity="entity"
			         :job="entity.defaultMultipleJob"
			         :title="multiSendJobTitle"/>
		</div>
		<div class="text-center my-2">
			<h5>Processors</h5>
			<div class="processorContainer">
				<ProcessorContainer :entity="entity"
				                    :processors="entity.availablePreprocessors"/>
				<ProcessorContainer :entity="entity"
				                    :processors="entity.availablePostprocessors"/>
			</div>
		</div>
		<div class="row text-center">
			<div class="col-6">
				<h5 class="m-0">Receive</h5>
				<apexchart ref="chart" :options="chartOptionsRX" :series="entity.graphDataRX.series"
				           height="250"
				           type="area"/>
			</div>
			<div class="col-6">
				<h5 class="m-0">Send</h5>
				<apexchart ref="chart" :options="chartOptionsTX" :series="entity.graphDataTX.series"
				           height="250"
				           type="area"/>
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
}
.buttonContainer {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	padding: 0.3vh;
}

.infoContainer {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
}
.infoContainer * {
	margin: 0 0.3rem;
}
</style>