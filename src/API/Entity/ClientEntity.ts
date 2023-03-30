import API from "../API";
import ClientAPI from "../ClientAPI";
import Entity from "./Entity";
import Job from "./Job";
import Metrics from "./Metrics";

export default class ClientEntity extends Entity {
	_id: number;
	_status: string;
	_arg: string;
	_username: string;
	_password: string;
	readonly metrics: Metrics = new Metrics();
	_defaultSingleJob: Job;
	_defaultMultipleJob: Job;
	api: API;

	constructor(url: string,
	            username: string,
	            password: string) {
		super();
		this._username = username;
		this._password = password;
		this._arg = url;
		this.api = new ClientAPI();
	}

	serialize(): object {
		return {
			url: this.arg,
			username: this.username,
			password: this.password,
		}
	}
}