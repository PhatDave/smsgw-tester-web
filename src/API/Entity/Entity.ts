import API from "../API";
import {GraphData} from "../CommonObjects";
import Job from "./Job";
import Metrics from "./Metrics";

export default abstract class Entity {
	abstract defaultSingleJob: Job;
	abstract defaultMultipleJob: Job;
	abstract api: API;
	// TODO: Implement interaction with WS
	abstract metrics: Metrics;

	abstract _id: number;

	get id(): number {
		return this._id;
	}

	abstract _status: string;

	get status(): string {
		return this._status;
	}

	abstract _arg: string;

	get arg(): string {
		return this._arg;
	}

	abstract _username: string;

	get username(): string {
		return this._username;
	}

	set username(value: string) {
		this._username = value;
		this.update();
	}

	abstract _password: string;

	get password(): string {
		return this._password;
	}

	set password(value: string) {
		this._password = value;
		this.update();
	}

	static parseObject(object: any, constructor: new (...args: any[]) => Entity): Entity {
		let entity: Entity = new constructor(object.url || object.port, object.username, object.password, false);
		entity._id = object.id;
		entity.defaultSingleJob = Job.parse(entity, object.defaultSingleJob);
		entity.defaultMultipleJob = Job.parse(entity, object.defaultMultipleJob);
		return entity;
	}

	abstract serialize(): object;

	connect(): Promise<void> {
		return this.api.connect(this);
	}

	disconnect(): Promise<void> {
		return this.api.disconnect(this);
	}

	bind(): Promise<void> {
		return this.api.bind(this);
	}

	update(): Promise<void> {
		return this.api.update(this);
	}

	updateJobs(): void {
		this.api.configureSendOneDefault(this);
		this.api.configureSendManyDefault(this);
	}

	runJob(job: Job): void {
		if (!job.perSecond) {
			this.api.sendManyDefault(this);
		} else {
			this.api.sendOneDefault(this);
		}
	}

	stopJob(): void {
		this.api.cancelSendMany(this);
	}

	getDefaultSingleJob(): Job {
		return this.defaultSingleJob;
	}

	getDefaultMultipleJob(): Job {
		return this.defaultMultipleJob;
	}

	getGraphData(): GraphData {
		return this.metrics.graphData;
	}

	delete(): Promise<void> {
		return this.api.delete(this);
	}
}