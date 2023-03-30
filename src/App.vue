<script lang="ts">
import CenterAPI from "./API/CenterAPI";
import ClientAPI from "./API/ClientAPI";
import CenterEntity from "./API/Entity/CenterEntity";
import ClientEntity from "./API/Entity/ClientEntity";
import Entity from "./API/Entity/Entity";
import EntityComp from "./components/EntityComp.vue";
import HeaderComp from "./components/HeaderComp.vue";
import ModalComp, {Form} from "./components/ModalComp.vue";

export default {
	components: {
		ModalComp,
		HeaderComp,
		EntityComp
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
		// TODO: Make backend ping
		this.pingTimer = setInterval(function () {
			this.pingApi();
		}.bind(this), 1000);
		this.clientApi.doGetAll().then((response: ClientEntity[]) => {
			this.entities.ClientEntity = response;
		});
		this.centerApi.doGetAll().then((response: ClientEntity[]) => {
			this.entities.CenterEntity = response;
		});
	},
	methods: {
		pingApi(): void {
			this.clientApi.ping().then(() => {
				this.apiAlive = true;
			}, (error) => {
				this.apiAlive = false;
				console.log(error);
			});
		},
		createEntity(form: Form): Entity {
			const newEntity: Entity = new this.currentlyManagedEntityType(
				form.arg,
				form.username,
				form.password,
				true
			);
			this.entities[this.currentlyManagedEntityType.name].push(newEntity);
			this.closeModal();
			return newEntity;
		},
		updateManaged(entity: typeof Entity): void {
			this.currentlyManagedEntityType = entity;
		},
		deleteEntity(type: typeof Entity, id: number): void {
			// this.entities[type.constructor.name] is intentionally not a variable
			let entity: Entity = this.entities[type.constructor.name].find(item => item.id === id);
			if (entity) {
				entity.delete();
				this.entities[type.constructor.name].splice(this.entities[type.constructor.name].indexOf(entity), 1);
			}
		},
		closeModal(): void {
			// This is dumb...
			this.$refs.closeModal.click();
		},
		clientStatusButtonStyle(client) {
			switch (client.status) {
				case 'NOT CONNECTED':
					return {backgroundColor: "#dc3545"};
				case 'CONNECTED':
					return {backgroundColor: "#ffc107"};
				case 'BOUND':
					return {backgroundColor: "#198754"};
				case 'BUSY':
					return {backgroundColor: "#0dcaf0"};
				default:
					return {backgroundColor: "#dc3545"};
			}
		},
		clientStatusBodyStyle(client) {
			switch (client.status) {
				case 'NOT CONNECTED':
					return {backgroundColor: "rgba(220, 53, 69, .3)"};
				case 'CONNECTED':
					return {backgroundColor: "rgba(255, 193, 7, .3)"};
				case 'BOUND':
					return {backgroundColor: "rgba(25, 135, 84, .3)"};
				case 'BUSY':
					return {backgroundColor: "rgba(13, 202, 240, .3)"};
				default:
					return {backgroundColor: "rgba(220, 53, 69, .3)"};
			}
		},
		centerStatusButtonStyle(center) {
			switch (center.status) {
				case 'WAITING CONNECTION':
					return {backgroundColor: "#ffc107"};
				case 'CONNECTION PENDING':
					return {backgroundColor: "#9acd32"};
				case 'CONNECTED':
					return {backgroundColor: "#198754"};
				default:
					return {backgroundColor: "#dc3545"};
			}
		},
		centerStatusBodyStyle(center) {
			switch (center.status) {
				case 'WAITING CONNECTION':
					return {backgroundColor: "rgba(255, 193, 7, .3)"};
				case 'CONNECTION PENDING':
					return {backgroundColor: "rgba(154, 205, 50, .3)"};
				case 'CONNECTED':
					return {backgroundColor: "rgba(25, 135, 84, .3)"};
				default:
					return {backgroundColor: "rgba(220, 53, 69, .3)"};
			}
		}
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
							<EntityComp :entity="client" @deleteEntity="deleteEntity.bind(this, ClientEntity)"/>
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
							<EntityComp :entity="center" @deleteEntity="deleteEntity.bind(this, CenterEntity)"/>
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