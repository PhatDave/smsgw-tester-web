<script>
import DefaultJob from "@/components/Client/DefaultJob.vue";

export default {
	components: {DefaultJob},
	props: ['center'],
	data() {
		return {
			center: this.center,
		}
	},
	emits: ['deleteCenterFromList'],
	mounted() {
		this.center.openWebsocket();
	},
	updated() {
		this.center.openWebsocket();
	},
	methods: {
		getStatusClass() {
			if (this.center.status === 'WAITING_CONNECTION') {
				return "bg-warning";
			} else if (this.center.status === 'CONNECTION_PENDING') {
				return "bg-custom-yellow-green";
			} else {
				return "bg-success";
			}
		},
		disconnectCenter() {
			this.center.disconnect();
		},
		deleteCenterFromList() {
			const centerId = this.center.id;
			this.center.delete();
			this.$emit('deleteCenterFromList', centerId);
		},
	}
}
</script>

<template>

	<div class="card my-2">
		<div class="card-header" :class="getStatusClass()">
			<div class="row justify-content-center align-items-center">
				<div class="col-6">{{ center.status }}</div>
				<div class="col-6 text-end">
					<button v-if="center.status === 'CONNECTED' || center.status === 'CONNECTION PENDING'" class="btn btn-sm btn-danger mx-1"
					        @click="disconnectCenter">
						Disconnect
					</button>
				</div>
			</div>
		</div>
		<div class="card-body">
			<h5 class="card-title mb-3 text-center">
				{{ center.url }}
			</h5>
			<div class="row g-1 align-items-center">
				<div class="col-5">
					<input type="text" class="form-control" placeholder="Username" :value="center.username"
					       @input="event => center.setUsername(event.target.value)">
				</div>
				<div class="col-5">
					<input type="text" class="form-control" placeholder="Password" :value="center.password"
					       @input="event => center.setPassword(event.target.value)">
				</div>
				<div class="col-2">
					<button type="button" class="btn btn-sm btn-outline-danger" @dblclick="deleteCenterFromList()">Delete</button>
				</div>
				<div class="col-12">
					<!-- <div>{{ center.sendCounter }}</div>
					TODO: Implement progress bar -->
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.bg-custom-yellow-green {
	background-color: #9ACD32;
}
</style>