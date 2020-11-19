<template>
  <v-app>
    <v-row>
      <drawer />
      <v-col>
        <v-container class="pt-0 pb-0">
          <v-row no-gutters>
            <v-col cols="sm">
              <v-card class="pa-3 mt-0" outlined>
                <v-card-text class="pt-0">
                  <div class="title font-weight mb-2">
                    Total de usuarios
                  </div>
                  <v-divider class="my-2"></v-divider>
                </v-card-text>
                <Bar2 />
              </v-card>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="sm" class="mt-3 ">
              <Doughnut />
            </v-col>
            <v-col cols="sm" class="mt-3 ml-3"> <top-chart /></v-col>
          </v-row>
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
import axios from "axios";
export default {
  data() {
    return {};
  },
  components: {
    Drawer,
    Bar2,
    TopChart,
    Doughnut
  }
};
</script>
