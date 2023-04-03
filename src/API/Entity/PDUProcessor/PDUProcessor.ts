export default class PDUProcessor {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	static parse(object: any): PDUProcessor {
		return new PDUProcessor(object.name);
	}
}