<script lang="ts">
import Action from "../API/Entity/EntityActions/Action";

export default {
	name: "ActionButton",
	props: {
		action: Action
	}
}
</script>

<template>
	<button v-if="action.active()" @click="action.execute()">
		{{action.name}}
	</button>
</template>

<style scoped>

</style>