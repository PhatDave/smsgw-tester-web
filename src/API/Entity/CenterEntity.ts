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
		this._arg = port;
		this.api = new CenterAPI();

		if (doPost) {
			this.api.create(this).then((entity: any) => {
				this.defaultSingleJob = Job.parse(this, entity.defaultSingleJob);
				this.defaultMultipleJob = Job.parse(this, entity.defaultMultipleJob);
				this._id = entity.id;
			});
		}
	}

	serialize(): object {
		return {
			username: this.username,
			password: this.password,
		}
	}
}