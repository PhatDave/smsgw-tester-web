<script lang="ts">
import CenterAPI from "./API/CenterAPI";
import ClientAPI from "./API/ClientAPI";
import CenterEntity from "./API/Entity/CenterEntity";
import ClientEntity from "./API/Entity/ClientEntity";
import Entity from "./API/Entity/Entity";
import EntityComp from "./components/EntityComp.vue";

export default {
	computed: {
		ClientEntity() {
			return ClientEntity
		},
		CenterEntity() {
			return CenterEntity
		}
	},
	components: {
		EntityComp
	},
	data(): {
		entities: {
			'ClientEntity': ClientEntity[],
			'CenterEntity': CenterEntity[],
		}
		clientApi: ClientAPI,
		centerApi: CenterAPI,
		apiAlive: boolean,

		form: {
			arg: string,
			username: string,
			password: string
		},
	} {
		return {
			entities: {
				'ClientEntity': [],
				'CenterEntity': [],
			},
			clientApi: new ClientAPI(),
			centerApi: new CenterAPI(),
			apiAlive: false,
			form: {
				arg: '',
				username: '',
				password: ''
			},
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
		createEntity(constructor: any): Entity {
			const newEntity: Entity = new constructor(
				this.form['arg'],
				this.form['username'],
				this.form['password'],
				true
			);
			this.entities[constructor.name].push(newEntity);
			this.closeModal("closeModal");
			return newEntity;
		},
		deleteEntity(type: any, id: number): void {
			// this.entities[type.constructor.name] is intentionally not a variable
			let entity: Entity = this.entities[type.constructor.name].find(item => item.id === id);
			if (entity) {
				entity.delete();
				this.entities[type.constructor.name].splice(this.entities[type.constructor.name].indexOf(entity), 1);
			}
		},
		closeModal(elemId) {
			document.getElementById(elemId).click();
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
}
</script>

<template>
	<div class="container-fluid row">
				<div class="col-6">
					<div class="text-center">
						<span class="display-6">Clients</span> &nbsp;
						<span class="addButton" data-bs-toggle="modal" data-bs-target="#addClientModal">
		          Add+
		        </span>
					</div>
					<div class="accordion accordion-flush" id="clientAccordion">
						<div class="accordion-item" v-for="(client, index) in this.entities.ClientEntity" :key="client.id">
							<h2 class="accordion-header" :id="'flush-heading-client'+client.id">
								<button class="accordion-button collapsed" :style="clientStatusButtonStyle(client)" :class="{ 'collapsed': index !== 0 }" type="button"
								        data-bs-toggle="collapse"
								        :data-bs-target="'#flush-collapse-client'+client.id"
								        aria-expanded="false"
								        :aria-controls="'flush-collapse-client'+client.id">
									{{ client.status }} [{{ client.url }}]
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
			<div class="text-center">
				<span class="display-6">Centers</span> &nbsp;
				<span class="addButton" data-bs-toggle="modal" data-bs-target="#addCenterModal">
          Add+
        </span>
			</div>
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

	<div class="modal fade" id="addClientModal" tabindex="-1" aria-labelledby="addClientModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="addClientModalLabel">Add New Client</h1>
				</div>
				<div class="modal-body">
					<form @submit.prevent="createEntity" class="row g-3 align-items-center">
						<div class="col-12">
							<input type="text" class="form-control" placeholder="URL" v-model="form.arg" required>
						</div>
						<div class="col-12">
							<input type="text" class="form-control" placeholder="Username" v-model="form.username" required>
						</div>
						<div class="col-12">
							<input type="text" class="form-control" placeholder="Password" v-model="form.password" required>
						</div>
						<div class="col-12 text-center">
							<button type="submit" class="btn btn-success mx-2">Submit</button>
							<button type="button" class="btn btn-warning mx-2" id="closeClientModal" data-bs-dismiss="modal">Close</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.addButton:hover {
	cursor: pointer;
}

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