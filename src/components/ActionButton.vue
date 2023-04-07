<script lang="ts">
import Action from "../API/Entity/EntityActions/Action";

export default {
	name: "ActionButton",
	props: {
		action: Action
	},
	methods: {
		getClass(actionName) {
			switch (actionName) {
				case 'Disconnect':
				case 'Stop Send':
					return 'btn-danger'
				case 'Connect':
					return 'btn-success'
				case 'Bind':
					return 'btn-warning'
				case 'Send One':
				case 'Send Many':
					return 'btn-info';
			}
		}
	}
}
</script>

<template>
	<button :class="getClass(action.name)" class="btn btn-sm" :disabled="!action.active()" @click="action.execute()">
		{{ action.name }}
	</button>
</template>

<style scoped>
button {
	margin: 0 .3rem;
}
</style>