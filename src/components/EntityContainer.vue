<script lang="ts">
import Entity from "../API/Entity/Entity";
import EntityComp from "./EntityComp.vue";
import HeaderComp from "./HeaderComp.vue";

export default {
	name: "EntityContainer",
	components: {HeaderComp, EntityComp},
	props: {
		entities: {
			type: Array<Entity>,
			required: true
		}
	},
	data(): {
		parentMaxIter: number,
		currentlyActive: HTMLElement | undefined
	} {
		return {
			parentMaxIter: 10,
			currentlyActive: undefined,
		};
	},
	emits: {
		deleteEntity: (entity: Entity) => true
	},
	updated() {
		if (this.currentlyActive) {
			this.currentlyActive.click();
		}
	},
	methods: {
		deleteEntity(entity: Entity): void {
			this.$emit("deleteEntity", entity);
		},
		open(event: Event): void {
			let target: HTMLElement = event.target as HTMLElement;
			let iter: number = 0;
			while (target.classList.contains("accordion") === false) {
				target = target.parentElement as HTMLElement;
				iter++;
				if (iter > this.parentMaxIter) {
					throw new Error("Could not find parent with class accordion");
				}
			}
			target.classList.toggle("active");
			this.currentlyActive = target;

			let panel: HTMLElement = target.nextElementSibling as HTMLElement;
			if (panel && panel.style) {
				if (panel.style.maxHeight) {
					panel.style.maxHeight = null;
				} else {
					panel.style.maxHeight = panel.scrollHeight + "px";
				}
			}
		},
	},
}
</script>

<template>
	<div>
		<template v-for="entity in this.entities">
			<button :style="entity.statusStyle" class="accordion" @click="open">
				{{ entity.status }} [{{ entity.arg }}]
			</button>
			<div :style="entity.panelStatusStyle" class="panel">
				<EntityComp :entity="entity" @deleteEntity="deleteEntity"/>
			</div>
		</template>
	</div>
</template>

<style scoped>
.accordion {
	background-color: #eee;
	color: #444;
	cursor: pointer;
	padding: 18px;
	width: 100%;
	text-align: left;
	border: none;
	outline: none;
	transition: 0.2s;
}

.active, .accordion:hover {
	background-color: #ccc;
}

.panel {
	padding: 0 18px;
	background-color: white;
	max-height: 0;
	overflow: hidden;
	transition: max-height 0.2s ease-out;
}
</style>