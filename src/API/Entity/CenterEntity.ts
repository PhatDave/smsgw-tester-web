import API from "../API";
import CenterAPI from "../CenterAPI";
import Entity from "./Entity";
import Job from "./Job";
import Metrics from "./Metrics";

export default class CenterEntity extends Entity {
	_id: number;
	_status: string;
	_arg: string;
	_username: string;
	_password: string;
	readonly metrics: Metrics = new Metrics();
	_defaultSingleJob: Job;
	_defaultMultipleJob: Job;
	api: API;

	constructor(port: string,
	            username: string,
	            password: string) {
		super();
		this._username = username;
		this._password = password;
		this._arg = port;
		this.api = new CenterAPI();
	}

	serialize(): object {
		return {
			port: this.arg,
			username: this.username,
			password: this.password,
		}
	}
}