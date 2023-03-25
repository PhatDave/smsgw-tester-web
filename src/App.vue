<script>
import API from '@/API.js';
export default {
	data() {
		return {
			clients: [],
			api: new API()
		}
	},
	beforeMount() {
		this.api.getClients().then(response => {
			console.log(response);
			this.clients = response.data;
		});
	}
}
</script>

<template>
</template>

<style>
</style>
