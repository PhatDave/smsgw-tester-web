<script lang="ts">

import Entity from "../API/Entity/Entity";
import PDUProcessor from "../API/Entity/PDUProcessor/PDUProcessor";
import ProcessorComponent from "./ProcessorComponent.vue";

export default {
	name: "ProcessorContainer",
	components: {ProcessorComponent},
	props: {
		entity: Entity,
		processors: Array<PDUProcessor>,
	},
	methods: {
		toggleProcessor(processor: PDUProcessor): void {
			let existingProcessor = this.entity.processors.find((p: PDUProcessor) => p.name === processor.name);
			if (existingProcessor) {
				this.entity.removeProcessor(processor);
			} else {
				this.entity.addProcessor(processor);
			}
		},
		isActive(processor: PDUProcessor): boolean {
			return this.entity.processors.find((p: PDUProcessor) => p.name === processor.name) !== undefined;
		},
	}
}
</script>

<template>
	<div class="container">
		<template v-for="processor in processors">
			<ProcessorComponent :processor="processor"
			                    :active="isActive(processor)"
			                    @click="toggleProcessor(processor)"/>
		</template>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
}
</style>
