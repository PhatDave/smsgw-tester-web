export type PDU = {
	command?: string;
	command_id?: number;
	command_length?: number;
	command_status?: number;
	data_coding?: number;
	dest_addr_npi?: number;
	dest_addr_ton?: number;
	destination_addr?: string;
	esm_class?: number,
	password?: string,
	priority_flag?: number,
	protocol_id?: number,
	registered_delivery?: number,
	replace_if_present_flag?: number,
	response?: (...args: any[]) => PDU,
	schedule_delivery_time?: string,
	sequence_number?: number,
	service_type?: string,
	short_message?: string,
	sm_default_msg_id?: number,
	source_addr?: string,
	source_addr_npi?: number,
	source_addr_ton?: number,
	system_id?: string,
	validity_period?: string
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
export type Form = {
	arg: string,
	username: string,
	password: string,
};
export type Color = {
	r: number,
	g: number,
	b: number,
	a: number,
};
export type Style = {
	backgroundColor: Color,
	color?: Color,
	panelBackgroundColor?: Color,
	panelColor?: Color
};
export type StatusStyle = {
	status: string,
	style: Style
};
export type WebsocketMessage = {
	type: string,
	data: string
}