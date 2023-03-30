<script lang="ts">
export default {
	name: "HeaderComp",
	emits: {
		addEntity: null
	},
	props: {
		title: String,
	},
	methods: {
		addEntity() {
			this.$emit('addEntity');
		}
	}
}
</script>

<template>
	<div class="text-center">
		<span class="display-6">{{ title }}</span> &nbsp;
		<span class="addButton" data-bs-toggle="modal" data-bs-target="#addClientModal" @click="addEntity">
		          Add+
		        </span>
	</div>
</template>

<style scoped>
.addButton:hover {
	cursor: pointer;
}
</style>