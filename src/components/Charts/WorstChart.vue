<template
  ><div align="center">
    <v-container class="mt-0 pt-0">
      <v-row align="center" class="pa-0">
        <!-- <v-col cols="12" sm="4" class="centre">
            <v-avatar color="secondary" size="75"
              ><span class="text-center display-1 white--text">2</span>
            </v-avatar>
            <div class="text-center">
              <v-rating
                v-model="rating2"
                background-color="yellow accent-4"
                color="yellow accent-4"
                dense
                readonly
                size="18"
              ></v-rating>
            </div>
            <div class="text-center">
              <h5>Nombre Apellido</h5>
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <v-avatar color="secondary" size="90"
              ><span class="text-center display-1 white--text">1</span>
            </v-avatar>
            <div class="text-center">
              <v-rating
                v-model="rating"
                background-color="yellow accent-4"
                color="yellow accent-4"
                dense
                readonly
                size="18"
              ></v-rating>
            </div>
            <div class="text-center">
              <h5>Nombre Apellido</h5>
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <v-avatar color="secondary" size="75">
              <span class="text-center display-1 white--text">3</span>
            </v-avatar>

            <div class="text-center">
              <v-rating
                v-model="rating3"
                background-color="yellow accent-4"
                color="yellow accent-4"
                dense
                readonly
                size="18"
              ></v-rating>
            </div>
            <div class="text-center">
              <h5>Nombre Apellido</h5>
            </div>
          </v-col>-->
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
      worstScores: []
    };
  },
  mounted() {
    this.submit();
  },
  methods: {
    submit() {
      const headersDatos = {
        Authorization: "Basic UEYyMDIwOlBGMjAyMEFQSXYx",
        FechaDesde: this.dateFrom,
        FechaHasta: this.dateTo
      };

      axios({
        method: "GET",
        headers: headersDatos,
        url: "http://54.80.18.229:8123/api/estadisticas/getScoringByPeriodo"
      })
        .then((response) => {
          response.data.Datos.forEach((d) => {
            this.worstScores.push(d);
          });
          this.worstScores.Scoring.sort();
          console.log(this.worstScores);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>
