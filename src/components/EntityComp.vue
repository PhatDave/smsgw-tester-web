<script lang="ts">
import {DefaultChartOptions} from "../API/CommonObjects";
import Entity from "../API/Entity/Entity";
import PDUProcessor from "../API/Entity/PDUProcessor/PDUProcessor";
import ActionButton from "./ActionButton.vue";
import JobComp from "./JobComp.vue";

export default {
	name: "Entity",
	components: {ActionButton, JobComp},
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
		toggleProcessor(processor: PDUProcessor): void {
			let existingProcessor = this.entity.processors.find((p: PDUProcessor) => p.name === processor.name);
			if (existingProcessor) {
				this.entity.removeProcessor(processor);
			} else {
				this.entity.addProcessor(processor);
			}
		},
		isActive(processor: PDUProcessor): boolean {
			return this.entity.processors.find((p: PDUProcessor) => p.name === processor.name) !== undefined;
		}
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
	<ActionButton :action="entity.actions.disconnect"/>
	<ActionButton :action="entity.actions.connect"/>
	<ActionButton :action="entity.actions.bind"/>
	<div>
		<div class="row g-1 align-items-center">
			<!-- TODO: Generify these inputs -->
			<div class="col-5">
				<input type="text" class="form-control" placeholder="Username" :value="entity.username"
				       @input="event => entity.username = event.target.value">
			</div>
			<div class="col-5">
				<input type="text" class="form-control" placeholder="Password" :value="entity.password"
				       @input="event => entity.password = event.target.value">
			</div>
			<div class="col-2">
				<button type="button" class="btn btn-sm btn-danger w-100" @dblclick="deleteEntity">Delete</button>
			</div>
			<!-- TODO: Progress Bar -->
		</div>
		<div class="row">
			<JobComp :job="entity.defaultSingleJob"
			         :title="singleSendJobTitle"
			         :entity="entity"/>
			<JobComp :job="entity.defaultMultipleJob"
			         :title="multiSendJobTitle"
			         :entity="entity"/>
		</div>
		<div class="container row text-center my-2 align-items-center justify-content-center">
			<h6>Modes</h6>
			<!--			TODO: Maybe generify this-->
			<template v-for="processor in entity.availablePreprocessors">
				<div>
					<button :class="{processorActive: isActive(processor)}"
					        @click="toggleProcessor(processor)">
						{{ processor.name }}
					</button>
				</div>
			</template>
			<template v-for="processor in entity.availablePostprocessors">
				<div>
					<button :class="{processorActive: isActive(processor)}"
					        @click="toggleProcessor(processor)">
						{{ processor.name }}
					</button>
				</div>
			</template>
		</div>
		<div class="container">
			<apexchart type="area" height="250" ref="chart"
			           :options="chartOptionsRX"
			           :series="entity.graphDataRX.series"></apexchart>
		</div>
		<div class="container">
			<apexchart type="area" height="250" ref="chart"
			           :options="chartOptionsTX"
			           :series="entity.graphDataTX.series"></apexchart>
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

.processorActive {
	background-color: #00ff00;
}
</style>