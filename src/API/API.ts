import Entity from "./Entity/Entity";

export default abstract class API {
	static readonly API_URL: string = `http://localhost:8190`;
	static _instance: API;
	abstract entityType: any;

	protected constructor() {
	}

	doGetAll(): Promise<Entity[]> {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'GET',
			};

			fetch(`${API.API_URL}/api/${this.entityType.name}`, options)
				.then(response => response.json())
				.then(data => {
					data = data.map((entity: object) => {
						return this.build(entity);
					});
					resolve(data);
				})
				.catch(err => reject(err));
		});
	}

	doGet(id: number): Promise<Entity> {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'GET',
			};

			fetch(`${API.API_URL}/api/${this.entityType.name}/${id}`, options)
				.then(response => response.json())
				.then(data => {
					let entityObj: Entity = this.build(data);
					resolve(entityObj);
				})
				.catch(err => reject(err));
		});
	}

	create(entity: Entity): Promise<Entity> {
		return new Promise((resolve, reject) => {
			let body = entity.serialize();

			const options = {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(body)
			};

			fetch(`${API.API_URL}/api/${this.entityType.name}`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	update(entity: Entity): Promise<void> {
		return new Promise((resolve, reject) => {
			let body = entity.serialize();

			const options = {
				method: 'PATCH',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(body)
			};

			fetch(`${API.API_URL}/api/${this.entityType.name}/${entity.id}`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	disconnect(entity: Entity): Promise<void> {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'DELETE'
			};

			fetch(`${API.API_URL}/api/${this.entityType.name}/${entity.id}/connect`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	delete(entity: Entity): Promise<void> {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'DELETE'
			};

			fetch(`${API.API_URL}/api/${this.entityType.name}/${entity.id}`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	configureSendOneDefault(entity: Entity): Promise<void> {
		return new Promise((resolve, reject) => {
			let body = entity.defaultSingleJob.serialize();
			const options = {
				method: 'PUT',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(body)
			};

			fetch(`${API.API_URL}/api/${this.entityType.name}/${entity.id}/send`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	sendOneDefault(entity: Entity): Promise<void> {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'POST'
			};

			fetch(`${API.API_URL}/api/${this.entityType.name}/${entity.id}/send/default`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	configureSendManyDefault(entity: Entity): Promise<void> {
		return new Promise((resolve, reject) => {
			let body = entity.defaultMultipleJob.serialize();
			const options = {
				method: 'PUT',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(body)
			};

			fetch(`${API.API_URL}/api/${this.entityType.name}/${entity.id}/sendMany`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	sendManyDefault(entity: Entity): Promise<void> {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'POST'
			};

			fetch(`${API.API_URL}/api/${this.entityType.name}/${entity.id}/sendMany/default`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	cancelSendMany(entity: Entity): Promise<void> {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'DELETE'
			};

			fetch(`${API.API_URL}/api/${this.entityType.name}/${entity.id}/sendMany`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	ping(): Promise<void> {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'GET'
			};

			fetch(`${API.API_URL}/api/ping`, options)
				.then(() => resolve(), () => reject());
		});
	}

	// TODO: Implement work with processors

	build(entity: object): Entity {
		return Entity.parseObject(entity, this.entityType);
	}

	abstract connect(entity: Entity): Promise<void>;

	abstract bind(entity: Entity): Promise<void>;
}