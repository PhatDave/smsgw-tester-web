import API from "../API";
import Entity from "./Entity";
import Job from "./Job";
import Metrics from "./Metrics";

export default class CenterEntity extends Entity {
	metrics: Metrics;
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
		throw new Error("Method not implemented.");
	}
}