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
					for (let i = 0; i < data.length; i++) {
						let client = data[i];
						let clientObj = this.buildClient(client);
						this.clientCache[client.id] = clientObj;
						data[i] = clientObj;
					}
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
					let clientObj = this.buildClient(client);
					this.clientCache[client.id] = clientObj;
					resolve(client);
				})
				.catch(err => reject(err));
		});
	}

	buildClient(data) {
		let client = new Client(data.url, data.username, data.password, false);
		client.id = data.id;
		client.status = data.status;
		client.defaultJob = data.configuredMessageJob;
		client.defaultMultiJob = data.configuredMultiMessageJob;
		this.clientCache[client.id] = data;
		return client;
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

			fetch(`${API_URL}/api/client/${client.id}`, options)
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

	clientConfigureDefaultSend(client, source, destination, message) {
		return new Promise((resolve, reject) => {
			let body = {
				source: source,
				destination: destination,
				message: message
			}

			const options = {
				method: 'PATCH',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(body)
			};

			fetch(`${API_URL}/api/client/${client.id}/send`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	clientSendDefault(client) {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'POST',
			};

			fetch(`${API_URL}/api/client/${client.id}/send/default`, options)
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

	clientConfigureDefaultSendMany(client, source, destination, message, interval, count) {
		return new Promise((resolve, reject) => {
			let body = {
				source: source,
				destination: destination,
				message: message,
				interval: interval,
				count: count
			}

			const options = {
				method: 'PATCH',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(body)
			};

			fetch(`${API_URL}/api/client/${client.id}/sendMany`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	clientSendDefaultMany(client) {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'POST',
			};

			fetch(`${API_URL}/api/client/${client.id}/sendMany/default`, options)
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

	getCenters() {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'GET',
			};

			fetch(`${API_URL}/api/center`, options)
				.then(response => response.json())
				.then(data => {
					for (let i = 0; i < data.length; i++) {
						let center = data[i];
						let centerObj = this.buildCenter(center);
						this.centerCache[center.id] = centerObj;
						data[i] = centerObj;
					}
					resolve(data);
				})
				.catch(err => reject(err));
		});
	}

	getCenter(id) {
		return new Promise((resolve, reject) => {
			if (this.centerCache[id]) {
				resolve(this.centerCache[id]);
				return;
			}

			const options = {
				method: 'GET',
			};
			fetch(`${API_URL}/api/center/${id}`, options)
				.then(response => response.json())
				.then(center => {
					let centerObj = this.buildCenter(center);
					this.centerCache[centerObj.id] = centerObj;
					resolve(centerObj);
				})
				.catch(err => reject(err));
		});
	}

	buildCenter(data) {
		let center = new Center(data.url, data.username, data.password, false);
		center.id = data.id;
		center.status = data.status;
		center.mode = data.mode;
		center.activeSessions = data.activeSessions;
		center.defaultJob = data.configuredMessageJob;
		center.defaultMultiJob = data.configuredMultiMessageJob;
		this.clientCache[center.id] = center;
		return center;
	}

	postCenter(center) {
		return new Promise((resolve, reject) => {
			let body = {
				url: center.url,
				username: center.username,
				password: center.password
			}

			const options = {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(body)
			};

			fetch(`${API_URL}/api/center`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	patchCenter(center) {
		return new Promise((resolve, reject) => {
			let body = {
				username: center.username,
				password: center.password
			}

			const options = {
				method: 'PATCH',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(body)
			};

			fetch(`${API_URL}/api/center/${center.id}`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	getModes() {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'GET',
			};
			fetch(`${API_URL}/api/center/modes`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	centerDisconnect(center) {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'DELETE'
			};

			fetch(`${API_URL}/api/center/${center.id}/connect`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	centerDelete(center) {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'DELETE'
			};

			fetch(`${API_URL}/api/center/${center.id}`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	centerSend(center, source, destination, message) {
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

			fetch(`${API_URL}/api/center/${center.id}/send`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	centerSendMany(center, source, destination, message, perSecond, count) {
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

			fetch(`${API_URL}/api/center/${center.id}/sendMany`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	centerCancelSendMany(center) {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'DELETE',
			};

			fetch(`${API_URL}/api/center/${center.id}/sendMany`, options)
				.then(response => response.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}

export default API;