import API from "../API";
import {GraphData} from "../CommonObjects";
import Job from "./Job";
import Metrics from "./Metrics";

export default abstract class Entity {
	abstract api: API;
	// TODO: Implement interaction with WS
	abstract metrics: Metrics;

	abstract _defaultSingleJob: Job;

	get defaultSingleJob(): Job {
		return this._defaultSingleJob;
	}

	set defaultSingleJob(value: Job) {
		this._defaultSingleJob = value;
	}

	abstract _defaultMultipleJob: Job;

	get defaultMultipleJob(): Job {
		return this._defaultMultipleJob;
	}

	set defaultMultipleJob(value: Job) {
		this._defaultMultipleJob = value;
	}

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
		entity._status = object.status;
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

	save(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.api.create(this).then((entity: any) => {
				this._defaultSingleJob = Job.parse(this, entity.defaultSingleJob);
				this._defaultMultipleJob = Job.parse(this, entity.defaultMultipleJob);
				this._id = entity.id;
				resolve();
			});
		});
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

	getGraphData(): GraphData {
		return this.metrics.graphData;
	}

	delete(): Promise<void> {
		return this.api.delete(this);
	}
}