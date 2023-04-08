import Entity from "../../Entity";
import WebsocketEventProcessor from "../WebsocketEventProcessor";

export default class PduTXEventProcessor extends WebsocketEventProcessor {
	readonly entity: Entity;
	readonly event: string = "ANY_PDU_TX";

	constructor(entity: Entity) {
		super();
		this.entity = entity;
	}

	process(message: any): void {
		if (message.type === this.event) {
			if (!!message.data && !!message.data.command) {
				this.entity.metricsTX.processPdu(message.data);
			}
		}
	};
}