<script>
import DefaultJob from "@/components/Client/DefaultJob.vue";

export default {
  components: {DefaultJob},
  props: ['center'],
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
        xaxis: this.center.metrics.graphData.xaxis,
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      },
    }
  },
  emits: ['deleteCenterFromList'],
  mounted() {
    this.center.openWebsocket();
  },
  updated() {
    this.center.openWebsocket();
  },
  methods: {
    disconnectCenter() {
      this.center.disconnect();
    },
    deleteCenterFromList() {
      const centerId = this.center.id;
      this.center.delete();
      this.$emit('deleteCenterFromList', centerId);
    },
  },
  computed: {
    showConnect() {
      return this.center.status === 'WAITING CONNECTION';
    },
    showDisconnect() {
      return this.center.status === 'CONNECTED' || this.center.status === 'CONNECTION PENDING'
    }
  }
}
</script>

<template>
  <div class="row mt-0 mb-2 text-center">
    <div class="col-6 m-auto">
      <button :class="{'disabled' : showConnect}" class="btn btn-sm btn-danger w-100" @click="disconnectCenter">
        Disconnect
      </button>
    </div>
  </div>
  <div class="row g-1 align-items-center">
    <div class="col-5">
      <input type="text" class="form-control" placeholder="Username" :value="center.username"
             @input="event => center.setUsername(event.target.value)">
    </div>
    <div class="col-5">
      <input type="text" class="form-control" placeholder="Password" :value="center.password"
             @input="event => center.setPassword(event.target.value)">
    </div>
    <div class="col-2">
      <button type="button" class="btn btn-sm btn-danger w-100" @dblclick="deleteCenterFromList">Delete</button>
    </div>
    <!-- TODO: Progress Bar -->
  </div>
  <DefaultJob :default-job="center.defaultJob"
              :default-multi-job="center.defaultMultiJob"/>
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
    <apexchart type="area" height="250" ref="chart" :options="chartOptions" :series="center.metrics.graphData.series"></apexchart>
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