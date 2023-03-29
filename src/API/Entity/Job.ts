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

	set source(value: string) {
		this._source = value;
		this.parent.updateJobs();
	}

	private _destination: string;

	set destination(value: string) {
		this._destination = value;
		this.parent.updateJobs();
	}

	private _message: string;

	set message(value: string) {
		this._message = value;
		this.parent.updateJobs();
	}

	private _count?: number;

	set count(value: number) {
		this._count = value;
		this.parent.updateJobs();
	}

	private _perSecond?: number;

	set perSecond(value: number) {
		this._perSecond = value;
		this.parent.updateJobs();
	}

	static parse(parent: Entity, jobObject: object): Job {
		return new Job(parent,
			jobObject._source,
			jobObject._destination,
			jobObject._message,
			jobObject._count,
			jobObject._perSecond);
	}

	serialize(): object {
		return {
			source: this._source,
			destination: this._destination,
			message: this._message,
			count: this._count,
			perSecond: this._perSecond
		};
	}
}