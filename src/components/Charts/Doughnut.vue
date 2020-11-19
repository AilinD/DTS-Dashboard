<template>
  <v-card class=" container " outlined>
    <v-card-text class="pt-0">
      <v-container>
        <v-row>
          <v-col>
            <div class="title font-weight mb-0 ">
              Porcentaje de alertas
            </div>
          </v-col>

          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                label="Date range"
                prepend-icon="mdi-calendar"
                readonly
                class="date-input mr-3"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates"
              no-title
              range
              scrollable
            ></v-date-picker>
          </v-menu>
        </v-row>
        <v-divider class="mt-0 pt-0"></v-divider>
      </v-container>
    </v-card-text>

    <doughnut-chart :height="160"></doughnut-chart>
  </v-card>
</template>

<script>
import DoughnutChart from "../Charts/DoughnutChart.vue";

export default {
  components: {
    DoughnutChart
  },
  data: () => ({
    dates: [""],
    date: new Date().toISOString().substr(0, 10),
    menu: false
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  }
};
</script>

<style>
.date-input {
  max-width: 220px;
}
</style>
