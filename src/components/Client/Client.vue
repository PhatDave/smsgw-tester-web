<script>
import DefaultJob from "@/components/Client/DefaultJob.vue";

export default {
	components: {DefaultJob},
	props: ['client'],
	data() {
		return {
			client: this.client,
		}
	},
	emits: [
		'deleteClientFromList',
	],
	beforeMount() {
		this.client.openWebsocket();
	},
	methods: {
		deleteClientFromList() {
			const clientId = this.client.id;
			this.client.delete();
			this.$emit('deleteClientFromList', clientId);
		},
		getStatusClass() {
			if (this.client.status === 'NOT CONNECTED') {
				return "bg-danger";
			} else if (this.client.status === 'CONNECTED') {
				return "bg-warning";
			} else {
				return "bg-success";
			}
		},
		updateSingleJob() {
			this.client.configDefault();

		},
		updateMultiJob() {
			this.client.configureDefaultMany();
		},
		connectClient() {
			this.client.connect();
		},
		bindClient() {
			this.client.bind();
		},
		disconnectClient() {
			this.client.disconnect();
		},
		sendOne() {
			this.client.sendDefault();
		},
		sendMany() {
			this.client.sendDefaultMany();
		}
	}
}
</script>

<template>
	<div class="card my-2">
		<div class="card-header" :class="getStatusClass()">
			<div class="row justify-content-center align-items-center">
				<div class="col-6">{{ client.status }}</div>
				<div class="col-6 text-end">
					<button v-if="client.status === 'NOT CONNECTED'" class="btn btn-sm btn-warning mx-1" @click="connectClient">
						Connect
					</button>
					<button v-if="client.status !== 'NOT CONNECTED' && client.status !== 'BOUND'" class="btn btn-sm btn-success mx-1" @click="bindClient">
						Bind
					</button>
					<button v-if="client.status === 'CONNECTED' || client.status === 'BOUND'" class="btn btn-sm btn-danger mx-1" @click="disconnectClient">
						Disconnect
					</button>
				</div>
			</div>
		</div>
		<div class="card-body">
			<h5 class="card-title mb-3 text-center">
				{{ client.url }}
			</h5>
			<div class="row g-1 align-items-center">
				<div class="col-5">
					<input type="text" class="form-control" placeholder="Username" :value="client.username"
					       @input="event => client.setUsername(event.target.value)">
				</div>
				<div class="col-5">
					<input type="text" class="form-control" placeholder="Password" :value="client.password"
					       @input="event => client.setPassword(event.target.value)">
				</div>
				<div class="col-2">
					<button type="button" class="btn btn-sm btn-outline-danger" @dblclick="deleteClientFromList()">Delete</button>
				</div>
				<!-- TODO: Progress Bar -->
			</div>
			<hr>
			<div class="p-2">
				<DefaultJob :default-job="client.defaultJob" :default-multi-job="client.defaultMultiJob"
				            @singleJob="updateSingleJob"
				            @multiJob="updateMultiJob"
				            @sendOne="sendOne"
				            @sendMany="sendMany"/>
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
}
</style>