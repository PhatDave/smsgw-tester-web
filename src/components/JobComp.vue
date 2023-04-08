<script lang="ts">
import Entity from "../API/Entity/Entity";
import Job from "../API/Entity/Job";
import ActionButton from "./ActionButton.vue";
import InputFieldComponent from "./InputFieldComponent.vue";

export default {
	name: "Job",
	components: {InputFieldComponent, ActionButton},
	props: {
		job: {
			type: Job,
			required: true
		},
		entity: {
			type: Entity,
			required: true
		},
		title: {
			type: String,
			required: true
		}
	},
}
</script>

<template>
	<div class="col-6 p-2">
		<h5 class="text-center">{{ title }}</h5>
		<div class="container">
			<InputFieldComponent :entity="job" field="source" title="Source"/>
			<InputFieldComponent :entity="job" field="destination" title="Destination"/>
			<InputFieldComponent :entity="job" field="message" class="grid-size-2" title="Message"/>
			<InputFieldComponent :entity="job" field="perSecond" v-if="job.isMulti" title="M/S"/>
			<InputFieldComponent :entity="job" field="count" v-if="job.isMulti" title="Count"/>
			<ActionButton v-if="!job.isMulti" :action="entity.actions.doSend" class="grid-size-2"/>
			<ActionButton v-if="job.isMulti" :action="entity.actions.doSendMany"/>
			<ActionButton v-if="job.isMulti" :action="entity.actions.doStopSend"/>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	justify-items: stretch;
	align-items: stretch;
	justify-content: stretch;
	align-content: stretch;
	row-gap: 0.15rem;
	column-gap: 0.1rem;
}
</style>