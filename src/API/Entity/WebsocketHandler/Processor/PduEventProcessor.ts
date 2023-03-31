import {WebsocketMessage} from "../../../CommonObjects";
import Entity from "../../Entity";
import WebsocketEventProcessor from "../WebsocketEventProcessor";

export default class PduEventProcessor extends WebsocketEventProcessor {
	readonly entity: Entity;
	readonly event: string = "ANY_PDU";

	constructor(entity: Entity) {
		super();
		console.log(`Creating new ${this.constructor.name}`);
		this.entity = entity;
	}

	process(message: WebsocketMessage): void {
		if (message.type === this.event) {
			console.log(message.data);
			console.log(this.entity);
		}
	};
}