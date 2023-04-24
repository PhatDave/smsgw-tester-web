<script lang="ts">
import Action from "../API/Entity/EntityActions/Action";

export default {
	name: "ActionButton",
	props: {
		action: Action
	},
	computed: {
		getClass() {
			let clazz = {};
			clazz[this.action.type] = true;
			clazz["DISABLED"] = !this.action.active();
			return clazz;
		}
	}
}
</script>

<template>
	<button :class="getClass" @click="action.execute()">
		{{ action.name }}
	</button>
</template>

<style scoped>
button {
	margin: 0 .3rem;
}
</style>