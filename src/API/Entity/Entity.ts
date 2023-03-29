import API from "../API";
import Job from "./Job";
import Metrics from "./Metrics";

export default abstract class Entity {
	abstract id: number;
	abstract username: string;
	abstract password: string;
	abstract status: string;
	abstract arg: string;
	abstract defaultSingleJob: Job;
	abstract defaultMultipleJob: Job;
	abstract api: API;
	// TODO: Implement interaction with WS
	abstract metrics: Metrics;

	static parseObject(object: any, constructor: any): Entity {
		let entity: Entity = new constructor(object.arg, object.username, object.password, false);
		entity.id = object.id;
		entity.defaultSingleJob = Job.parse(entity, object.defaultSingleJob);
		entity.defaultMultipleJob = Job.parse(entity, object.defaultMultipleJob);
		return entity;
	}

	abstract serialize(): object;

	getId(): number {
		return this.id;
	}

	getUsername(): string {
		return this.username;
	}

	setUsername(username: string): void {
		this.username = username;
		this.api.update(this);
		// TODO: Call API to update object
		// Maybe have a reference to the API object
	}

	getPassword(): string {
		return this.password;
	}

	setPassword(password: string): void {
		this.password = password;
		this.api.update(this);
		// TODO: Call API to update object
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

	updateJobs(): void {
		this.api.configureSendOneDefault(this);
		this.api.configureSendManyDefault(this);
	}

	getGraphData(): { xaxis: { submit_sm: any[] }; series: { data: number[]; name: string }[] } {
		return this.metrics.graphData;
	}
}