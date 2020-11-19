<template>
  <v-app>
    <v-row>
      <div class="ml-3">
        <drawer />
      </div>
      <v-col>
        <v-container fluid>
          <v-row dense>
            <v-col cols="sm" class="mt-3">
              <v-card class=" pa-3" outlined>
                <v-card-text class="pt-0">
                  <div class="title font-weight mb-2">
                    Cantidad de usuarios: {{ size(drivers) }}
                  </div>

                  <v-divider class="my-2"></v-divider>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="sm">
              <v-card class="pa-3" outlined>
                <v-card>
                  <v-card-title>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                  <v-data-table
                    :headers="headers"
                    :items="drivers"
                    :search="search"
                  >
                  </v-data-table>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import axios from "axios";
import Drawer from "../components/Drawer.vue";
export default {
  components: {
    Drawer
  },
  data() {
    return {
      date: "20200801",
      date2: "20201116",
      search: "",

      headers: [
        {
          text: "ID",
          align: "start",
          value: "IdConductor"
        },
        {
          text: "Nombre",
          value: "NombreConductor"
        },
        {
          text: "E-mail",
          value: "EmailConductor"
        },
        { text: "Cantidad de viajes", value: "CantidadViajes" },
        { text: "Puntaje", value: "Scoring" }
      ],
      drivers: []
    };
  },

  created() {
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
        this.drivers = response.data.Datos;
      })

      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    size(drivers) {
      let count = 0;
      if (drivers != null) {
        count = drivers.length;
      }
      return count;
    }
  }
};
</script>
