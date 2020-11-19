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
            <v-row no-gutters class="mt-0">
              <v-col>
                <v-text-field type="date" v-model="dateFrom">
                </v-text-field> </v-col
              ><v-col>
                <v-text-field type="date" v-model="dateTo">
                </v-text-field> </v-col></v-row
          ></v-col>
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
    dateTo: "20201119",
    info: [],
    mostrarChart: false
  }),

  mounted() {
    this.loadChart();
  },

  methods: {
    loadChart() {
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
          // console.log(response.data.Datos);
          var porcFatiga = response.data.Datos[0].PorcentajeFatiga;

          var porcDist = response.data.Datos[0].PorcentajeDistraccion;
          var porcVelocidad = response.data.Datos[0].PorcentajeExcesoVelocidad;

          this.info = [porcFatiga, porcDist, porcVelocidad];
          // console.log(this.info);
          this.mostrarChart = true;
        })

        .catch((error) => {
          //console.log(error);
        });
    }
  }
};
</script>

<style>
.v-text-field {
  width: 170px;
}
</style>
