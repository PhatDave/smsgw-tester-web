import Entity from "../Entity";

export default class Action {
	readonly name: string;
	active: (entity: Entity) => boolean;
	execute: () => any;

	constructor(name: string, execute: () => any, active: (entity: Entity) => boolean) {
		this.name = name;
		this.execute = execute;
		this.active = active;
	}
}