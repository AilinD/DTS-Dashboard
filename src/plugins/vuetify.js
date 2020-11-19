import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#7f77ff',
        secondary: '#b9abeb',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#adff6e',
        warning: '#FFC107'
      },
    },
  },
});
