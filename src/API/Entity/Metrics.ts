import {GraphData, Metric, PDU} from "../CommonObjects";

export default class Metrics {
	static interestingMetrics: string[] = [
		'submit_sm',
		'deliver_sm'
	];
	metrics: Metric = {};
	graphData: GraphData = {
		xaxis: {
			submit_sm: [],
		},
		series: [
			{
				name: 'submit_sm',
				data: [0]
			},
			{
				name: 'deliver_sm',
				data: [0]
			}]
	};

	constructor() {
	}

	processPdu(pdu: PDU): void {
		if (Metrics.interestingMetrics.indexOf(pdu.command) !== -1) {
			let timestamp: number = Math.floor(new Date().getTime() / 1000);

			if (!!!this.metrics[timestamp]) {
				this.metrics[timestamp] = {};
			}
			if (!!!this.metrics[timestamp][pdu.command]) {
				this.metrics[timestamp][pdu.command] = 0;
			}

			this.metrics[timestamp][pdu.command] += 1;

			if (!!this.metrics[timestamp - 1] && this.graphData.xaxis.submit_sm.indexOf(timestamp - 1) === -1) {
				this.graphData.xaxis.submit_sm.push(timestamp - 1);

				let submit_sm: number = this.metrics[timestamp - 1]['submit_sm'];
				if (isNaN(submit_sm)) {
					submit_sm = 0;
				}
				this.graphData.series[0].data.push(submit_sm);

				let deliver_sm: number = this.metrics[timestamp - 1]['deliver_sm'];
				if (isNaN(deliver_sm)) {
					deliver_sm = 0;
				}
				this.graphData.series[1].data.push(deliver_sm);
			}
		}
	}
}