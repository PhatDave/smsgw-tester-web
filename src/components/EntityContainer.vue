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
	} {
		return {
			parentMaxIter: 10,
		};
	},
	emits: {
		deleteEntity: () => true
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
			let panel: HTMLElement = target.nextElementSibling as HTMLElement;
			panel.classList.toggle("active");
		}
	},
}
</script>

<template>
	<div v-for="entity in this.entities">
		<button :style="entity.statusStyle" class="accordion" @click="open">
			{{ entity.status }} [{{ entity.arg }}]
		</button>
		<div :style="entity.panelStatusStyle" class="panel">
			<EntityComp :entity="entity" @deleteEntity="deleteEntity"/>
		</div>
	</div>
</template>

<style scoped>
.accordion {
	background-color: #eee;
	color: #444;
	cursor: pointer;
	padding: 18px;
	width: 100%;
	border: none;
	outline: none;
	transition: 0.2s;
	font-weight: bold;
	text-align: center;
	font-size: 1.2rem;
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

.panel.active {
	max-height: 1000px;
}
</style>