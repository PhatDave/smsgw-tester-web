<script lang="ts">

import Entity from "../API/Entity/Entity";
import PDUProcessor from "../API/Entity/PDUProcessor/PDUProcessor";

export default {
	name: "ProcessorContainer",
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
		}
	}
}
</script>

<template>
	<div>
		<template v-for="processor in processors">
			<div class="container">
				<button :class="{processorActive: isActive(processor)}"
				        @click="toggleProcessor(processor)">
					{{ processor.name }}
				</button>
			</div>
		</template>
	</div>
</template>

<style scoped>
.container {
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-template-rows: 1fr;
}

.processorActive {
	background-color: #00ff00;
}
</style>