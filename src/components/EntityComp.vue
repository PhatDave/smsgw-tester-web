<script lang="ts">
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
			// TODO: Create a type for this
			chartOptions: {
				chart: {
					height: 350,
					type: 'area',
					animations: {
						enabled: true,
						easing: 'easeinout',
						speed: 800,
						animateGradually: {
							enabled: true,
							delay: 150
						},
						dynamicAnimation: {
							enabled: true,
							speed: 350
						}
					},
					toolbar: {
						show: false
					}
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: 'smooth'
				},
				xaxis: [],
				tooltip: {
					x: {
						format: 'dd/MM/yy HH:mm'
					},
				},
			},
		}
	},
	emits: ['deleteEntity'],
	beforeMount() {
		console.log(this.entity.availableProcessors);
		this.chartOptions.xaxis = this.entity.getGraphData();
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
			<template v-for="processor in entity.availableProcessors">
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
			           :options="chartOptions"
			           :series="entity.getGraphData().series"></apexchart>
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