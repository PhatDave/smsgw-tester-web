const API_URL = `http://localhost:8190`;
const WS_URL = 'ws://localhost:8191';


class Client {
	constructor(url, username, password) {
		this.url = url;
		if (!url.includes('smpp://')) {
			url = 'smpp://' + url;
		}
		this.username = username;
		this.password = password;
		this.status = 'none?';
		this.sendCounter = 0;
		this.pdus = [];

		this.ws = new WebSocket(WS_URL);
		this.ws.on('open', () => {
			this.ws.send(`client:${this.id}`);
		});
		this.ws.on('message', this.wsMessage.bind(this));

		api.postClient(this);
	}

	wsMessage(data) {
		data = JSON.parse(data);
		switch (data.type) {
			case 'status':
				this.status = data.value;
				break;
			case 'pdu':
				this.pdus.push(data.value);
				break;
			case 'counterUpdate':
				this.sendCounter = data.value;
				break;
			default:
				console.log('Unknown message type: ' + data.type);
		}
	}

	setUsername(username) {
		this.username = username;
		api.patchClient(this);
	}

	setPassword(password) {
		this.password = password;
		api.patchClient(this);
	}

	connect() {
		api.clientConnect(this);
	}

	disconnect() {
		this.ws.close();
		api.clientDisconnect(this);
	}

	bind() {
		api.clientBind(this);
	}

	delete() {
		api.clientDelete(this);
	}

	send(source, destination, message) {
		api.clientSend(this, source, destination, message);
	}

	sendMany(source, destinations, message, perSecond, count) {
		api.clientSendMany(this, source, destinations, message, perSecond, count);
	}

	cancelSendMany() {
		api.clientCancelSendMany(this);
	}
}

class Center {
}

class API {
	clientCache = {};
	centerCache = {};

	constructor() {
		this.url = API_URL;
	}

	getCilents() {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'GET',
			};

			fetch(`${API_URL}/api/client`, options)
				.then(response => response.json())
				.then(data => {
					data.forEach(client => {
						this.clientCache[client.id] = client;
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
				.then(data => {
					this.clientCache[data.id] = data;
					resolve(data);
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

let api = new API();

export default {
	Client,
	Center,
	api
};
// export default {
// 	getPath(path) {
// 		return new Promise((resolve, reject) => {
// 			const options = {method: 'GET'};
// 			fetch(`${API_URL}/path?query=${path}`, options)
// 				.then(response => response.json())
// 				.then(data => resolve(data))
// 				.catch(err => console.error(err));
// 		});
// 	},
// };
