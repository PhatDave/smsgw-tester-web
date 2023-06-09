import API from "../API";
import CenterAPI from "../CenterAPI";
import Entity from "./Entity";
import Actions from "./EntityActions/Actions";
import CenterActions from "./EntityActions/CenterActions";
import Job from "./Job";
import Metrics from "./Metrics";
import CenterStatusStyles from "./StatusStyles/CenterStatusStyles";
import StatusStyles from "./StatusStyles/StatusStyles";
import WebsocketHandler from "./WebsocketHandler/WebsocketHandler";

export default class CenterEntity extends Entity {
	_id: number;
	_arg: string;
	_username: string;
	_password: string;
	_defaultSingleJob: Job;
	_defaultMultipleJob: Job;
	api: API = new CenterAPI();
	statusStyles: StatusStyles = new CenterStatusStyles();
	actions: Actions;

	protected constructor(port: string,
	                      username: string,
	                      password: string) {
		super();
		this._username = username;
		this._password = password;
		this._arg = port;
	}

	init(): void {
		this.metricsRX = new Metrics();
		this.metricsTX = new Metrics();
		this.websocketHandler = new WebsocketHandler(this);
		this.actions = new CenterActions(this);
	}

	serialize(): object {
		return {
			port: this.arg,
			username: this.username,
			password: this.password,
		}
	}
}