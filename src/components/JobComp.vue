<script lang="ts">
import Job from "../API/Entity/Job";

export default {
	name: "Job",
	props: {
		job: Job | undefined,
		busy: Boolean,
		title: String,
	},
	emits: [],
	data() {
		return {}
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
		},
		runJob() {
			this.job.parent.runJob(this.job);
		},
		stopJob() {
			this.parent.stopJob();
		}
	}
}
</script>

<template>
	<div class="col-6 p-2">
		<h6 class="text-center">{{ title }}</h6>
		<div class="row g-1 text-center">
			<div class="col-6">
				<input class="form-control" type="text" :value="job.source" ref="source" placeholder="Source"
				       @input="changed"/>
			</div>
			<div class="col-6">
				<input class="form-control" type="text" :value="job.destination" ref="destination" placeholder="Destination"
				       @input="changed"/>
			</div>
			<div class="col-12">
					<textarea class="form-control" rows="2" cols="50" :value="job.message" ref="message" placeholder="Message"
					          @input="changed"/>
			</div>
			<div class="col-8" v-if="!!job.perSecond">
				<div class="input-group">
					<input class="form-control" type="number" :value="job.perSecond" ref="perSecond" min="0" placeholder="0"
					       @input="changed"/>
					<label for="multiJobInterval" class="input-group-text">
						m/s
					</label>
				</div>
			</div>
			<div class="col-4" v-if="!!job.count">
				<input class="form-control" type="number" :value="job.count" ref="count" min="0" placeholder="0"
				       @input="changed"/>
			</div>
			<div class="col-12 mt-2">
				<button v-if="!busy" class="btn btn-success w-75" @click="runJob">
					Run Job
				</button>
				<button v-if="busy" class="btn btn-success w-75" @click="stopJob">
					Stop Job
				</button>
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