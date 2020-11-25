<template>
  <v-app>
    <v-row dense>
      <drawer />
      <v-col>
        <v-container class="pt-0 pb-0">
          <v-col cols="sm">
            <Bar2 />
          </v-col>
          <v-col cols="sm" class="mt-0 ">
            <Doughnut />
          </v-col>
          <v-col cols="sm" class="mt-0 ">
            <top-chart />
          </v-col>
          <v-col cols="sm" class="mt-0 ">
            <worst-chart />
          </v-col>
        </v-container>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Drawer from "../components/Drawer.vue";
import Bar2 from "../components/Charts/Bar2.vue";
import TopChart from "../components/Charts/TopChart.vue";
import Doughnut from "../components/Charts/Doughnut.vue";
import WorstChart from "../components/Charts/WorstChart.vue";
import axios from "axios";
export default {
  data() {
    return {};
  },
  components: {
    Drawer,
    Bar2,
    TopChart,
    Doughnut,
    WorstChart
  },
  mounted() {}
};
</script>
