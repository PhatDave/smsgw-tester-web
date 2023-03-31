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
		this.pingTimer = setInterval(function () {
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
			return new Promise<void>((resolve, reject) => {
				// console.log(this.apiAlive);
				this.clientApi.ping().then(() => {
					this.apiAlive = true;
					resolve();
				}, (error) => {
					this.apiAlive = false;
					resolve();
				});
			});
		},
		createEntity(form: Form): Entity {
			const newEntity: Entity = new this.currentlyManagedEntityType(
				form.arg,
				form.username,
				form.password,
				true
			);
			newEntity.save().then(() => {
				this.entities[this.currentlyManagedEntityType.name].push(newEntity);
				return newEntity;
			});
		},
		updateManaged(entity: typeof Entity): void {
			this.currentlyManagedEntityType = entity;
		},
		deleteEntity(entity: Entity, id: number): void {
			// TODO: See why id is here
			if (entity) {
				entity.delete();
				this.entities[entity.constructor.name].splice(this.entities[entity.constructor.name].indexOf(entity), 1);
			}
		},
	},
}
</script>

<template>
	<Overlay :scale="2.3" v-if="!apiAlive"/>

	<div class="container-fluid row">
		<div class="col-6">
			<HeaderComp :entity="ClientEntity" @updateManagedEntity="updateManaged"/>
			<EntityContainer :entities="this.entities.ClientEntity"/>
		</div>
		<div class="col-6">
			<HeaderComp :entity="ClientEntity" @updateManagedEntity="updateManaged"/>
			<EntityContainer :entities="this.entities.CenterEntity"/>
		</div>
	</div>

	<ModalComp @submit="createEntity"/>
</template>

<style scoped>
input {
	border: none;
	border-bottom: 1px solid #eee;
	border-radius: 0;
}

input:focus {
	outline: none !important;
	box-shadow: none;
	border-bottom: 1px solid #bbb;
}
</style>