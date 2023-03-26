<script>
import DefaultJob from "@/components/Client/DefaultJob.vue";

export default {
  components: {DefaultJob},
  props: ['center'],
  data() {
    return {
      center: this.center,
    }
  },
  beforeMount() {
    this.center.openWebsocket();
  },
  methods: {}
}
</script>

<template>
  <!--	:class="{ 'online': client.status === 'online', 'offline': client.status === 'offline' }">{{ client.status }}</div>-->
  <div :class="center.status">
    <div>
      <div>{{ center.status }}</div>
    </div>
    <div>
      <div>{{ center.url }}</div>
      <div contenteditable>{{ center.username }}</div>
      <div contenteditable>{{ center.password }}</div>
      <div>{{ center.sendCounter }}</div>
    </div>
  </div>
</template>

<style scoped>
.WAITING_CONNECTION {
  background-color: rgba(255, 255, 0, 0.3);
}

.CONNECTION_PENDING {
  background-color: rgba(255, 255, 0, 0.6);
}

.CONNECTED {
  background-color: rgba(0, 255, 0, 0.3);
}
</style>