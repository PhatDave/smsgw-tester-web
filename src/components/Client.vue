<script>
export default {
	props: ['client'],
	data() {
		return {
			client: this.client,
		}
	},
	beforeMount() {
		console.log(this.client);
		console.log(this.client.ws);
		setInterval(() => {
			console.log(this.client.status);
		}, 1000);
	},
	watch: {
		status: {
			handler: function(val, oldVal) {
				console.log('Status changed to:', val);
			},
			deep: true
		}
	}

}
</script>

<template>
	<div>
		<div>
			<div>{{ client.name }}</div>
			<div>{{ client.status }}</div>
		</div>
		<div>
			<div>{{ client.url }}</div>
			<div>{{ client.username }}</div>
			<div>{{ client.password }}</div>
			<div>{{ client.sendCounter }}</div>
		</div>
	</div>
</template>