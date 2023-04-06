<script lang="ts">
import Entity from "../API/Entity/Entity";
import Job from "../API/Entity/Job";
import ActionButton from "./ActionButton.vue";

export default {
	name: "Job",
	components: {ActionButton},
	props: {
		job: Job,
		title: String,
		entity: Entity
	},
	methods: {
		changed() {
			let changed: boolean = false;
			changed = this.updateIfNecessary('source', this.$refs.source.value) || changed;
			changed = this.updateIfNecessary('destination', this.$refs.destination.value) || changed;
			changed = this.updateIfNecessary('message', this.$refs.message.value) || changed;
			if (this.$refs.perSecond) {
				changed = this.updateIfNecessary('perSecond', this.$refs.perSecond.value) || changed;
				changed = this.updateIfNecessary('count', this.$refs.count.value) || changed;
			}
			if (changed) {
				this.job.parent.updateJobs();
			}
		},
		updateIfNecessary(field: string, newValue: any): boolean {
			if (this.job[field] !== newValue) {
				this.job[field] = newValue;
				return true;
			}
			return false;
		}
	}
}
</script>

<template>
	<div class="col-6 p-2">
		<h6 class="text-center">{{ title }}</h6>
		<div class="row g-1 text-center">
			<!-- TODO: Generify these inputs -->
			<div class="col-6">
				<input ref="source" :value="job.source" class="form-control" placeholder="Source" type="text"
				       @input="changed"/>
			</div>
			<div class="col-6">
				<input ref="destination" :value="job.destination" class="form-control" placeholder="Destination" type="text"
				       @input="changed"/>
			</div>
			<div class="col-12">
					<textarea ref="message" :value="job.message" class="form-control" cols="50" placeholder="Message" rows="2"
					          @input="changed"/>
			</div>
			<div v-if="!!job.perSecond" class="col-8">
				<div class="input-group">
					<input ref="perSecond" :value="job.perSecond" class="form-control" min="0" placeholder="0" type="number"
					       @input="changed"/>
					<label class="input-group-text" for="multiJobInterval">
						m/s
					</label>
				</div>
			</div>
			<div v-if="!!job.count" class="col-4">
				<input ref="count" :value="job.count" class="form-control" min="0" placeholder="0" type="number"
				       @input="changed"/>
			</div>
			<div class="col-12 mt-2">
				<ActionButton v-if="!job.perSecond" :action="entity.actions.doSend"/>
				<ActionButton v-if="!!job.perSecond" :action="entity.actions.doSendMany"/>
				<ActionButton v-if="!!job.perSecond" :action="entity.actions.doStopSend"/>
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
	resize: none;
	background-color: inherit;
}

.input-group-text {
	background-color: inherit;
	border: none;
	border-bottom: 1px solid #eee;
	border-radius: 0;
}
</style>