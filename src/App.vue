<script>
import API from '@/API.js';
import Client from '@/components/Client.vue';

export default {
	components: {
		Client,
	},
	data() {
		return {
			clients: [],
			api: new API()
		}
	},
	beforeMount() {
		this.api.getClients().then(response => {
			this.clients = response;
		});
	}
}
</script>

<template>
	<div class="listContainer">
		<Client v-for="client in clients" :client="client"/>
	</div>
</template>

<style>
</style>
