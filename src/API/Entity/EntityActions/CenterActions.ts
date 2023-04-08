import Entity from "../Entity";
import Action, {AcitonType} from "./Action";
import Actions from "./Actions";

export default class CenterActions extends Actions {
	doSend: Action;
	doSendMany: Action;
	doStopSend: Action;
	disconnect: Action;
	connect: Action;
	bind: Action;

	constructor(center: Entity) {
		super();
		this.disconnect = new Action("Disconnect", () => center.disconnect(), () => ["CONNECTING", "CONNECTED"].indexOf(center.status) !== -1);
		this.connect = new Action("Connect", () => {
		}, () => false);
		this.bind = new Action("Bind", () => {
		}, () => false);
		this.doSend = new Action("Send One", () => center.runJob(center.defaultSingleJob), () => ["CONNECTED"].indexOf(center.status) !== -1);
		this.doSendMany = new Action("Send Many", () => center.runJob(center.defaultMultipleJob), () => ["CONNECTED"].indexOf(center.status) !== -1);
		this.doStopSend = new Action("Stop Send", () => center.stopJob(), () => ["BUSY"].indexOf(center.status) !== -1);

		this.disconnect.type = AcitonType.BAD;
		this.connect.type = AcitonType.OK;
		this.bind.type = AcitonType.GOOD;
		this.doSend.type = AcitonType.NEUTRAL;
		this.doSendMany.type = AcitonType.NEUTRAL;
		this.doStopSend.type = AcitonType.OK;
	}
}