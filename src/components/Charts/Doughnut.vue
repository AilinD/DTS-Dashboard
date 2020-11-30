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
          <v-col>
            <div class="text-right mb-0">
              Histórico
            </div>
          </v-col>
        </v-row>
        <v-divider class="mt-0 pt-0"></v-divider>
      </v-container>
    </v-card-text>

    <doughnut-chart
      :height="160"
      :info="info"
      v-if="mostrarChart"
    ></doughnut-chart>
  </v-card>
</template>

<script>
import axios from "axios";
import DoughnutChart from "../Charts/DoughnutChart.vue";

export default {
  components: {
    DoughnutChart
  },
  data: () => ({
    dateFrom: "20200801",
    dateTo: "",
    info: [],
    mostrarChart: false
  }),

  mounted() {
    this.loadChart();
  },

  methods: {
    loadChart() {
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "");
      this.dateTo = currentDateWithFormat;
      const headersDatos = {
        Authorization: "Basic UEYyMDIwOlBGMjAyMEFQSXYx",
        FechaDesde: this.dateFrom,
        FechaHasta: this.dateTo
      };

      axios({
        method: "GET",
        headers: headersDatos,
        url: "http://54.80.18.229:8123/api/estadisticas/getDistribucionAlarmas"
      })
        .then((response) => {
          var porcFatiga = response.data.Datos[0].PorcentajeFatiga;

          var porcDist = response.data.Datos[0].PorcentajeDistraccion;
          var porcVelocidad = response.data.Datos[0].PorcentajeExcesoVelocidad;

          this.info = [porcFatiga, porcDist, porcVelocidad];
          this.mostrarChart = true;
        })

        .catch((error) => {});
    }
  }
};
</script>

<style>
.v-text-field {
  width: 170px;
}
</style>
