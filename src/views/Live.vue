<template>
  <v-app>
    <v-row>
      <div class="ml-3">
        <drawer />
      </div>

      <v-col class="pt-0" contain>
        <real-time />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Drawer from "../components/Drawer.vue";
import RealTime from "../components/RealTime.vue";
export default {
  components: {
    Drawer,
    RealTime
  }
};
</script>
