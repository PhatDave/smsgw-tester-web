export default class PDUProcessor {
	name: string;
	type: string;

	constructor(name: string, type: string) {
		this.name = name;
		this.type = type;
	}

	static parse(object: any): PDUProcessor {
		return new PDUProcessor(object.name, object.type);
	}
}