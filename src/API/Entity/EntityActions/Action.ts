import Entity from "../Entity";

export default class Action {
	readonly name: string;
	active: () => boolean;
	execute: () => any;

	constructor(name: string, execute: () => any, active: () => boolean) {
		this.name = name;
		this.execute = execute;
		this.active = active;
	}
}