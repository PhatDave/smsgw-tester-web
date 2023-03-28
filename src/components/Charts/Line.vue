<script>
export default {
  name: "Line",
  data: function () {
    return {
      chartOptions: {},
      series: [],
    };
  },
}
</script>
<template>
  <div>
    <apexchart
        width="500"
        type="bar"
        :options="chartOptions"
        :series="series"
    ></apexchart>
  </div>
</template>
