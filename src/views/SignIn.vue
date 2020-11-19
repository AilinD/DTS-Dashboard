<template>
  <v-app>
    <v-img src="@/assets/fondito.jpg" aspect-ratio="10">
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text>
                        <h1 class="display-1 ml-5">Inicio de sesión</h1>
                        <v-form>
                          <v-text-field
                            class="ml-5 mr-5 mt-5"
                            label="Email"
                            v-model="email"
                            :error-messages="emailErrors"
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
                            prepend-icon="mdi-account-circle-outline"
                            type="text"
                          />
                          <v-text-field
                            class="ml-5 mr-5 mt-3"
                            id="password"
                            label="Contraseña"
                            v-model="password"
                            :error-messages="passwordLoginErrors"
                            @input="$v.password.$touch()"
                            @blur="$v.password.$touch()"
                            prepend-icon="mdi-lock-outline"
                            type="password"
                          />
                        </v-form>
                        <h3 class=" subtitle-2 ml-13 primary--text">
                          ¿Olvidaste tu contraseña?
                        </h3>
                      </v-card-text>
                      <div class="text-center mt-5 mb-5">
                        <v-btn
                          color="primary"
                          class="elevation-5"
                          @click="submit"
                          >Iniciar sesion</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      class="primary d-flex flex-column justify-space-between"
                    >
                      <v-card-text class="mt-5">
                        <h1 class="text-center display-1 white--text">
                          ¿Todavía no tenés una cuenta?
                        </h1>
                      </v-card-text>
                      <div class="text-center mb-5">
                        <v-btn
                          color="white"
                          class="elevation-5 primary--text"
                          dark
                          @click="step++"
                          >Registrarse</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row>
                    <v-col
                      cols="12"
                      md="4"
                      class="primary d-flex flex-column justify-space-between"
                    >
                      <v-card-text class=" mt-5">
                        <h1 class="text-center display-1 white--text">
                          ¿Ya tenés una cuenta?
                        </h1>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn
                          color="white"
                          class="elevation-5 primary--text mb-5"
                          @click="step--"
                          >Iniciar sesión</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text>
                        <h1 class="display-1 mt-5 ml-5">Registro</h1>
                        <v-form>
                          <v-text-field
                            class="ml-5 mr-5 mt-5"
                            label="Dirección de mail"
                            v-model="email"
                            :error-messages="emailErrors"
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
                            prepend-icon="mdi-email-outline"
                            type="text"
                          />
                          <v-text-field
                            class="ml-5 mr-5 mt-1"
                            label="Nombre"
                            v-model="name"
                            :error-messages="nameErrors"
                            @input="$v.name.$touch()"
                            @blur="$v.name.$touch()"
                            prepend-icon="mdi-account-circle-outline"
                            type="text"
                          />
                          <v-text-field
                            class="ml-5 mr-5 mt-1"
                            id="password"
                            label="Contraseña"
                            v-model="password"
                            :error-messages="passwordErrors"
                            @input="$v.password.$touch()"
                            @blur="$v.password.$touch()"
                            prepend-icon="mdi-lock-outline"
                            type="password"
                          />
                          <v-text-field
                            class="ml-5 mr-5 mt-1"
                            id="password2"
                            label="Confirmar contraseña"
                            v-model="password2"
                            :error-messages="password2Errors"
                            @input="$v.password2.$touch()"
                            @blur="$v.password2.$touch()"
                            prepend-icon="mdi-lock-outline"
                            type="password"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-1 mb-5">
                        <v-btn
                          color="primary"
                          class="elevation-5"
                          @click="submitForm"
                          dark
                          >Registrarse</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </v-app>
</template>

<script>
import axios from "axios";
import CryptoJS from "crypto-js";
import { required, sameAs, minLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      step: 1,
      email: "",
      name: "",
      password: "",
      password2: "",
      edit: true,
      submitStatus: null
    };
  },
  validations: {
    email: {
      required,
      email
    },
    name: {
      required
    },
    password: {
      required,
      minLength: minLength(8),
      strongPassword(password) {
        return (
          /[a-z]/.test(password) &&
          /[0-9]/.test(password) &&
          /[A-Z]/.test(password)
        );
      }
    },
    password2: {
      required,
      sameAsPassword: sameAs("password")
    }
  },

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Signin";
        case 2:
          return "Signup";
      }
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("El campo nombre es obligatorio.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("El e-mail debe ser valido");
      !this.$v.email.required && errors.push("El campo e-mail es obligatorio.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required &&
        errors.push("El campo contraseña es obligatorio.");
      !this.$v.password.minLength &&
        errors.push("El campo contraseña debe tener al menos 8 caracteres");
      !this.$v.password.strongPassword &&
        errors.push(
          "El campo contraseña debe tener al menos un número, una mayúscula y una minúscula"
        );

      return errors;
    },
    password2Errors() {
      const errors = [];
      if (!this.$v.password2.$dirty) return errors;
      !this.$v.password2.required &&
        errors.push("El campo contraseña es obligatorio.");
      !this.$v.password2.sameAsPassword &&
        errors.push("Las contraseñas deben coincidir.");
      return errors;
    },
    passwordLoginErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required &&
        errors.push("El campo contrasena es obligatorio.");
      return errors;
    }
  },

  methods: {
    submit() {
      const passwordHashed = CryptoJS.MD5(this.password)
        .toString()
        .toUpperCase();
      const headersDatos = {
        Authorization: "Basic UEYyMDIwOlBGMjAyMEFQSXYx",
        email: this.email,
        hashedPassword: passwordHashed
      };
      this.$v.$touch();

      axios({
        method: "GET",
        headers: headersDatos,
        url: "http://54.80.18.229:8123/api/Usuarios/GetByEmailAndPassword"
      })
        .then((response) => {
          console.log(response);
          if (response.data.Estado == "OK") {
            this.$router.push("/estadisticas");
          } else {
            alert("E-mail o contraseña inválidos");
          }
        })

        .catch((error) => {
          console.log(error);
        });
    },

    submitForm() {
      const passwordHashed = CryptoJS.MD5(this.password)
        .toString()
        .toUpperCase();
      const headersDatos = {
        Authorization: "Basic UEYyMDIwOlBGMjAyMEFQSXYx",
        email: this.email,
        hashedPassword: passwordHashed,
        nombre: this.name,
        puedeEditar: this.edit
      };

      axios({
        method: "POST",
        headers: headersDatos,
        url: "http://54.80.18.229:8123/api/Usuarios/Registrar"
      })
        .then((response) => {
          console.log(response);
          if (response.data.Estado == "OK") {
            this.$router.push("/estadisticas");
          }
        })

        .catch((error) => {
          console.log(error);
        });
    },
    clear() {
      this.$v.$reset();
      this.email = "";
      this.name = "";
      this.password = "";
      this.password2 = "";

      console.log("limpio");
    }
  }
};
</script>
