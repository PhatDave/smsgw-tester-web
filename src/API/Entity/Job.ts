import {PDU} from "../CommonObjects";
import Entity from "./Entity";

export default class Job {
	readonly parent: Entity;

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

	updateFields(entityObject: any): void {
		if (!!entityObject.pdu && !!entityObject.pdu.source_addr && entityObject.pdu.source_addr !== this.source) {
			this.source = entityObject.pdu.source_addr;
		}
		if (!!entityObject.pdu && !!entityObject.pdu.destination_addr && entityObject.pdu.destination_addr !== this.destination) {
			this.destination = entityObject.pdu.destination_addr;
		}
		if (!!entityObject.pdu && !!entityObject.pdu.short_message && entityObject.pdu.short_message !== this.message) {
			this.message = entityObject.pdu.short_message;
		}
		if (!!this._perSecond) {
			Entity.updateSimpleField(entityObject, this, 'perSecond', '_perSecond');
			Entity.updateSimpleField(entityObject, this, 'count', '_count');
		}
	}

	static parse(parent: Entity, jobObject: { pdu: PDU, count: number, perSecond: number }): Job {
		let source: string = '';
		let destination: string = '';
		let message: string = '';

		if (!!jobObject.pdu && !!jobObject.pdu.source_addr) {
			source = jobObject.pdu.source_addr;
		}
		if (!!jobObject.pdu && !!jobObject.pdu.destination_addr) {
			destination = jobObject.pdu.destination_addr;
		}
		if (!!jobObject.pdu && !!jobObject.pdu.short_message) {
			message = jobObject.pdu.short_message;
		}

		return new Job(parent,
			source,
			destination,
			message,
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