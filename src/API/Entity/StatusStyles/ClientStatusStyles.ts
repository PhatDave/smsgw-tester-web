import {StatusStyle, Style} from "../../CommonObjects";
import StatusStyles from "./StatusStyles";
import Styles from "./Styles";

export default class ClientStatusStyles extends StatusStyles {
	defaultStyle: Style = Styles.BAD;
	status: string;
	statuses: StatusStyle[] = [
		{
			status: "NOT CONNECTED", style: Styles.BAD
		},
		{
			status: "CONNECTING", style: Styles.BAD_BETTER
		},
		{
			status: "CONNECTED", style: Styles.OK
		},
		{
			status: "BINDING", style: Styles.OK_BETTER
		},
		{
			status: "BOUND", style: Styles.GOOD
		},
		{
			status: "BUSY", style: Styles.BUSY
		}
	];
}