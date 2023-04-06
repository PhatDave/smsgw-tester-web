import Entity from "../../Entity";
import WebsocketEventProcessor from "../WebsocketEventProcessor";

export default class PduRXEventProcessor extends WebsocketEventProcessor {
	readonly entity: Entity;
	readonly event: string = "ANY_PDU_RX";

	constructor(entity: Entity) {
		super();
		console.log(`Creating new ${this.constructor.name}`);
		this.entity = entity;
	}

	process(message: any): void {
		if (message.type === this.event) {
			if (!!message.data && !!message.data.command) {
				this.entity.metricsRX.processPdu(message.data);
			}
		}
	};
}