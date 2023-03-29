import API from "../API";
import Entity from "./Entity";
import Job from "./Job";
import Metrics from "./Metrics";

export default class ClientEntity extends Entity {
	metrics: Metrics;
	id: number;
	status: string;
	arg: string;
	defaultSingleJob: Job;
	defaultMultipleJob: Job;
	api: API;

	constructor(url: string,
	            username: string,
	            password: string,
	            doPost: boolean = false) {
		super();
		this._username = username;
		this._password = password;
		this.arg = url;

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