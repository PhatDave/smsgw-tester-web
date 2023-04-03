import {WebsocketMessage} from "../../../CommonObjects";
import Entity from "../../Entity";
import WebsocketEventProcessor from "../WebsocketEventProcessor";

export default class StatusEventProcessor extends WebsocketEventProcessor {
	readonly entity: Entity;
	readonly event: string = "STATUS_CHANGED";

	constructor(entity: Entity) {
		super();
		console.log(`Creating new ${this.constructor.name}`);
		this.entity = entity;
	}

	process(message: WebsocketMessage): void {
		if (message.type === this.event) {
			this.entity.status = message.data;
			console.log(this.entity.constructor.name);
		}
	};
}