import {StatusStyle, Style} from "../../CommonObjects";
import StatusStyles from "./StatusStyles";
import Styles from "./Styles";

export default class CenterStatusStyles extends StatusStyles {
	defaultStyle: Style = Styles.BAD;
	status: string;
	statuses: StatusStyle[] = [
		{
			status: "WAITING CONNECTION", style: Styles.BAD
		},
		{
			status: "CONNECTING", style: Styles.OK
		},
		{
			status: "CONNECTED", style: Styles.GOOD
		}
	];
}