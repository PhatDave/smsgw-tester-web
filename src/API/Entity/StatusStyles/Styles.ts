import {Style} from "../../CommonObjects";
import Colors from "./Colors";

// TODO: Rework all this stupid shit to be css classes you donkey
export default class Styles {
	static readonly BAD: Style = {
		backgroundColor: Colors.RED,
		panelBackgroundColor: Colors.RED_LOW_ALPHA,
	};
	static readonly BAD_BETTER: Style = {
		backgroundColor: Colors.ORANGE,
		panelBackgroundColor: Colors.ORANGE_LOW_ALPHA,
	};
	static readonly OK: Style = {
		backgroundColor: Colors.YELLOW,
		panelBackgroundColor: Colors.YELLOW_LOW_ALPHA,
	};
	static readonly OK_BETTER: Style = {
		backgroundColor: Colors.LIME,
		panelBackgroundColor: Colors.LIME_LOW_ALPHA,
	};
	static readonly GOOD: Style = {
		backgroundColor: Colors.GREEN,
		panelBackgroundColor: Colors.GREEN_LOW_ALPHA,
	};
	static readonly BUSY: Style = {
		backgroundColor: Colors.BLUE,
		panelBackgroundColor: Colors.BLUE_LOW_ALPHA,
	};
}
