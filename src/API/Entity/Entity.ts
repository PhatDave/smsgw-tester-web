import API from "../API";
import Job from "./Job";
import Metrics from "./Metrics";

export default abstract class Entity {
	abstract id: number;
	abstract status: string;
	abstract arg: string;
	abstract defaultSingleJob: Job;
	abstract defaultMultipleJob: Job;
	abstract api: API;
	// TODO: Implement interaction with WS
	abstract metrics: Metrics;

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

	static parseObject(object: any, constructor: any): Entity {
		let entity: Entity = new constructor(object.arg, object.username, object.password, false);
		entity.id = object.id;
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

	getId(): number {
		return this.id;
	}

	getStatus(): string {
		return this.status;
	}

	getArg(): string {
		return this.arg;
	}

	getDefaultSingleJob(): Job {
		return this.defaultSingleJob;
	}

	getDefaultMultipleJob(): Job {
		return this.defaultMultipleJob;
	}

	getGraphData(): { xaxis: { submit_sm: any[] }; series: { data: number[]; name: string }[] } {
		return this.metrics.graphData;
	}

	delete(): Promise<void> {
		return this.api.delete(this);
	}
}