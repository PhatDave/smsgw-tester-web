import API from "../API";
import CenterAPI from "../CenterAPI";
import ClientAPI from "../ClientAPI";
import Entity from "./Entity";
import Job from "./Job";
import Metrics from "./Metrics";

export default class CenterEntity extends Entity {
	readonly metrics: Metrics = new Metrics();
	id: number;
	status: string;
	arg: string;
	defaultSingleJob: Job;
	defaultMultipleJob: Job;
	api: API;

	constructor(port: string,
	            username: string,
	            password: string,
	            doPost: boolean = false) {
		super();
		this._username = username;
		this._password = password;
		this.arg = port;
		this.api = new CenterAPI();

		if (doPost) {
			this.api.create(this).then((entity: any) => {
				this.defaultSingleJob = Job.parse(this, entity.defaultSingleJob);
				this.defaultMultipleJob = Job.parse(this, entity.defaultMultipleJob);
				this.id = entity.id;
			});
		}
	}

	private _username: string;

	set username(value: string) {
		this.setUsername(value);
	}

	private _password: string;

	set password(value: string) {
		this.setPassword(value);
	}

	serialize(): object {
		return {
			username: this._username,
			password: this._password,
		}
	}
}