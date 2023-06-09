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
		let parts: RegExpExecArray | null = /(smpp:\/\/)?(localhost:)?(\d+)/.exec(url);
		if (parts) {
			if (parts[2] === undefined) {
				url = 'localhost:' + url;
			}
			if (parts[1] === undefined) {
				url = 'smpp://' + url;
			}
		}
		return url;
	}
}