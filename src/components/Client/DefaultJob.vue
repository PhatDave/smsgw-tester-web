<script>
export default {
  name: "DefaultJob",
  props: [
    'defaultJob',
    'defaultMultiJob'
  ],
  data() {
    return {
      defaultJob: this.defaultJob,
      defaultMultiJob: this.defaultMultiJob,
      roundedInterval: this.defaultMultiJob.interval.toFixed(2),
    }
  },
}
</script>

<template>
  <!-- TODO: Implement onChange events to submit data (API?) -->
  <div class="row">
    <div class="col-6 p-2">
      <h6 class="text-center">Single Send</h6>
      <div class="row g-1 text-center">
        <div class="col-12">
          <input class="form-control" type="text" placeholder="Source" :value="defaultJob.source" @change="event => defaultJob.source = event.target.value"/>
        </div>
        <div class="col-12">
          <input class="form-control" type="text" v-model="defaultJob.destination" placeholder="Destination"/>
        </div>
        <div class="col-12">
          <textarea class="form-control" placeholder="Message" :value="defaultJob.message" @change="event => defaultJob.message = event.target.value"/>
        </div>
        <div class="col-12 mt-3">
          <button class="btn btn-success w-75">
            Send
          </button>
        </div>
      </div>
    </div>
    <div class="col-6 p-2">
      <h6 class="text-center">Multi Send</h6>
      <div class="row g-1 text-center">
        <div class="col-12">
          <input class="form-control" type="text" v-model="defaultMultiJob.source" placeholder="Source"/>
        </div>
        <div class="col-12">
          <input class="form-control" type="text" v-model="defaultMultiJob.destination" placeholder="Destination"/>
        </div>
        <div class="col-12">
          <textarea class="form-control" v-model="defaultMultiJob.message" placeholder="Message"/>
        </div>
        <div class="col-8">
          <div class="input-group">
            <input class="form-control" type="number" step="0.01" v-model="roundedInterval" placeholder="0.0"/>
            <label id="button-1" class="input-group-text">
              m/s
            </label>
          </div>
        </div>
        <div class="col-4">
          <input class="form-control" type="number" v-model="defaultMultiJob.count" placeholder="0"/>
        </div>
        <div class="col-12 mt-3">
          <button class="btn btn-success w-75">
            Send
          </button>
        </div>
      </div>
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

.input-group-text {
  background-color: inherit;
  border: none;
  border-bottom: 1px solid #eee;
  border-radius: 0;
}
</style>