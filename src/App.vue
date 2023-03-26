<script>
import API from '@/API.js';
import Client from '@/components/Client/Client.vue';
import Center from '@/components/Center/Center.vue';

export default {
  components: {
    Client,
    Center
  },
  data() {
    return {
      clients: [],
      centers: [],
      api: new API()
    }
  },
  beforeMount() {
    this.api.getClients().then(response => {
      this.clients = response;
    });
    this.api.getCenters().then(response => {
      this.centers = response;
    });
  }
}
</script>

<template>
  <div class="container-fluid my-2 row">
    <div class="col-6">
      <div class="display-6 text-center">Clients</div>
      <div class="g-2 p-2">
        <Client v-for="client in clients" :client="client"/>
      </div>
    </div>
    <div class="col-6">
      <div class="display-6 text-center">Centers</div>
      <div class="g-2 p-2">
        <Center v-for="center in centers" :center="center"/>
      </div>
    </div>
  </div>
</template>
