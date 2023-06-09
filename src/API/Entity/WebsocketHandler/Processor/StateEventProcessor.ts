import {WebsocketMessage} from "../../../CommonObjects";
import Entity from "../../Entity";
import WebsocketEventProcessor from "../WebsocketEventProcessor";

export default class StateEventProcessor extends WebsocketEventProcessor {
	readonly entity: Entity;
	readonly event: string = "STATE_CHANGED";

	constructor(entity: Entity) {
		super();
		this.entity = entity;
	}

	process(message: WebsocketMessage): void {
		if (message.type === this.event) {
			this.entity.updateFields(message.data);
		}
	};
}