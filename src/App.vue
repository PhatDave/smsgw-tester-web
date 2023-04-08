<script lang="ts">
import CenterAPI from "./API/CenterAPI";
import ClientAPI from "./API/ClientAPI";
import {Form} from "./API/CommonObjects";
import CenterEntity from "./API/Entity/CenterEntity";
import ClientEntity from "./API/Entity/ClientEntity";
import Entity from "./API/Entity/Entity";
import EntityContainer from "./components/EntityContainer.vue";
import HeaderComp from "./components/HeaderComp.vue";
import ModalComp from "./components/ModalComp.vue";
import Overlay from "./Icons/Overlay.vue";

export default {
	beforeMount() {
		// Maybe we could implement this as an "IM DYING" message on WS?
		setInterval(function () {
			this.pingApi();
		}.bind(this), 500);
		this.pingApi().then(() => {
			if (this.apiAlive) {
				this.clientApi.doGetAll().then((response: ClientEntity[]) => {
					this.entities.ClientEntity = response;
				});
				this.centerApi.doGetAll().then((response: ClientEntity[]) => {
					this.entities.CenterEntity = response;
				});
			}
		});
	},
	components: {
		EntityContainer,
		HeaderComp,
		ModalComp,
		Overlay
	},
	computed: {
		ClientEntity(): typeof ClientEntity {
			return ClientEntity
		},
		CenterEntity(): typeof CenterEntity {
			return CenterEntity
		}
	},
	data(): {
		apiAlive: boolean,
		centerApi: CenterAPI,
		clientApi: ClientAPI,
		currentlyManagedEntityType: typeof Entity | null,
		entities: {
			'ClientEntity': ClientEntity[],
			'CenterEntity': CenterEntity[],
		},
	} {
		return {
			apiAlive: false,
			centerApi: new CenterAPI(),
			clientApi: new ClientAPI(),
			currentlyManagedEntityType: null,
			entities: {
				'ClientEntity': [],
				'CenterEntity': [],
			},
		}
	},
	methods: {
		pingApi(): Promise<void> {
			return new Promise<void>((resolve) => {
				this.clientApi.ping().then(() => {
					this.apiAlive = true;
					resolve();
				}, () => {
					this.apiAlive = false;
					resolve();
				});
			});
		},
		createEntity(form: Form): Entity {
			let newEntity: Entity = Entity.new(this.currentlyManagedEntityType, form.arg, form.username, form.password);
			newEntity.save().then(() => {
				this.entities[this.currentlyManagedEntityType.name].push(newEntity);
				return newEntity;
			});
		},
		updateManaged(entity: typeof Entity): void {
			this.currentlyManagedEntityType = entity;
		},
		deleteEntity(entity: Entity): void {
			if (entity) {
				entity.delete();
				this.entities[entity.constructor.name].splice(this.entities[entity.constructor.name].indexOf(entity), 1);
			}
		},
		debug() {
			console.log(this.entities);
		}
	},
}
</script>

<template>
	<Overlay v-if="!apiAlive" :scale="2.3"/>
	<div class="entityContainer">
		<div class="entity">
			<HeaderComp :entity="ClientEntity" @updateManagedEntity="updateManaged"/>
			<EntityContainer :entities="this.entities.ClientEntity" @deleteEntity="deleteEntity"/>
		</div>
		<div class="entity">
			<HeaderComp :entity="CenterEntity" @updateManagedEntity="updateManaged"/>
			<EntityContainer :entities="this.entities.CenterEntity" @deleteEntity="deleteEntity"/>
		</div>
	</div>
	<ModalComp @submit="createEntity"/>
</template>

<style scoped>
.entityContainer {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
}
</style>

<style>
.grid-size-2 {
	grid-column: 1 / span 2;
}

.grid-size-3 {
	grid-column: 1 / span 3;
}

.BAD {
	background-color: orangered;
	opacity: 0.85;
}

.OK {
	background-color: darkorange;
	opacity: 0.85;
}

.GOOD {
	background-color: limegreen;
	opacity: 0.85;
}

.NEUTRAL {
	background-color: deepskyblue;
	opacity: 0.85;
}
.DISABLED {
	opacity: 0.3;
}
</style>