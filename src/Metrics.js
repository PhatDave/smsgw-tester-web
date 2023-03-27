class Metrics {
	static interestingMetrics = [
		'submit_sm',
		'deliver_sm'
	];
	metrics = {};

	dataset = {
		label: 'submit_sm',
		backgroundColor: '#f87979',
		data: [0]
	};
	graphData = {
		dataset: this.dataset,
		data: {
			labels: [0],
			datasets: [this.dataset]
		},
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

			if (!!this.metrics[timestamp - 1] && this.graphData.data.labels.indexOf(timestamp - 1) === -1) {
				this.graphData.data.labels.push(timestamp - 1);
				this.graphData.dataset.data.push(this.metrics[timestamp - 1]['submit_sm']);
				console.log(this.graphData);
			}
		}
	}
}

export default Metrics;