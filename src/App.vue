<script>
import API from '@/API.js';
import Client from '@/components/Client/Client.vue';
import Center from '@/components/Center/Center.vue';

export default {
	components: {
		Client,
		Center
	},
	data() {
		return {
			clients: [],
			centers: [],
			api: new API()
		}
	},
	beforeMount() {
		this.api.getClients().then(response => {
			this.clients = response;
		});
		this.api.getCenters().then(response => {
			this.centers = response;
		});
	}
}
</script>

<template>
	<div class="listContainer">
		<Client v-for="client in clients" :client="client"/>
	</div>
	<div class="listContainer">
		<Center v-for="center in centers" :center="center"/>
	</div>
</template>

<style>
</style>
