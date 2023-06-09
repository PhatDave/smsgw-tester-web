import {StatusStyle, Style} from "../../CommonObjects";

export default abstract class StatusStyles {
	abstract readonly statuses: StatusStyle[];
	abstract readonly defaultStyle: Style;

	getStyle(status: string): Style {
		let style: StatusStyle = this.statuses.find((statusStyle: StatusStyle) => statusStyle.status === status);
		if (style) {
			return style.style;
		}
		return this.defaultStyle;
	}
}