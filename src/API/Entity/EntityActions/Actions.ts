import Action from "./Action";

export default abstract class Actions {
	abstract readonly disconnect: Action;
	abstract readonly connect?: Action;
	abstract readonly bind?: Action;
}