<script>
export default {
	props: ['client'],
	data() {
		return {}
	},
}
</script>

<template>
	<div class="client">
		<div class="clientHeader">
			<div class="clientName">{{ client.name }}</div>
			<div class="clientStatus">{{ client.status }}</div>
		</div>
		<div class="clientBody">
			<div class="clientUrl">{{ client.url }}</div>
			<div class="clientUsername">{{ client.username }}</div>
			<div class="clientPassword">{{ client.password }}</div>
		</div>
	</div>
</template>