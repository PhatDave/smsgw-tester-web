<script>

export default {
  components: {
  },
  props: ['client'],
  data() {
    return {
      chartOptions: {
        chart: {
          height: 350,
          type: 'area',
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          },
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: this.client.metrics.graphData.xaxis,
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      },
    }
  },
  emits: [
    'deleteClientFromList',
  ],
  mounted() {
    this.client.openWebsocket();
  },
  updated() {
    this.client.openWebsocket();
  },
  methods: {
    deleteClientFromList() {
      const clientId = this.client.id;
      this.client.delete();
      this.$emit('deleteClientFromList', clientId);
    },
    updateSingleJob() {
      this.client.configDefault();

    },
    updateMultiJob() {
      this.client.configureDefaultMany();
    },
    connectClient() {
      this.client.connect();
    },
    bindClient() {
      this.client.bind();
    },
    disconnectClient() {
      this.client.disconnect();
    },
    sendOne() {
      this.client.sendDefault();
    },
    sendMany() {
      this.client.sendDefaultMany();
    },
    isBusy() {
      return this.client.status === 'BUSY';
    },
    sendManyStop() {
      this.client.cancelSendMany();
    }
  },
  computed: {
    showConnect() {
      return this.client.status === 'NOT CONNECTED';
    },
    showBind() {
      return this.client.status === 'CONNECTED';
    },
    showDisconnect() {
      return this.client.status === 'BOUND' || this.client.status === 'CONNECTED';
    },
  },
	watch: {
	  // Watch for changes on client.counter
			  'client.this.sendCounter': function (newVal, oldVal) {
	    // Update the chart
	    this.chartOptions.series[0].data = this.client.metrics.graphData.series[0].data;
	  }
	}
}
</script>

<template>
  <div class="row mt-0 mb-2 text-center">
    <div v-if="showConnect" class="col-6">
      <button class="btn btn-sm btn-warning w-100" @click="connectClient">
        Connect
      </button>
    </div>
    <div v-if="showBind" class="col-6">
      <button class="btn btn-sm btn-success w-100" @click="bindClient">
        Bind
      </button>
    </div>
    <div class="col-6 ms-auto">
      <button :class="{'disabled' : !showDisconnect}" class="btn btn-sm btn-danger w-100" @click="disconnectClient">
        Disconnect
      </button>
    </div>
  </div>
  <div class="row g-1 align-items-center">
    <div class="col-5">
      <input type="text" class="form-control" placeholder="Username" :value="client.username"
             @input="event => client.setUsername(event.target.value)">
    </div>
    <div class="col-5">
      <input type="text" class="form-control" placeholder="Password" :value="client.password"
             @input="event => client.setPassword(event.target.value)">
    </div>
    <div class="col-2">
      <button type="button" class="btn btn-sm btn-danger w-100" @dblclick="deleteClientFromList">Delete</button>
    </div>
    <!-- TODO: Progress Bar -->
  </div>
  <DefaultJob :default-job="client.defaultJob"
              :default-multi-job="client.defaultMultiJob"
              :busy="isBusy()"
              :isClient="true"
              @singleJob="updateSingleJob"
              @multiJob="updateMultiJob"
              @sendOne="sendOne"
              @sendMany="sendMany"
              @stop="sendManyStop"
              :clientId="client.id"/>
  <div class="container row text-center my-2 align-items-center justify-content-center">
    <h6 class="mb-3">Modes **PLACEHOLDER**</h6>
    <div class="col-3 my-1">
      <button class="btn btn-dark w-100">Mode 1</button>
    </div>
    <div class="col-3 my-1">
      <button class="btn btn-dark w-100">Mode 2</button>
    </div>
    <div class="col-3 my-1">
      <button class="btn btn-dark w-100">Mode 3</button>
    </div>
    <div class="col-3 my-1">
      <button class="btn btn-dark w-100">Mode 4</button>
    </div>
    <div class="col-3 my-1">
      <button class="btn btn-dark w-100">Mode 5</button>
    </div>
    <div class="col-3 my-1">
      <button class="btn btn-dark w-100">Mode 6</button>
    </div>
    <div class="col-3 my-1">
      <button class="btn btn-dark w-100">Mode 7</button>
    </div>
  </div>
  <div class="container">
    <apexchart type="area" height="250" ref="chart" :options="chartOptions" :series="client.metrics.graphData.series"></apexchart>
  </div>
</template>

<style scoped>
input {
  border: none;
  border-bottom: 1px solid #eee;
  border-radius: 0;
  background-color: inherit;
}

input:focus,
textarea:focus {
  outline: none !important;
  box-shadow: none;
  border-bottom: 1px solid #eee;
  background-color: inherit;
}

textarea {
  border: none;
  border-bottom: 1px solid #eee;
  border-radius: 0;
}
</style>