<script lang="ts">

import Entity from "../API/Entity/Entity";

export default {
	name: "HeaderComp",
	emits: ['updateManagedEntity'],
	props: {
		entity: typeof Entity,
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
		<h5 class="d-inline m-auto">{{ entity.name }}</h5>
		&nbsp;
		<h6 class="d-inline addButton m-auto" data-bs-target="#addClientModal" data-bs-toggle="modal" @click="updateManagedEntity">
			Add+
		</h6>
	</div>
</template>

<style scoped>
.addButton:hover {
	cursor: pointer;
	color: #fff;
	box-shadow: inset 200px 0 0 0 deeppink;
}

.addButton {
	box-shadow: inset 0 0 0 0 deeppink;
	color: #000;
	padding: 0 .25rem;
	margin: 0 -.25rem;
	transition: all .5s ease;
}
</style>