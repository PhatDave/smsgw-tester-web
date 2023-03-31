import Entity from "../Entity";
import Action from "./Action";
import Actions from "./Actions";

export default class ClientActions extends Actions {
	disconnect: Action;
	connect: Action;
	bind: Action;

	constructor(client: Entity) {
		super();
		this.disconnect = new Action("Disconnect", () => client.disconnect(), () => ["CONNECTING", "CONNECTED", "BINDING", "BOUND"].indexOf(client.status) !== -1);
		this.connect = new Action("Connect", () => client.connect(), () => ["NOT CONNECTED"].indexOf(client.status) !== -1);
		this.bind = new Action("Bind", () => client.bind(), () => ["CONNECTED"].indexOf(client.status) !== -1);
	}
}