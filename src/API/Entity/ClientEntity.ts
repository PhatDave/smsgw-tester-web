import API from "../API";
import ClientAPI from "../ClientAPI";
import Entity from "./Entity";
import Actions from "./EntityActions/Actions";
import ClientActions from "./EntityActions/ClientActions";
import Job from "./Job";
import Metrics from "./Metrics";
import ClientStatusStyles from "./StatusStyles/ClientStatusStyles";
import StatusStyles from "./StatusStyles/StatusStyles";
import WebsocketHandler from "./WebsocketHandler/WebsocketHandler";

export default class ClientEntity extends Entity {
    _id: number;
    _arg: string;
    _username: string;
    _password: string;
    _defaultSingleJob: Job;
    _defaultMultipleJob: Job;
    api: API = new ClientAPI();
    statusStyles: StatusStyles = new ClientStatusStyles();
    actions: Actions;

    protected constructor(url: string,
                          username: string,
                          password: string) {
        super();
        this._username = username;
        this._password = password;
        this._arg = this.buildUrl(url);
    }

    init(): void {
        this.metricsRX = new Metrics();
        this.metricsTX = new Metrics();
        this.websocketHandler = new WebsocketHandler(this);
        this.actions = new ClientActions(this);
    }

    serialize(): object {
        return {
            url: this.arg,
            username: this.username,
            password: this.password,
        }
    }

    private buildUrl(url: string): string {
        const hasSmpp = /^smpp:\/\//.test(url);
        if (!hasSmpp) {
            url = 'smpp://' + url;
        }

		const hasIp = /^smpp:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url);
		const hasLocalhost = /^smpp:\/\/localhost/.test(url);
		if (!hasIp && !hasLocalhost) {
			url = url.replace(/^smpp:\/\//, 'smpp://localhost/');
		}

		console.log(url);
        return url;
    }
}
