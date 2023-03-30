<script lang="ts">

export default {
	name: "HeaderComp",
	emits: ['updateManagedEntity'],
	props: {
		entity: null,
	},
	methods: {
		updateManagedEntity(): void {
			this.$emit('updateManagedEntity', this.entity);
		}
	}
}
</script>

<template>
	<div class="text-center">
		<span class="display-6">{{ entity.name }}</span> &nbsp;
		<span class="addButton" data-bs-toggle="modal" data-bs-target="#addClientModal" @click="updateManagedEntity">
		          Add+
		        </span>
	</div>
</template>

<style scoped>
.addButton:hover {
	cursor: pointer;
}
</style>