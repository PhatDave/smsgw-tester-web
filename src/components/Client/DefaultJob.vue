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
    }
  },
}
</script>

<template>
  <div class="row">
    <div class="col-6">
      <div>Default Job</div>
      <div contenteditable> {{ defaultJob.source }}</div>
      <div contenteditable> {{ defaultJob.destination }}</div>
      <div contenteditable> {{ defaultJob.message }}</div>
      <div>Send</div>
    </div>
    <div class="col-6">
      <div>Default Multi Job</div>
      <div contenteditable> {{ defaultMultiJob.source }}</div>
      <div contenteditable> {{ defaultMultiJob.destination }}</div>
      <div contenteditable> {{ defaultMultiJob.message }}</div>
      <div contenteditable> {{ defaultMultiJob.interval }}<span>s</span></div>
      <div contenteditable> {{ defaultMultiJob.count }}</div>
      <div>Send</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 30%;
}
</style>