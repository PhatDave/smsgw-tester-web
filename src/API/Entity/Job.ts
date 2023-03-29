import Entity from "./Entity";

export default class Job {
	private readonly parent: Entity;

	constructor(parent: Entity,
	            source: string,
	            destination: string,
	            message: string,
	            count?: number,
	            perSecond?: number) {
		this._source = source;
		this._destination = destination;
		this._message = message;
		this._count = count;
		this._perSecond = perSecond;
		this.parent = parent;
	}

	private _source: string;

	get source(): string {
		return this._source;
	}

	set source(value: string) {
		this._source = value;
		this.parent.updateJobs();
	}

	private _destination: string;

	get destination(): string {
		return this._destination;
	}

	set destination(value: string) {
		this._destination = value;
		this.parent.updateJobs();
	}

	private _message: string;

	get message(): string {
		return this._message;
	}

	set message(value: string) {
		this._message = value;
		this.parent.updateJobs();
	}

	private _count?: number;

	get count(): number {
		return this._count;
	}

	set count(value: number) {
		this._count = value;
		this.parent.updateJobs();
	}

	private _perSecond?: number;

	get perSecond(): number {
		return this._perSecond;
	}

	set perSecond(value: number) {
		this._perSecond = value;
		this.parent.updateJobs();
	}

	static parse(parent: Entity, jobObject: any): Job {
		console.log(jobObject);
		return new Job(parent,
			jobObject.pdu.source_addr || '',
			jobObject.pdu.destination_addr || '',
			jobObject.pdu.short_message || '',
			jobObject.count,
			jobObject.perSecond);
	}

	serialize(): object {
		return {
			source: this.source,
			destination: this.destination,
			message: this.message,
			count: this.count,
			perSecond: this.perSecond
		};
	}
}