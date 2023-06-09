import API from "./API";
import CenterEntity from "./Entity/CenterEntity";
import Entity from "./Entity/Entity";

export default class CenterAPI extends API {
	entityType: typeof CenterEntity = CenterEntity;

	constructor() {
		super();
	}

	connect(entity: Entity): Promise<void> {
		throw new Error("Method not implemented.");
	}

	bind(entity: Entity): Promise<void> {
		throw new Error("Method not implemented.");
	}
}