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
	beforeMount() {
		this.client.openWebsocket();
	},
	methods: {
		nekaMetoda() {
			this.client.username = this.$refs.clientUsername.innerText;
			console.log(this.client.username);
			this.client.setUsername(this.client.username);
		}
	}
}
</script>

<template>
	<!--	:class="{ 'online': client.status === 'online', 'offline': client.status === 'offline' }">{{ client.status }}</div>-->
	<div :class="client.status">
		<div>
			{{ number }}
			<div>{{ client.status }}</div>
		</div>
		<div>
			<div>{{ client.url }}</div>
			<div contenteditable @keyup="usernameChange" @mousemove="nekaMetoda">{{ client.username }}</div>
			<div contenteditable>{{ client.password }}</div>
			<div>{{ client.sendCounter }}</div>
		</div>
		<DefaultJob :default-job="client.defaultJob" :default-multi-job="client.defaultMultiJob"/>
	</div>
</template>

<style scoped>
.NOT_CONNECTED {
	background-color: rgba(255, 0, 0, 0.3);
}

.CONNECTING, .CONNECTED {
	background-color: rgba(255, 255, 0, 0.3);
}

.BINDING, .BOUND {
	background-color: rgba(0, 255, 0, 0.3);
}
</style>