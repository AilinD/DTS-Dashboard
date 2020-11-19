<template
  ><div align="center">
    <v-card-text class="pt-0">
      <v-container>
        <v-row>
          <v-col>
            <div class="title font-weight mb-2">
              Mejores conductores
            </div>
          </v-col>
        </v-row>
        <v-divider class="my-2 mb-0"></v-divider>
      </v-container>
    </v-card-text>
    <v-container class="mt-0 pt-0">
      <v-row align="center" class="pa-0">
        <v-col
          cols="12"
          md="3"
          v-for="item in bestScores"
          :key="item"
          class="centre"
        >
          <v-avatar color="secondary mb-3" size="75"> </v-avatar>
          <div class="text-center">
            <!-- <v-rating
              v-
              background-color="yellow accent-4"
              color="yellow accent-4"
              dense
              readonly
              size="18"
            ></v-rating>-->

            {{ item.Scoring }}
          </div>
          <div class="text-center">
            {{ item.NombreConductor }}
          </div>
          <div class="text-center">
            {{ item.IdConductor }}
          </div>
          <div class="text-center">
            Cantidad de viajes: {{ item.CantidadViajes }}
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="my-2 mb-0"></v-divider>
    <v-card-text class="pt-0">
      <v-container>
        <v-row>
          <v-col>
            <div class="title font-weight mb-2">
              Peores conductores
            </div>
          </v-col>
        </v-row>
        <v-divider class="my-2 mb-0"></v-divider>
      </v-container>
    </v-card-text>
    <v-container class="mt-0 pt-0">
      <v-row class="pa-0 centre">
        <v-col
          cols="12"
          md="3"
          v-for="item in worstScores"
          :key="item"
          class="centre"
        >
          <v-avatar color="secondary mb-3" size="75"> </v-avatar>
          <div class="text-center">
            <!-- <v-rating
              v-
              background-color="yellow accent-4"
              color="yellow accent-4"
              dense
              readonly
              size="18"
            ></v-rating>-->

            {{ item.Scoring }}
          </div>
          <div class="text-center">
            {{ item.NombreConductor }}
          </div>
          <div class="text-center">
            {{ item.IdConductor }}
          </div>
          <div class="text-center">
            Cantidad de viajes: {{ item.CantidadViajes }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
props: {
  date: String;
  date2: String;
}
export default {
  name: "TopChart",
  data() {
    return {
      bestScores: [],
      worstScores: [],
      dateFrom: "20200801",
      dateTo: "20201119"
    };
  },
  mounted() {
    this.buscarmejores();
    this.buscarpeores();
  },
  methods: {
    buscarmejores() {
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
        var mejores = [];
        response.data.Datos.forEach((user) => {
          usuarios.push(user.IdConductor);
        });
        var uniqueids = usuarios.filter(this.onlyUnique);

        uniqueids.forEach((idCoductoraBuscar) => {
          const conductor = response.data.Datos.find(
            (s) => s.IdConductor == idCoductoraBuscar
          );
          mejores.push(conductor);
        });
        mejores.sort();
        this.bestScores = mejores.slice(mejores.length - 3, mejores.length);
        console.log(this.bestScores);
      });
    },
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
    buscarpeores() {
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
        console.log(this.worstScores);
      });
    },
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
  }
};
</script>
