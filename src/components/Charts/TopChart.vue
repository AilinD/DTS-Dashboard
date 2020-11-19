<template>
  <v-card class=" pa-3" outlined>
    <v-card-text class="pt-0">
      <v-container>
        <v-row>
          <v-col>
            <div class="title font-weight mb-2">
              Mejores conductores
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
        <v-divider class="my-2 mb-0"></v-divider>
      </v-container>
    </v-card-text>

    <div align="center">
      <v-container class="mt-0 pt-0">
        <v-row align="center" class="pa-0">
          <v-col cols="12" sm="4" class="centre">
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
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "TopChart",
  data() {
    return {
      infoData: [null],
      rating: null,
      rating2: null,
      rating3: null,
      dates: [""],
      date: "20200801",
      date2: "20201116",
      date: new Date().toISOString().substr(0, 10),
      menu: false
    };
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  },
  mounted() {
    this.submit();
  },
  methods: {
    submit() {
      const headersDatos = {
        Authorization: "Basic UEYyMDIwOlBGMjAyMEFQSXYx",
        FechaDesde: this.date,
        FechaHasta: this.date2
      };
      axios({
        method: "GET",
        headers: headersDatos,
        url: "http://54.80.18.229:8123/api/estadisticas/getScoringByPeriodo"
      })
        .then((response) => {
          console.log(response.data.Datos);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.date-input {
  max-width: 200px;
}
</style>
