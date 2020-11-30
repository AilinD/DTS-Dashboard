<template>
  <top-chart-comp />
</template>

<script>
import axios from "axios";
import TopChartComp from "./TopChartComp.vue";

export default {
  components: { TopChartComp },
  name: "TopChart",
  data() {
    return {
      dateFrom: "20200801",
      dateTo: ""
    };
  }
};
</script>

<style>
.date-input {
  max-width: 200px;
}
</style>
