<script lang="ts">
import PDUProcessor from "../API/Entity/PDUProcessor/PDUProcessor";

export default {
	name: "ProcessorComponent",
	props: {
		processor: {
			type: PDUProcessor,
			required: true
		},
		active: {
			type: Boolean,
			required: true
		}
	},
	computed: {
		name(): string {
			return this.processor.name.replace("Processor", "");
		},
		clazz(): { [key: string]: boolean } {
			return {
				'active': this.active
			}
		}
	}
}
</script>

<template>
	<button :class="clazz">
		{{ name }}
	</button>
</template>

<style scoped>
button {
	width: 100%;
	font-size: 1rem;
	height: 2rem;
}

.active {
	background-color: greenyellow;
}
</style>