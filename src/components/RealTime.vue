

<template >
  <v-container>
    <v-col>
      <v-card elevation="1" shaped color="purple" min-width="100px">
        <v-card-title class="white--text">
          Viajes activos: {{ size(infoData) }}
        </v-card-title>
      </v-card>
    </v-col>

    <v-container fluid>
      
      <v-row dense>
        <v-col cols="12" md="3" v-for="item in infoData" :key="item">
          <v-card elevation="3" shaped min-height="">
            <v-card-title class="font-weight-black">
              {{ item.NombreConductor }} {{ calculate(item.Alarmas) }}
            </v-card-title>
            <v-card-subtitle class="font-weight-bold"
              >Conduce :
            </v-card-subtitle>

            <v-card-text class="font-weight-light">
              {{ item.NombreTipoVehiculo }}
            </v-card-text>

            <v-container>
              <v-row>
                <v-col cols="6" md="6">
                  <v-card elevation="1" shaped color="purple" min-width="70px">
                    <v-card-subtitle class="white--text font-weight-medium">
                      Alertas
                    </v-card-subtitle>
                  </v-card>
                </v-col>
                <v-col cols="6" md="6">
                  <v-card
                    elevation="1"
                    shaped
                    min-width="100px"
                    v-if="tempVector[0] >= 1"
                  >
                    <v-card-subtitle
                      v-if="tempVector[0] == 1"
                      class="lime font-weight-medium"
                    >
                      Total : {{ tempVector[0] }}
                    </v-card-subtitle>
                    <v-card-subtitle
                      v-else-if="tempVector[0] == 2"
                      class="amber font-weight-medium"
                    >
                      Total : {{ tempVector[0] }}
                    </v-card-subtitle>
                    <v-card-subtitle
                      v-else-if="tempVector[0] == 3"
                      class="orange font-weight-medium"
                    >
                      Total : {{ tempVector[0] }}
                    </v-card-subtitle>
                    <v-card-subtitle
                      v-else
                      class="red white--text font-weight-medium"
                    >
                      Total : {{ tempVector[0] }}
                    </v-card-subtitle>
                  </v-card>
                </v-col>
                <v-col cols="12" v-for="item in items" :key="item">
                  <v-card elevation="1" color="grey darken-2" min-width="140px">
                    <v-card-subtitle
                      v-if="tempVector[item.pos] == 0"
                      class="white--text font-weight-medium"
                    >
                      {{ item.title }} {{ tempVector[item.pos] }}
                    </v-card-subtitle>
                    <v-card-subtitle
                      v-else-if="tempVector[item.pos] == 1"
                      class="lime font-weight-medium"
                    >
                      {{ item.title }}{{ tempVector[item.pos] }}
                    </v-card-subtitle>
                    <v-card-subtitle
                      v-else-if="tempVector[item.pos] == 2"
                      class="amber font-weight-medium"
                    >
                      {{ item.title }} {{ tempVector[item.pos] }}
                    </v-card-subtitle>
                    <v-card-subtitle
                      v-else-if="tempVector[item.pos] == 3"
                      class="orange font-weight-medium"
                    >
                      {{ item.title }} {{ tempVector[item.pos] }}
                    </v-card-subtitle>
                    <v-card-subtitle
                      v-else
                      class="red white--text font-weight-medium"
                    >
                      {{ item.title }} {{ tempVector[item.pos] }}
                    </v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <v-card elevation="1" color="grey darken-2">
              <v-card-subtitle class="white--text font-weight-medium">
                Velocidad actual : {{ item.VelocidadActual }} km/h
              </v-card-subtitle>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "app",

  data() {
    return {
      tempVector: [0, 0, 0, 0],
      infoData: [null],
      items: [
        { title: "Fatiga : ", pos: 1 },
        { title: "Distraccion : ", pos: 2 },
        { title: "Velocidad : ", pos: 3 },
      ],
    };
  },
  mounted() {
    this.submit();
    setInterval(() => {
      this.submit();
    }, 20000);
  },
  methods: {
    calculate(alarms) {
      for (let i = 0; i < 4; i++) {
        this.tempVector[i] = 0;
      }

      if (alarms != null) {
        for (let i = 0; i < alarms.length; i++) {
          if (alarms[i].IdTipoEvento == 5) {
            this.tempVector[1] += alarms[i].Cantidad;
          }
          if (alarms[i].IdTipoEvento == 6) {
            this.tempVector[2] += alarms[i].Cantidad;
          }
          if (alarms[i].IdTipoEvento == 7) {
            this.tempVector[3] += alarms[i].Cantidad;
          }
          this.tempVector[0] += alarms[i].Cantidad;
        }
      }
    },

    size(info) {
      let resul = 0;
      if (info != null) {
        resul = info.length;
      }
      return resul;
    },
    submit() {
      const headersDatos = {
        Authorization: "Basic UEYyMDIwOlBGMjAyMEFQSXYx",
      };

      axios({
        method: "GET",
        headers: headersDatos,
        url: "http://54.80.18.229:8123/api/Estadisticas/getEstadoActual",
      })
        .then((response) => {
          console.log(response);
          this.infoData = response.data.Datos;
        })

        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

