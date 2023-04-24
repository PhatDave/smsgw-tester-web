export default class Action {
	readonly name: string;
	active: () => boolean;
	execute: () => any;
	type: AcitonType = AcitonType.NEUTRAL;

	constructor(name: string, execute: () => any, active: () => boolean) {
		this.name = name;
		this.execute = execute;
		this.active = active;
	}
}

export class AcitonType {
	static readonly BAD: string = "BAD";
	static readonly OK: string = "OK";
	static readonly GOOD: string = "GOOD";
	static readonly NEUTRAL: string = "NEUTRAL";
}