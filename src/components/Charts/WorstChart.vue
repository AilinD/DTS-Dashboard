<template
  ><v-card align="center" outlined>
    <v-card-text class="pt-0 ">
      <v-container>
        <div class="title font-weight mb-2">
          Peores conductores
        </div>
        <div class=" mb-2">
          Histórico
        </div>
        <v-divider class="my-2 mb-0"></v-divider>
      </v-container>
    </v-card-text>
    <v-container class="mt-0 pt-0">
      <v-row class="pa-0 justify-center">
        <v-col
          cols="12"
          md="3"
          v-for="item in worstScores"
          :key="item"
          class="centre"
        >
          <v-avatar color="secondary mb-3" size="75"> </v-avatar>
          <div class="text-center">
            <v-rating
              v-model="item.Scoring"
              background-color="yellow accent-4"
              color="yellow accent-4"
              dense
              readonly
              size="18"
            ></v-rating>
          </div>
          <div class="text-center">
            {{ item.NombreConductor }}
          </div>
          <div class="text-center">ID: {{ item.IdConductor }}</div>
          <div class="text-center">
            Cantidad de viajes: {{ item.CantidadViajes }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";
props: {
  date: String;
  date2: String;
}
export default {
  name: "WorstChart",
  data() {
    return {
      worstScores: [],
      dateFrom: "20200801",
      dateTo: ""
    };
  },
  mounted() {
    this.buscarpeores();
  },
  methods: {
    buscarpeores() {
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
        url: "http://54.80.18.229:8123/api/estadisticas/getScoringByPeriodo"
      }).then((response) => {
        var usuarios = [];
        var peores = [];
        response.data.Datos.forEach((user) => {
          usuarios.push(user.IdConductor);
        });
        var uniqueids = usuarios.filter(this.onlyUnique);

        uniqueids.forEach((idCoductoraBuscar) => {
          const conductor = response.data.Datos.find(
            (s) => s.IdConductor == idCoductoraBuscar
          );
          peores.push(conductor);
        });
        peores.sort();
        this.worstScores = peores.slice(0, 3);
      });
    },
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
  }
};
</script>
