export type PDU = {
	command: string;
	source_addr: string;
	destination_addr: string;
	short_message: string;
};
export type Metric = {
	[key: number]: { [key: string]: number };
};
export type GraphData = {
	xaxis: { [key: string]: number[] };
	series: ({
		data: number[];
		name: string
	})[]
};