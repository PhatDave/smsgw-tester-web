<script>
import API from '@/API.js';
import Client from '@/components/Client/Client.vue';
import Center from '@/components/Center/Center.vue';
import APIClient from "@/APIClient";
import APICenter from "@/APICenter";

export default {
  components: {
    Client,
    Center
  },
  data() {
    return {
      clients: [],
      centers: [],
      api: new API(),
      clientForm: {
        url: '',
        username: '',
        password: ''
      },
      centerForm: {
        port: '',
        username: '',
        password: ''
      }
    }
  },
  beforeMount() {
    this.api.getClients().then(response => {
      this.clients = response;
    });
    this.api.getCenters().then(response => {
      this.centers = response;
    });
  },
  methods: {
    createNewClient() {
      const newClient = new APIClient(
          this.clientForm['url'],
          this.clientForm['username'],
          this.clientForm['password'],
          true
      );
      this.clients.push(newClient);
      this.closeModal("closeClientModal");
    },
    deleteClientFromList(clientId) {
      let i = this.clients.map(item => item.id).indexOf(clientId)
      this.clients.splice(i, 1)
    },
    createNewCenter() {
      const newCenter = new APICenter(
          this.centerForm['port'],
          this.centerForm['username'],
          this.centerForm['password'],
          true
      );
      this.centers.push(newCenter);
      this.closeModal("closeCenterModal");
    },
    deleteCenterFromList(centerId) {
      let i = this.centers.map(item => item.id).indexOf(centerId)
      this.centers.splice(i, 1)
    },
    closeModal(elemId) {
      document.getElementById(elemId).click();
    },
  }
}
</script>

<template>
  <div class="container-fluid my-2 row">
    <div class="col-6">
      <div class="text-center">
        <span class="display-6">Clients</span>
        &nbsp;
        <span class="addButton" data-bs-toggle="modal" data-bs-target="#addClientModal">
          Add+
        </span>
      </div>
      <div class="g-2 p-2">
        <Client v-for="client in clients" :client="client" @deleteClientFromList="deleteClientFromList"/>
      </div>
    </div>
    <div class="col-6">
      <div class="text-center">
        <span class="display-6">Centers</span>
        &nbsp;
        <span class="addButton" data-bs-toggle="modal" data-bs-target="#addCenterModal">
          Add+
        </span>
      </div>
      <div class="g-2 p-2">
        <Center v-for="center in centers" :center="center" @deleteCenterFromList="deleteCenterFromList"/>
      </div>
    </div>
  </div>

  <div class="modal fade" id="addClientModal" tabindex="-1" aria-labelledby="addClientModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addClientModalLabel">Add New Client</h1>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createNewClient" class="row g-3 align-items-center">
            <div class="col-12">
              <input type="text" class="form-control" placeholder="URL" v-model="clientForm.url" required>
            </div>
            <div class="col-12">
              <input type="text" class="form-control" placeholder="Username" v-model="clientForm.username" required>
            </div>
            <div class="col-12">
              <input type="text" class="form-control" placeholder="Password" v-model="clientForm.password" required>
            </div>
            <div class="col-12 text-center">
              <button type="submit" class="btn btn-success mx-2">Submit</button>
              <button type="button" class="btn btn-warning mx-2" id="closeClientModal" data-bs-dismiss="modal">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="addCenterModal" tabindex="-1" aria-labelledby="addCenterModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addCenterModalLabel">Add New Center</h1>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createNewCenter" class="row g-3 align-items-center">
            <div class="col-12">
              <input type="number" class="form-control" placeholder="0000" v-model="centerForm.port" required>
            </div>
            <div class="col-12">
              <input type="text" class="form-control" placeholder="Username" v-model="centerForm.username" required>
            </div>
            <div class="col-12">
              <input type="text" class="form-control" placeholder="Password" v-model="centerForm.password" required>
            </div>
            <div class="col-12 text-center">
              <button type="submit" class="btn btn-success mx-2">Submit</button>
              <button type="button" class="btn btn-warning mx-2" id="closeCenterModal" data-bs-dismiss="modal">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.addButton:hover {
  cursor: pointer;
}

input {
  border: none;
  border-bottom: 1px solid #eee;
  border-radius: 0;
}

input:focus {
  outline: none !important;
  box-shadow: none;
  border-bottom: 1px solid #bbb;
}
</style>