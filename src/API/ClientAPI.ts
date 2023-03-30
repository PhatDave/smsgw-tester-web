import API from "./API";
import ClientEntity from "./Entity/ClientEntity";
import Entity from "./Entity/Entity";

export default class ClientAPI extends API {
	entityType: any = ClientEntity;

	constructor() {
		super();
		console.log(`Creating an ${this.constructor.name} object`);
	}

	connect(entity: Entity): Promise<void> {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'POST'
			};

			fetch(`${API.API_URL}/api/client/${entity.getId()}/connect`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	bind(entity: Entity): Promise<void> {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'POST'
			};

			fetch(`${API.API_URL}/api/client/${entity.getId()}/bind`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}