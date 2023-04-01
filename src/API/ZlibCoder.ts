import pako from 'pako';

export default class ZlibCoder {
	static decompress(input: any): string {
		input = atob(input);
		const binData: Uint8Array = new Uint8Array(input.length);
		for (let i = 0; i < input.length; i++) {
			binData[i] = input.charCodeAt(i);
		}
		return pako.inflate(binData, {to: 'string'});
	}
}