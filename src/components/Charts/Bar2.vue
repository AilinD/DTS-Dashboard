<template>
  <v-card class=" container " outlined>
    <v-card-text class="pt-0">
      <v-container>
        <v-row>
          <v-col>
            <div class="title font-weight mb-2">
              Nuevos usuarios por mes
            </div>
          </v-col>
          <v-col>
            <div class="text-right mb-2">
              2020
            </div>
          </v-col>
        </v-row>
        <v-divider class="my-2"></v-divider>
      </v-container>
    </v-card-text>
    <bar-chart-2
      :height="268"
      :width="1030"
      :chartInfo="altas"
      v-if="mostrarChart"
    ></bar-chart-2>
  </v-card>
</template>

<script>
import BarChart2 from "../Charts/BarChart2";
import axios from "axios";
export default {
  components: {
    BarChart2
  },
  data: () => ({
    dateFrom: "20200801",
    dateTo: "",
    altas: [],
    users: [],
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
        url: "http://54.80.18.229:8123/api/estadisticas/getByPeriodo"
      }).then((response) => {
        this.altas = [
          { mesAnio: "202001", cantidad: 0 },
          { mesAnio: "202002", cantidad: 0 },
          { mesAnio: "202003", cantidad: 0 },
          { mesAnio: "202004", cantidad: 0 },
          { mesAnio: "202005", cantidad: 0 },
          { mesAnio: "202006", cantidad: 0 },
          { mesAnio: "202007", cantidad: 0 },
          { mesAnio: "202008", cantidad: 0 },
          { mesAnio: "202009", cantidad: 0 },
          { mesAnio: "202010", cantidad: 0 },
          { mesAnio: "202011", cantidad: 0 },
          { mesAnio: "202012", cantidad: 0 }
        ];
        var ids = [];

        response.data.Datos.forEach((alta) => {
          ids.push(alta.Viaje.Conductor.Id);
        });
        var uniqueids = ids.filter(this.onlyUnique);

        uniqueids.forEach((idConductoraBuscar) => {
          const conductor = response.data.Datos.find(
            (viaje) => viaje.Viaje.Conductor.Id == idConductoraBuscar
          );
          const mesAnio =
            conductor.Viaje.Conductor.AltaRegistro.slice(0, 4) +
            conductor.Viaje.Conductor.AltaRegistro.slice(5, 7);

          const posicion = this.altas.findIndex(
            (unAlta) => unAlta.mesAnio == mesAnio
          );
          if (posicion == -1) {
            this.altas.push({ mesAnio, cantidad: 1 });
          } else {
            this.altas[posicion].cantidad++;
          }
        });
        this.mostrarChart = true;
      });
    },

    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
  }
};
</script>
