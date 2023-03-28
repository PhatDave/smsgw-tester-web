<script>
import DefaultJob from "@/components/Client/DefaultJob.vue";
import Line from "@/components/Charts/Line.vue";

export default {
  components: {
    Line,
    DefaultJob
  },
  props: ['client'],
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          intersect: false
        }
      },
    }
  },
  emits: [
    'deleteClientFromList',
  ],
  mounted() {
    this.client.openWebsocket();
  },
  beforeMount() {
    this.client.metrics.graphData.data.labels.push(0);
    this.client.metrics.graphData.data.datasets[0].data.push(0);
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
    statusClass() {
      switch (this.client.status) {
        case 'NOT CONNECTED':
          return "bg-danger";
        case 'CONNECTED':
          return "bg-warning";
        case 'BOUND':
          return "bg-success";
        case 'BUSY':
          return "bg-info";
        default:
          return "bg-danger";
      }
    },
    showConnect() {
      return this.client.status === 'NOT CONNECTED';
    },
    showBind() {
      return this.client.status === 'CONNECTED';
    },
    showDisconnect() {
      return this.client.status === 'BOUND' || this.client.status === 'CONNECTED';
    },
  }
}
</script>

<template>
  <div class="card my-2">
    <div class="card-header" :class="statusClass">
      <div class="row justify-content-center align-items-center">
        <div class="col-6">{{ client.status }}</div>
        <div class="col-6 text-end">
          <button v-if="showConnect" class="btn btn-sm btn-warning mx-1" @click="connectClient">
            Connect
          </button>
          <button v-if="showBind" class="btn btn-sm btn-success mx-1" @click="bindClient">
            Bind
          </button>
          <button v-if="showDisconnect" class="btn btn-sm btn-danger mx-1" @click="disconnectClient">
            Disconnect
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title mb-3 text-center">
        {{ client.url }}
      </h5>
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
          <button type="button" class="btn btn-sm btn-outline-danger" @dblclick="deleteClientFromList">Delete</button>
        </div>
        <!-- TODO: Progress Bar -->
      </div>
      <hr>
      <div class="p-2">
        <DefaultJob :default-job="client.defaultJob"
                    :default-multi-job="client.defaultMultiJob"
                    :busy="isBusy()"
                    @singleJob="updateSingleJob"
                    @multiJob="updateMultiJob"
                    @sendOne="sendOne"
                    @sendMany="sendMany"
                    @stop="sendManyStop"/>
      </div>
    </div>

    <div class="container">
      <Line :series="client.metrics.graphData" :options="chartOptions"/> <!-- :data="client.metrics.graphData" :options="chartOptions" -->
    </div>
  </div>
</template>

<style scoped>
input {
  border: none;
  border-bottom: 1px solid #eee;
  border-radius: 0;
}

input:focus,
textarea:focus {
  outline: none !important;
  box-shadow: none;
  border-bottom: 1px solid #bbb;
}

textarea {
  border: none;
  border-bottom: 1px solid #eee;
  border-radius: 0;
}
</style>