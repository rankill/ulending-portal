<template>
  <v-container class="lending_request">
    <h1
      class="ulending-title primary--text text-left text-sm-center text-md-left font-weight-bold"
    >
      Solo algunos datos mas.
    </h1>
    <v-row v-if="lendingForm" class="lending_request__wrapper">
      <v-col
        class="lending_request__wrapper__side col-12 col-md-4"
        :class="{
          stick_banner: $vuetify.breakpoint.smAndDown
        }"
      >
        <v-row
          class="lending_request__wrapper__summary lending_request__wrapper__summary--space-top  align-center flex-column d-flex"
          :class="{
            'stick_banner stick_banner--m1': $vuetify.breakpoint.mdAndUp
          }"
        >
          <Summary
            class="elevation-2 "
            :amount="lendingForm.amount"
            :term-limit="lendingForm.termLimit"
            :is-complete="formValid"
            :row="!$vuetify.breakpoint.smAndDown"
          />

          <v-btn
            color="primary"
            :class="{
              lending_request__wrapper__summary__fixed_btn:
                $vuetify.breakpoint.smAndDown
            }"
            class="mt-3"
            :disabled="!formValid"
            :loading="uploadingForm"
            block
            @click="request"
          >
            Solicitar
          </v-btn>
        </v-row>
      </v-col>

      <v-col class="lending_request__wrapper__side col-12 col-md-8">
        <v-form
          ref="lendingForm"
          v-model="formValid"
          class="lending_request__form"
          @submit.prevent="request"
        >
          <v-stepper v-model="lendingFormStep" vertical>
            <v-stepper-step
              step="1"
              :complete="isPersonalFormComplete"
              editable
            >
              Información personal
              <small
                >Necesitamos algunos datos tuyos,te recomendamos ser 100%
                sincero para que tu proceso de estudio sea lo mas acertado
                posible</small
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
                      :rules="rules.required"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="lendingForm.lastName"
                      label="Apellidos"
                      name="lastName"
                      :rules="rules.required"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="lendingForm.email"
                      label="E-mail"
                      type="email"
                      :rules="rules.emailRules"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-select
                      v-model="lendingForm.genre"
                      :items="templateModels.genre"
                      label="Genero"
                      :rules="rules.required"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-select
                      v-model="lendingForm.maritalStatus"
                      :items="templateModels.maritalStatus"
                      label="Estado civil"
                      :rules="rules.required"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-select
                      v-model="lendingForm.idType"
                      :items="templateModels.idType"
                      label="Tipo de identificación"
                      :rules="rules.required"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="lendingForm.id"
                      v-only-numbers
                      type="tel"
                      label="Numero de identificación"
                      :rules="rules.required"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-menu
                      ref="birthMenu"
                      v-model="birthDateMenu"
                      :close-on-content-click="false"
                      :return-value.sync="lendingForm.birthDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="lendingForm.birthDate"
                          label="Cuando cumples años?"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="lendingForm.birthDate"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="birthMenu = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.birthMenu.save(lendingForm.birthDate)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="lendingForm.tel"
                      v-only-numbers
                      type="tel"
                      label="Telefono fijo"
                      :rules="rules.required"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="lendingForm.mobile"
                      v-only-numbers
                      type="tel"
                      prefix="+57"
                      label="Celular"
                      :rules="rules.required"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="lendingForm.altMobile"
                      v-only-numbers
                      type="tel"
                      prefix="+57"
                      label="Celular alternativo"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <label>Estrato social</label>
                    <v-radio-group
                      v-model="lendingForm.status"
                      row
                      :rules="rules.required"
                    >
                      <v-radio label="1" class="col-2" value="1"></v-radio>
                      <v-radio label="2" class="col-2" value="2"></v-radio>
                      <v-radio label="3" class="col-2" value="3"></v-radio>
                      <v-radio label="4" class="col-2" value="4"></v-radio>
                      <v-radio label="5" class="col-2" value="5"></v-radio>
                      <v-radio label="6" class="col-2" value="6"></v-radio>
                    </v-radio-group>
                  </v-col>

                  <v-col cols="12">
                    <label>Cuantas personas dependen de tí?</label>
                    <v-radio-group
                      v-model="lendingForm.dependents"
                      row
                      :rules="rules.required"
                    >
                      <v-radio label="1" class="col-2" value="1"></v-radio>
                      <v-radio label="2" class="col-2" value="2"></v-radio>
                      <v-radio label="3" class="col-2" value="3"></v-radio>
                      <v-radio label="4" class="col-2" value="4"></v-radio>
                      <v-radio label="5" class="col-2" value="5"></v-radio>
                      <v-radio label="6+" class="col-2" value="6+"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </div>

              <v-btn color="primary" @click="lendingFormStep = 2" class="mb-5"
                >Continuar</v-btn
              >
            </v-stepper-content>

            <v-stepper-step
              step="2"
              :complete="isLocalizationFormComplete"
              editable
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
                      :rules="rules.required"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="lendingForm.city"
                      :items="cities"
                      label="Ciudad"
                      clearable
                      :disabled="!lendingForm.state"
                      :rules="rules.required"
                    ></v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-select
                      v-model="lendingForm.houseType"
                      :items="templateModels.houseType"
                      label="Tipo de vivienda"
                      :rules="rules.required"
                    ></v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="lendingForm.address"
                      label="Dirección"
                      name="address"
                      :rules="rules.required"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="lendingForm.extraAddress"
                      label="Adicional: Urbanizacion - Aprtamento - Oficina"
                      name="extra-address"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>

              <v-btn outlined color="primary" @click="lendingFormStep = 1"
                >Volver</v-btn
              >
            </v-stepper-content>
          </v-stepper>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import axios from 'axios';
import Summary from '~/components/summary.vue';

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
  birthDateMenu: boolean;
  lendingFormStep: number;
  lendingForm: any;
  templateModels: any;
  rules: any;
  uploadingForm: boolean;
}

const formKeys = {
  personalForm: [
    'name',
    'lastName',
    'idType',
    'id',
    'birthDate',
    'genre',
    'maritalStatus',
    'tel',
    'mobile',
    'status',
    'dependents'
  ],
  localizationForm: ['state', 'city', 'houseType', 'address']
};

export default Vue.extend({
  name: 'Lending',
  components: {
    Summary
  },
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
      uploadingForm: false,
      lendingFormStep: 1,
      birthDateMenu: false,
      lendingForm: {},
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
      },
      rules: {
        required: [(v: any) => !!v || 'Este campo es requerido'],
        emailRules: [
          (v: any) => !!v || 'Este campo es requerido',
          (v: any) =>
            /.+@.+\..+/.test(v) ||
            'El formato de correo no es válido (mail@domain.com)'
        ]
      }
    };
  },
  computed: {
    isPersonalFormComplete(): boolean {
      return this.isComplete(formKeys.personalForm);
    },
    isLocalizationFormComplete(): boolean {
      return this.isComplete(formKeys.localizationForm);
    }
  },
  watch: {
    'lendingForm.state'(newValue: string) {
      if (newValue) {
        this.cities = [
          ...new Set(
            this.states
              .filter(
                (s: State) =>
                  s.departamento.toLowerCase() === newValue.toLowerCase()
              )
              .map((d: State) => d.municipio)
          )
        ];
      } else {
        this.lendingForm.city = null;
      }
    }
  },
  beforeCreate() {
    const storeLending = this.$store.state.lendings.lending;
    !storeLending && this.$router.push({ name: 'index' });
  },
  mounted() {
    const storeLending = this.$store.state.lendings.lending;
    this.lendingForm = storeLending ? { ...storeLending } : {};
  },
  methods: {
    isComplete(list: string[]) {
      return list.every(
        (key: string) =>
          this.lendingForm[key] != null && this.lendingForm[key] !== ''
      );
    },
    async request() {
      if (this.formValid) {
        try {
          this.uploadingForm = false;
          await this.$store.dispatch('lendings/sendEmail', this.lendingForm);
          console.log('Email sent');
          this.uploadingForm = false;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
          this.uploadingForm = false;
        }
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
  .stick_banner {
    top: $navbar-height;
    position: sticky;
    z-index: 999;
    padding: 0;

    &--m1 {
      top: calc(
        #{$navbar-height} + 1rem
      ) !important; // To Override stick banner top
    }
  }

  &__wrapper {
    &__summary {
      margin-left: -12px;
      margin-right: -12px;

      &__fixed_btn {
        position: fixed;
        bottom: 0;
      }
    }
  }
}
</style>
