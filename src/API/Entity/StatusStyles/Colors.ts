import {Color} from "../../CommonObjects";

export default class Colors {
	static readonly HIGH_ALPHA: number = 0.7;
	static readonly LOW_ALPHA: number = 0.25;

	static readonly RED: Color = {
		r: 255, g: 47, b: 5, a: Colors.HIGH_ALPHA,
	};
	static readonly RED_LOW_ALPHA: Color = {
		r: Colors.RED.r, g: Colors.RED.g, b: Colors.RED.b, a: Colors.LOW_ALPHA,
	};

	static readonly ORANGE: Color = {
		r: 255, g: 100, b: 5, a: Colors.HIGH_ALPHA,
	};
	static readonly ORANGE_LOW_ALPHA: Color = {
		r: Colors.ORANGE.r, g: Colors.ORANGE.g, b: Colors.ORANGE.b, a: Colors.LOW_ALPHA,
	};

	static readonly YELLOW: Color = {
		r: 255, g: 200, b: 0, a: Colors.HIGH_ALPHA,
	};
	static readonly YELLOW_LOW_ALPHA: Color = {
		r: Colors.YELLOW.r, g: Colors.YELLOW.g, b: Colors.YELLOW.b, a: Colors.LOW_ALPHA,
	};

	static readonly LIME: Color = {
		r: 128, g: 255, b: 0, a: Colors.HIGH_ALPHA,
	};
	static readonly LIME_LOW_ALPHA: Color = {
		r: Colors.LIME.r, g: Colors.LIME.g, b: Colors.LIME.b, a: Colors.LOW_ALPHA,
	};

	static readonly GREEN: Color = {
		r: 32, g: 255, b: 3, a: Colors.HIGH_ALPHA,
	};
	static readonly GREEN_LOW_ALPHA: Color = {
		r: Colors.GREEN.r, g: Colors.GREEN.g, b: Colors.GREEN.b, a: Colors.LOW_ALPHA,
	};

	static readonly BLUE: Color = {
		r: 3, g: 221, b: 255, a: Colors.HIGH_ALPHA,
	};
	static readonly BLUE_LOW_ALPHA: Color = {
		r: Colors.BLUE.r, g: Colors.BLUE.g, b: Colors.BLUE.b, a: Colors.LOW_ALPHA,
	};
}