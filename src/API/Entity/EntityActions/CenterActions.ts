import Entity from "../Entity";
import Action from "./Action";
import Actions from "./Actions";

export default class CenterActions extends Actions {
	disconnect: Action;
	connect: Action;
	bind: Action;

	constructor(center: Entity) {
		super();
		this.disconnect = new Action("Disconnect", () => center.disconnect(), () => ["CONNECTING", "CONNECTED"].indexOf(center.status) !== -1);
		this.connect = new Action("Connect", () => {}, () => false);
		this.bind = new Action("Bind", () => {}, () => false);
	}
}