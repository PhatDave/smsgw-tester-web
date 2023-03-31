import {WebsocketMessage} from "../../../CommonObjects";
import Entity from "../../Entity";
import WebsocketEventProcessor from "../WebsocketEventProcessor";

export default class CounterEventProcessor extends WebsocketEventProcessor {
	readonly entity: Entity;
	readonly event: string = "MESSAGE_SEND_COUNTER_UPDATE_EVENT";

	constructor(entity: Entity) {
		super();
		console.log(`Creating new ${this.constructor.name}`);
		this.entity = entity;
	}

	process(message: WebsocketMessage): void {
		if (message.type === this.event) {
			this.entity.currentJobInfo.count = Number(message.data);
		}
	};
}