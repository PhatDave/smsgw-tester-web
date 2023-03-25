import Client from '@/Client';
import Center from '@/Center';

// TODO: Move these urls to a constants file eventually
const API_URL = `http://localhost:8190`;
const WS_URL = `ws://localhost:8191`;

class API {
	clientCache = {};
	centerCache = {};

	constructor() {
		this.url = API_URL;
	}

	getClients() {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'GET',
			};

			fetch(`${API_URL}/api/client`, options)
				.then(response => response.json())
				.then(data => {
					data.forEach(client => {
						let clientObj = new Client(client.url, client.username, client.password, false);
						clientObj.id = client.id;
						clientObj.status = client.status;
						clientObj.openWebsocket();
						this.clientCache[client.id] = clientObj;
					});
					resolve(data);
				})
				.catch(err => reject(err));
		});
	}

	getClient(id) {
		return new Promise((resolve, reject) => {
			if (this.clientCache[id]) {
				resolve(this.clientCache[id]);
				return;
			}

			const options = {
				method: 'GET',
			};
			fetch(`${API_URL}/api/client/${id}`, options)
				.then(response => response.json())
				.then(client => {
					let clientObj = new Client(client.url, client.username, client.password, false);
					clientObj.id = client.id;
					clientObj.status = client.status;
					clientObj.openWebsocket();
					this.clientCache[client.id] = clientObj;
					resolve(client);
				})
				.catch(err => reject(err));
		});
	}

	postClient(client) {
		return new Promise((resolve, reject) => {
			let body = {
				url: client.url,
				username: client.username,
				password: client.password
			}

			const options = {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(body)
			};

			fetch(`${API_URL}/api/client`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	patchClient(client) {
		return new Promise((resolve, reject) => {
			let body = {
				username: client.username,
				password: client.password
			}

			const options = {
				method: 'PATCH',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(body)
			};

			fetch(`${API_URL}/api/client`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	clientConnect(client) {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'POST'
			};

			fetch(`${API_URL}/api/client/${client.id}/connect`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	clientDisconnect(client) {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'DELETE'
			};

			fetch(`${API_URL}/api/client/${client.id}/connect`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	clientDelete(client) {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'DELETE'
			};

			fetch(`${API_URL}/api/client/${client.id}`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	clientBind(client) {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'POST'
			};

			fetch(`${API_URL}/api/client/${client.id}/bind`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	clientSend(client, source, destination, message) {
		return new Promise((resolve, reject) => {
			let body = {
				source: source,
				destination: destination,
				message: message
			}

			const options = {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(body)
			};

			fetch(`${API_URL}/api/client/${client.id}/send`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	clientSendMany(client, source, destination, message, perSecond, count) {
		return new Promise((resolve, reject) => {
			let body = {
				source: source,
				destination: destination,
				message: message,
				perSecond: perSecond,
				count: count
			}

			const options = {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(body)
			};

			fetch(`${API_URL}/api/client/${client.id}/sendMany`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	clientCancelSendMany(client) {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'DELETE',
			};

			fetch(`${API_URL}/api/client/${client.id}/sendMany`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}

export default API;