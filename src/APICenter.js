import API from '@/API';

const API_URL = `http://localhost:8190`;
const WS_URL = `ws://localhost:8191`;

class APICenter {
    // TODO: Create a getAvailableModes()
    constructor(port, username, password, doPost = true) {
        this.port = port;
        this.username = username;
        this.password = password;
        this.status = 'WAITING_CONNECTION';
        this.sendCounter = 0;
        this.pdus = [];
        this.activeSessions = 0;
        this.mode = "";

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
            this.api.postCenter(this).then(data => {
                this.id = data.id;
                this.status = data.status;
                this.defaultJob = data.configuredMessageJob;
                this.defaultMultiJob = data.configuredMultiMessageJob;
            });
        }
    }

    openWebsocket() {
        this.ws = new WebSocket(WS_URL);
        this.ws.onopen = () => {
            this.ws.send(`center:${this.id}`);
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
            case 'mode':
                this.mode = data.value;
                break;
            case 'sessions':
                // TODO: This might be inaccurate?
                this.activeSessions = data.value;
                break;
            default:
                console.log('Unknown message type: ' + data.type);
        }
    }

    setUsername(username) {
        this.username = username;
        this.api.patchCenter(this);
    }

    setPassword(password) {
        this.password = password;
        this.api.patchCenter(this);
    }

    disconnect() {
        this.ws.close();
        this.api.centerDisconnect(this);
    }

    delete() {
        this.api.centerDelete(this);
    }

    send(source, destination, message) {
        this.api.centerSend(this, source, destination, message);
    }

    configDefault() {
        this.api.centerConfigureDefaultSend(this, this.defaultJob.source, this.defaultJob.destination, this.defaultJob.message);
    }

    sendDefault() {
        this.api.centerSendDefault(this);
    }

    sendMany(source, destinations, message, perSecond, count) {
        this.api.centerSendMany(this, source, destinations, message, perSecond, count);
    }

    configDefaultMany() {
        this.api.centerConfigureDefaultSendMany(this, this.defaultMultiJob.source, this.defaultMultiJob.destinations, this.defaultMultiJob.message,
            this.defaultMultiJob.interval, this.defaultMultiJob.count);
    }

    sendDefaultMany() {
        this.api.centerSendDefaultMany(this);
    }

    cancelSendMany() {
        this.api.centerCancelSendMany(this);
    }
}

export default APICenter;