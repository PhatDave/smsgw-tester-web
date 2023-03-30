<script lang="ts">
import CenterAPI from "./API/CenterAPI";
import ClientAPI from "./API/ClientAPI";
import CenterEntity from "./API/Entity/CenterEntity";
import ClientEntity from "./API/Entity/ClientEntity";
import Entity from "./API/Entity/Entity";
import EntityComp from "./components/EntityComp.vue";
import HeaderComp from "./components/HeaderComp.vue";
import ModalComp, {Form} from "./components/ModalComp.vue";
import AlertIcon from "./Icons/AlertIcon.vue";
import Overlay from "./Icons/Overlay.vue";

export default {
	components: {
		Overlay,
		ModalComp,
		HeaderComp,
		EntityComp,
		AlertIcon
	},
	data(): {
		entities: {
			'ClientEntity': ClientEntity[],
			'CenterEntity': CenterEntity[],
		},
		currentlyManagedEntityType: typeof Entity | null,
		clientApi: ClientAPI,
		centerApi: CenterAPI,
		apiAlive: boolean,
	} {
		return {
			entities: {
				'ClientEntity': [],
				'CenterEntity': [],
			},
			currentlyManagedEntityType: null,
			clientApi: new ClientAPI(),
			centerApi: new CenterAPI(),
			apiAlive: false,
		}
	},
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
			if (entity) {
				entity.delete();
				this.entities[entity.constructor.name].splice(this.entities[entity.constructor.name].indexOf(entity), 1);
			}
		},
	},
	computed: {
		ClientEntity() {
			return ClientEntity
		},
		CenterEntity() {
			return CenterEntity
		}
	},
}
</script>

<template>
	<Overlay :scale="2.3" v-if="!apiAlive"/>

	<div class="container-fluid row">
		<div class="col-6">
			<HeaderComp :entity="ClientEntity" @updateManagedEntity="updateManaged"/>
			<div class="accordion accordion-flush" id="clientAccordion">
				<div class="accordion-item" v-for="(client, index) in this.entities.ClientEntity" :key="client.id">
					<h2 class="accordion-header" :id="'flush-heading-client'+client.id">
						<button class="accordion-button collapsed" :style="clientStatusButtonStyle(client)" :class="{ 'collapsed': index !== 0 }" type="button"
						        data-bs-toggle="collapse"
						        :data-bs-target="'#flush-collapse-client'+client.id"
						        aria-expanded="false"
						        :aria-controls="'flush-collapse-client'+client.id">
							{{ client.status }} [{{ client.arg }}]
						</button>
					</h2>
					<div :id="'flush-collapse-client'+client.id" class="accordion-collapse collapse" :class="{ 'show': index === 0 }"
					     :aria-labelledby="'flush-heading-client'+client.id"
					     data-bs-parent="#clientAccordion">
						<div class="accordion-body py-1 px-2" :style="clientStatusBodyStyle(client)">
							<EntityComp :entity="client" @deleteEntity="deleteEntity"/>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-6">
			<HeaderComp :entity="CenterEntity" @updateManagedEntity="updateManaged"/>
			<div class="accordion accordion-flush" id="centerAccordion">
				<div class="accordion-item" v-for="(center, index) in this.entities.CenterEntity" :key="center.id">
					<h2 class="accordion-header" :id="'flush-heading-center'+center.id">
						<button class="accordion-button collapsed" :style="centerStatusButtonStyle(center)" :class="{ 'collapsed': index !== 0 }" type="button"
						        data-bs-toggle="collapse"
						        :data-bs-target="'#flush-collapse-center'+center.id"
						        aria-expanded="false"
						        :aria-controls="'flush-collapse-center'+center.id">
							{{ center.status }} [{{ center.port }}]
						</button>
					</h2>
					<div :id="'flush-collapse-center'+center.id" class="accordion-collapse collapse" :class="{ 'show': index === 0 }"
					     :aria-labelledby="'flush-heading-center'+center.id"
					     data-bs-parent="#centerAccordion">
						<div class="accordion-body py-1 px-2" :style="centerStatusBodyStyle(center)">
							<EntityComp :entity="center" @deleteEntity="deleteEntity"/>
						</div>
					</div>
				</div>
			</div>
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

.accordion-button:not(.collapsed), .accordion-button.collapsed {
	color: #000;
	text-decoration: none;
	box-shadow: none;
	outline: none;
}

.accordion-button::after, .accordion-button::before {
	background-image: none !important;
}
</style>