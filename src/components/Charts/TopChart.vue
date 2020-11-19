<template>
  <v-card class=" pa-3" outlined>
    <top-chart-comp />
  </v-card>
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
      dateTo: "20201119"
    };
  }
};
</script>

<style>
.date-input {
  max-width: 200px;
}
</style>
