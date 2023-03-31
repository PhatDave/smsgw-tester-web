import Entity from "../Entity";
import Action from "./Action";

export default abstract class Actions {
	abstract readonly disconnect: Action;
	abstract readonly connect?: Action;
	abstract readonly bind?: Action;
	abstract readonly doSend: Action;
	abstract readonly doSendMany: Action;
	abstract readonly doStopSend: Action;
}