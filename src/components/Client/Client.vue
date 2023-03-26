<script>
import DefaultJob from "@/components/Client/DefaultJob.vue";

export default {
  components: {DefaultJob},
  props: ['client'],
  data() {
    return {
      client: this.client,
    }
  },
  beforeMount() {
    this.client.openWebsocket();
  },
  methods: {
    deleteClient() {
      // TODO: Implement delete
    },
    getStatusClass() {
      if (this.client.status === 'NOT CONNECTED') return "bg-danger";
      else if (this.client.status === 'CONNECTED') return "bg-warning";
      else return "bg-success";
    }
  }
}
</script>

<template>
  <div class="card my-2">
    <div class="card-header" :class="getStatusClass()">
      <div class="row justify-content-center align-items-center">
        <div class="col-6">{{ client.status }}</div>
        <div class="col-6 text-end">
          <button v-if="client.status === 'NOT CONNECTED'" class="btn btn-sm btn-warning mx-1">
            Connect
          </button>
          <button v-if="client.status !== 'NOT CONNECTED' && client.status !== 'BOUND'" class="btn btn-sm btn-success mx-1">
            Bind
          </button>
          <button v-if="client.status === 'CONNECTED' || client.status === 'BOUND'" class="btn btn-sm btn-danger mx-1">
            Disconnect
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title mb-3">
        {{ client.url }}
      </h5>
      <form class="row g-1 align-items-center">
        <div class="col-5">
          <input type="text" class="form-control" v-model="client.username">
        </div>
        <div class="col-5">
          <input type="text" class="form-control" v-model="client.password">
        </div>
        <div class="col-2">
          <button type="button" class="btn btn-sm btn-outline-danger" v-on:dblclick="deleteClient">Delete</button>
        </div>
        <!-- TODO: Progress Bar -->
      </form>
      <hr>
      <div class="p-2">
        <DefaultJob :default-job="client.defaultJob" :default-multi-job="client.defaultMultiJob"/>
      </div>
    </div>
  </div>
</template>
