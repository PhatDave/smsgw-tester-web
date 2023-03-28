class Metrics {
	static interestingMetrics = [
		'submit_sm',
		'deliver_sm'
	];
	metrics = {};

	graphData = {
		chart: {
			id: 'client-metrics'
		},
		xaxis: {
			submit_sm: [],
			deliver_sm: []
		},
		series: [
			{
				name: 'submit_sm',
				data: [0]
			},
			{
				name: 'deliver_sm',
				data: [0]
			}
		]
	}

	constructor() {
	}

	processPdu(pdu) {
		if (Metrics.interestingMetrics.indexOf(pdu.command) !== -1) {
			let timestamp = Math.floor(new Date().getTime() / 1000);

			if (!!!this.metrics[timestamp]) {
				this.metrics[timestamp] = {};
			}
			if (!!!this.metrics[timestamp][pdu.command]) {
				this.metrics[timestamp][pdu.command] = 0;
			}

			this.metrics[timestamp][pdu.command] += 1;

			if (!!this.metrics[timestamp - 1] && this.graphData.xaxis.submit_sm.indexOf(timestamp - 1) === -1) {
				this.graphData.xaxis.submit_sm.push(timestamp - 1);
				this.graphData.xaxis.deliver_sm.push(timestamp - 1);
				this.graphData.series[0].data.push(this.metrics[timestamp - 1]['submit_sm']);
				this.graphData.series[1].data.push(this.metrics[timestamp - 1]['deliver_sm']);
				console.log(this.graphData);
			}
		}
	}
}

export default Metrics;