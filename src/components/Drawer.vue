<template>
  <v-app>
    <v-navigation-drawer
      class="primary"
      v-model="drawer"
      dark
      permanent
      width="240"
      app
    >
      <v-list-item class="mt-4 mb-2">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="title">
            Dashboard
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.path"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout">
            Cerrar sesión
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  name: "Drawer",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Estadísticas", icon: "mdi-chart-bar", path: "/estadisticas" },
        { title: "Conductores", icon: "mdi-car", path: "/conductores" },
        {
          title: "Viajes activos",
          icon: "mdi-car-connected",
          path: "/viajesactivos"
        }
      ]
    };
  },
  methods: {
    logout() {
      this.$router.push("/");
    }
  }
};
</script>
