import {WebsocketMessage} from "../../CommonObjects";
import Entity from "../Entity";

export default abstract class WebsocketEventProcessor {
	readonly abstract entity: Entity;
	readonly abstract event: string;

	abstract process(message: WebsocketMessage): void;
}