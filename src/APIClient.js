import API from "@/API";

const API_URL = `http://localhost:8190`;
const WS_URL = `ws://localhost:8191`;

class APIClient {
	constructor(url, username, password, doPost = true) {
		this.url = url;
		if (!url.includes('smpp://')) {
			this.url = 'smpp://' + url;
		}
		this.username = username;
		this.password = password;
		this.status = 'NOT CONNECTED';
		this.sendCounter = 0;
		this.pdus = [];

		this.defaultJob = {
			source: '',
			destination: '',
			message: '',
		}
		this.defaultMultiJob = {
			source: '',
			destination: '',
			message: '',
			interval: 1000,
			count: 1,
		}

		this.api = new API();

		if (doPost) {
			this.api.postClient(this).then(data => {
				this.id = data.id;
				this.status = data.status;
				this.defaultJob = data.configuredMessageJob;
				this.defaultMultiJob = data.configuredMultiMessageJob;
                this.defaultMultiJob.mps = 1 / data.configuredMultiMessageJob.interval;
			});
		}
	}

	openWebsocket() {
		this.ws = new WebSocket(WS_URL);
		this.ws.onopen = () => {
			this.ws.send(`client:${this.id}`);
		}
		this.ws.onmessage = this.wsMessage.bind(this);
	}

	wsMessage(data) {
		data = data.data;
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
		this.api.patchClient(this);
	}

	setPassword(password) {
		this.password = password;
		this.api.patchClient(this);
	}

	connect() {
		this.api.clientConnect(this);
	}

	disconnect() {
		this.ws.close();
		this.api.clientDisconnect(this);
	}

	bind() {
		this.api.clientBind(this);
	}

	delete() {
		this.api.clientDelete(this);
	}

	send(source, destination, message) {
		this.api.clientSend(this, source, destination, message);
	}

	configDefault() {
		this.api.clientConfigureDefaultSendOne(this, this.defaultJob.source, this.defaultJob.destination, this.defaultJob.message);
	}

	sendDefault() {
		this.api.clientDefaultSendOne(this);
	}

	sendMany(source, destinations, message, perSecond, count) {
		this.api.clientSendMany(this, source, destinations, message, perSecond, count);
	}

	configureDefaultMany() {
		this.api.clientConfigureDefaultSendMany(this, this.defaultMultiJob.source, this.defaultMultiJob.destination, this.defaultMultiJob.message,
		                                        this.defaultMultiJob.mps, this.defaultMultiJob.count);
	}

	sendDefaultMany() {
		this.api.clientDefaultSendMany(this);
	}

	cancelSendMany() {
		this.api.clientCancelSendMany(this);
	}
}

export default APIClient;