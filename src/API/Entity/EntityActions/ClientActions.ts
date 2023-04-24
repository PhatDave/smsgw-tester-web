import Entity from "../Entity";
import Action, {AcitonType} from "./Action";
import Actions from "./Actions";

export default class ClientActions extends Actions {
	doSend: Action;
	doSendMany: Action;
	doStopSend: Action;
	disconnect: Action;
	connect: Action;
	bind: Action;

	constructor(client: Entity) {
		super();
		this.disconnect = new Action("Disconnect", () => client.disconnect(), () => ["CONNECTING", "CONNECTED", "BINDING", "BOUND"].indexOf(client.status) !== -1);
		this.connect = new Action("Connect", () => client.connect(), () => ["NOT CONNECTED"].indexOf(client.status) !== -1);
		this.bind = new Action("Bind", () => client.bind(), () => ["CONNECTED"].indexOf(client.status) !== -1);
		this.doSend = new Action("Send One", () => client.runJob(client.defaultSingleJob), () => ["BOUND"].indexOf(client.status) !== -1);
		this.doSendMany = new Action("Send Many", () => client.runJob(client.defaultMultipleJob), () => ["BOUND"].indexOf(client.status) !== -1);
		this.doStopSend = new Action("Stop Send", () => client.stopJob(), () => ["BUSY"].indexOf(client.status) !== -1);

		this.disconnect.type = AcitonType.BAD;
		this.connect.type = AcitonType.OK;
		this.bind.type = AcitonType.GOOD;
		this.doSend.type = AcitonType.NEUTRAL;
		this.doSendMany.type = AcitonType.NEUTRAL;
		this.doStopSend.type = AcitonType.OK;
	}
}