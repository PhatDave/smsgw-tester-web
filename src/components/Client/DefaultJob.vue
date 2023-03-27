<script>
export default {
	name: "DefaultJob",
	props: [
		'defaultJob',
		'defaultMultiJob'
	],
	emits: [
		'singleJob',
		'multiJob',
		'sendOne',
		'sendMany'
	],
	data() {
		return {
		}
	},
	methods: {
		isSameId(eventId, matchingId) {
			return eventId === matchingId;
		},
		updateSingleJob(event) {
			const id = event.target.id;
			if (this.isSameId(id, "singleJobSource")) {
				this.defaultJob.source = event.target.value;
			}
			if (this.isSameId(id, "singleJobDestination")) {
				this.defaultJob.destination = event.target.value;
			}
			if (this.isSameId(id, "singleJobMessage")) {
				this.defaultJob.message = event.target.value;
			}
			this.$emit('singleJob');
		},
		updateMultiJob(event) {
			const id = event.target.id;
			if (this.isSameId(id, "multiJobSource")) {
				this.defaultMultiJob.source = event.target.value;
			}
			if (this.isSameId(id, "multiJobDestination")) {
				this.defaultMultiJob.destination = event.target.value;
			}
			if (this.isSameId(id, "multiJobMessage")) {
				this.defaultMultiJob.message = event.target.value;
			}
			if (this.isSameId(id, "multiJobMps")) {
				this.defaultMultiJob.mps = event.target.value;
			}
			if (this.isSameId(id, "multiJobCount")) {
				this.defaultMultiJob.count = event.target.value;
			}
			this.$emit('multiJob');
		},
		doSendOne() {
			this.$emit('sendOne');
		},
		doSendMany() {
			this.$emit('sendMany');
		}
	}
}
</script>

<template>
	<div class="row">
		<div class="col-6 p-2">
			<h6 class="text-center">Single Send</h6>
			<div class="row g-1 text-center">
				<div class="col-12">
					<input class="form-control" type="text" :value="defaultJob.source" id="singleJobSource" placeholder="Source" @input="updateSingleJob"/>
				</div>
				<div class="col-12">
					<input class="form-control" type="text" :value="defaultJob.destination" id="singleJobDestination" placeholder="Destination"
					       @input="updateSingleJob"/>
				</div>
				<div class="col-12">
					<textarea class="form-control" rows="4" cols="50" :value="defaultJob.message" id="singleJobMessage" placeholder="Message"
					          @input="updateSingleJob"/>
				</div>
				<div class="col-12 mt-3">
					<button class="btn btn-success w-75" @click="doSendOne">
						Send
					</button>
				</div>
			</div>
		</div>
		<div class="col-6 p-2">
			<h6 class="text-center">Multi Send</h6>
			<div class="row g-1 text-center">
				<div class="col-12">
					<input class="form-control" type="text" :value="defaultMultiJob.source" id="multiJobSource" placeholder="Source" @input="updateMultiJob"/>
				</div>
				<div class="col-12">
					<input class="form-control" type="text" :value="defaultMultiJob.destination" id="multiJobDestination" placeholder="Destination"
					       @input="updateMultiJob"/>
				</div>
				<div class="col-12">
					<textarea class="form-control" rows="4" cols="50" :value="defaultMultiJob.message" id="multiJobMessage" placeholder="Message"
					          @input="updateMultiJob"/>
				</div>
				<div class="col-8">
					<div class="input-group">
						<input class="form-control" type="number" :value="defaultMultiJob.mps" id="multiJobMps" placeholder="0" @input="updateMultiJob"/>
						<label for="multiJobInterval" class="input-group-text">
							m/s
						</label>
					</div>
				</div>
				<div class="col-4">
					<input class="form-control" type="number" :value="defaultMultiJob.count" id="multiJobCount" placeholder="0" @input="updateMultiJob"/>
				</div>
				<div class="col-12 mt-3">
					<button class="btn btn-success w-75" @click="doSendMany">
						Send
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
input {
	border: none;
	border-bottom: 1px solid #eee;
	border-radius: 0;
}

input:focus,
textarea:focus {
	outline: none !important;
	box-shadow: none;
	border-bottom: 1px solid #bbb;
}

textarea {
	border: none;
	border-bottom: 1px solid #eee;
	border-radius: 0;
	resize: none;
}

.input-group-text {
	background-color: inherit;
	border: none;
	border-bottom: 1px solid #eee;
	border-radius: 0;
}
</style>