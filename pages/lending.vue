<template>
  <v-container class="lending_request">
    <div v-if="lendingForm" class="lending_request__wrapper">
      <h1
        class="ulending-title primary--text text-left text-sm-center text-md-left font-weight-bold"
      >
        Solo algunos datos mas.
      </h1>

      <v-row
        class="lending_request__wrapper__banner align-center justify-space-between elevation-1"
      >
        <div class="d-flex flex-column align-center justify-center">
          <b>Solicitud</b>
          <span class="primary--text"> {{ lendingForm.amount | toCOP }} </span>
        </div>

        <div class="d-flex flex-column align-center justify-center">
          <b>Plazo</b>
          <span class="primary--text"> {{ lendingForm.termLimit }} meses</span>
        </div>
      </v-row>

      <v-form
        ref="lendingForm"
        v-model="formValid"
        class="landing__form mt-10"
        @submit.prevent="request"
      >
        <v-stepper v-model="lendingFormStep" vertical>
          <v-stepper-step step="1" complete editable>
            Información personal
            <small
              >Necesitamos algunos datos tuyos,te recomendamos ser 100% sincero
              para que tu proceso de estudio sea lo mas acertado posible</small
            >
          </v-stepper-step>

          <v-stepper-content step="1">
            <div class="mb-12">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="lendingForm.name"
                    label="Nombres"
                    name="name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="lendingForm.lastName"
                    label="Apellidos"
                    name="lastName"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="lendingForm.email"
                    label="E-mail"
                    type="email"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    v-model="lendingForm.idType"
                    :items="templateModels.idType"
                    label="Tipo de identificación"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="lendingForm.id"
                    v-only-numbers
                    type="tel"
                    label="Numero de identificación"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="lendingForm.email"
                    label="E-mail"
                    type="email"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    v-model="lendingForm.genre"
                    :items="templateModels.genre"
                    label="Genero"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    v-model="lendingForm.maritalStatus"
                    :items="templateModels.maritalStatus"
                    label="Estado civil"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="lendingForm.tel"
                    v-only-numbers
                    type="tel"
                    label="Telefono fijo"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="lendingForm.mobile"
                    v-only-numbers
                    type="tel"
                    prefix="+57"
                    label="Celular"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="lendingForm.altMobile"
                    v-only-numbers
                    type="tel"
                    prefix="+57"
                    label="Celular alternativo"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <v-btn color="primary" @click="lendingFormStep = 2"
              >Continuar</v-btn
            >
          </v-stepper-content>

          <v-stepper-step step="2" complete editable
            >Localización
            <small>Cuentanos donde vives</small>
          </v-stepper-step>

          <v-stepper-content step="2">
            <div class="mb-12">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="lendingForm.state"
                    :items="statesMapped"
                    label="Departamento"
                    clearable
                    @change="selectCity($event)"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    v-model="lendingForm.city"
                    :items="cities"
                    label="Ciudad"
                    clearable
                    :disabled="!lendingForm.state"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="lendingForm.address"
                    label="Dirección"
                    name="address"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="lendingForm.extraAddress"
                    label="Adicional: Urbanizacion - Aprtamento - Oficina"
                    name="extra-address"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <v-btn color="primary" @click="lendingFormStep = 3"
              >Continuar</v-btn
            >
            <v-btn text @click="lendingFormStep = 1">Volver</v-btn>
          </v-stepper-content>

          <v-stepper-step step="3">
            Información adicional
            <small>Solo algo de información adicional</small>
          </v-stepper-step>

          <v-stepper-content step="3" editable>
            <div class="mb-12">
              <v-row>
                <v-col cols="12">
                  <label>Estrato social</label>
                  <v-radio-group v-model="lendingForm.status" row>
                    <v-col cols="6">
                      <v-radio
                        label="1"
                        class="col-12 col-sm-2"
                        value="1"
                      ></v-radio>
                      <v-radio
                        label="2"
                        class="col-12 col-sm-2"
                        value="2"
                      ></v-radio>
                      <v-radio
                        label="3"
                        class="col-12 col-sm-2"
                        value="3"
                      ></v-radio>
                    </v-col>
                    <v-col cols="6">
                      <v-radio
                        label="4"
                        class="col-12 col-sm-2"
                        value="4"
                      ></v-radio>
                      <v-radio
                        label="5"
                        class="col-12 col-sm-2"
                        value="5"
                      ></v-radio>
                      <v-radio
                        label="6"
                        class="col-12 col-sm-2"
                        value="6"
                      ></v-radio>
                    </v-col>
                  </v-radio-group>
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="lendingForm.houseType"
                    :items="templateModels.houseType"
                    label="Tipo de vivienda"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <label>Cuantas personas dependen de tí?</label>
                  <v-radio-group v-model="lendingForm.dependents" row>
                    <v-col cols="6">
                      <v-radio
                        label="1"
                        class="col-12 col-sm-2"
                        value="1"
                      ></v-radio>
                      <v-radio
                        label="2"
                        class="col-12 col-sm-2"
                        value="2"
                      ></v-radio>
                      <v-radio
                        label="3"
                        class="col-12 col-sm-2"
                        value="3"
                      ></v-radio>
                    </v-col>
                    <v-col cols="6">
                      <v-radio
                        label="4"
                        class="col-12 col-sm-2"
                        value="4"
                      ></v-radio>
                      <v-radio
                        label="5"
                        class="col-12 col-sm-2"
                        value="5"
                      ></v-radio>
                      <v-radio
                        label="6+"
                        class="col-12 col-sm-2"
                        value="6+"
                      ></v-radio>
                    </v-col>
                  </v-radio-group>
                </v-col>
              </v-row>
            </div>
            <v-btn color="primary">Solicitar</v-btn>
            <v-btn text @click="lendingFormStep = 2">Volver</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-form>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import axios from 'axios';

interface State {
  region: string;
  // eslint-disable-next-line camelcase
  c_digo_dane_del_departamento: string;
  departamento: string;
  // eslint-disable-next-line camelcase
  c_digo_dane_del_municipio: string;
  municipio: string;
}

interface AsyncData {
  states: State[];
  statesMapped: string[];
}

interface LendingData {
  states: State[];
  statesMapped: string[];
  cities: string[];
  formValid: boolean;
  lendingFormStep: number;
  lendingForm: any;
  templateModels: any;
}

export default Vue.extend({
  name: 'Lending',
  async asyncData(): Promise<AsyncData> {
    const { data } = await axios.get<State[]>(
      `https://www.datos.gov.co/resource/xdk5-pm3f.json`
    );

    return {
      states: data,
      statesMapped: [...new Set(data.map((d) => d.departamento))]
    };
  },
  data(): LendingData {
    return {
      states: [],
      statesMapped: [],
      cities: [],
      formValid: false,
      lendingFormStep: 1,
      lendingForm: { ...this.$store.state.lendings.lending },
      templateModels: {
        idType: ['Cédula de ciudadania', 'Cédula extranjera'],
        genre: ['Masculino', 'Femenino', 'No especifica'],
        maritalStatus: [
          'Casado',
          'Soltero',
          'Union libre',
          'Viudo',
          'Divorciado'
        ],
        houseType: ['Arrendada', 'Familiar', 'Propia']
      }
    };
  },
  methods: {
    selectCity(event: any) {
      if (event) {
        this.cities = [
          ...new Set(
            this.states
              .filter(
                (s: State) =>
                  s.departamento.toLowerCase() === event.toLowerCase()
              )
              .map((d: State) => d.municipio)
          )
        ];
      } else {
        this.lendingForm.city = null;
      }
    }
  },
  head() {
    return {
      title: 'Solicitud'
    };
  }
});
</script>
<style scoped lang="scss">
@import '~vuetify/src/styles/styles.sass';

.lending_request {
  &__wrapper {
    &__banner {
      top: $navbar-height;
      margin-left: -12px;
      margin-right: -12px;
      padding: 1rem;
      border-bottom: 1px solid var(--v-primary-base);
      position: sticky;
      z-index: 999;
      background-color: white;
    }
  }
}
</style>
