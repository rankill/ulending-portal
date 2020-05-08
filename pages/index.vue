<template>
  <div class="landing primary">
    <v-container class="landing__container">
      <div class="landing__main primary white--text center pr-3 pl-3">
        <h1
          class="ulending-title dark text-left text-sm-center text-md-left font-weight-bold"
        >
          Un Préstamo para tu futuro.
        </h1>
        <h3
          class="text-left font-weight-light theme--dark v-label mt-0 mt-sm-10 mt-md-3"
        >
          Financiamos tu matrícula y sostenimiento durante el periodo académico
        </h3>

        <v-form
          ref="lendingForm"
          v-model="formValid"
          class="landing__form mt-10"
          @submit.prevent="request"
        >
          <div class="landing__form__type">
            <p><b>Comencemos por seleccionar el tipo de préstamo</b></p>
            <v-radio-group v-model="lendingForm.type" row dark>
              <v-radio label="Matricula" value="ENROLLMENT"></v-radio>
              <v-spacer class="d-sm-none" />
              <v-radio
                class="ml-sm-10"
                label="Sostenimiento"
                value="SUSTENANCE"
              ></v-radio>
            </v-radio-group>
          </div>

          <v-divider class="mb-10" dark></v-divider>

          <div class="landing__form__amount">
            <div v-if="lendingForm.type === 'ENROLLMENT'">
              <p><b>Cuanto dinero necesitas?</b></p>

              <v-slider
                v-model="lendingForm.amount"
                dark
                min="300000"
                max="10000000"
                step="50000"
              >
                <template v-slot:prepend>
                  <p>$300.000</p>
                </template>

                <template v-slot:append>
                  <p>$10'000.000</p>
                </template>
              </v-slider>

              <v-text-field
                v-model="lendingForm.amount"
                v-only-numbers
                label="Monto"
                prefix="$"
                outlined
                type="tel"
                dark
                :rules="rules.amount"
                required
              ></v-text-field>
            </div>
            <div v-else>
              <p>
                <b
                  >Cuanto te cuesta tu sostenimiento durante el periodo
                  académico?</b
                >
              </p>

              <div>
                <v-text-field
                  v-model="lendingForm.entries.transport"
                  v-only-numbers
                  dark
                  prefix="$"
                  outlined
                  label="Transporte"
                  type="tel"
                  :rules="rules.required"
                  @focus="$event.target.select()"
                ></v-text-field>

                <v-text-field
                  v-model="lendingForm.entries.schoolSupplies"
                  v-only-numbers
                  dark
                  prefix="$"
                  outlined
                  label="Salidas Académicas"
                  type="tel"
                  :rules="rules.required"
                  @focus="$event.target.select()"
                ></v-text-field>

                <v-text-field
                  v-model="lendingForm.entries.feeding"
                  v-only-numbers
                  dark
                  prefix="$"
                  outlined
                  label="Alimentación"
                  type="tel"
                  :rules="rules.required"
                  @focus="$event.target.select()"
                ></v-text-field>

                <v-text-field
                  v-model="lendingForm.entries.rent"
                  v-only-numbers
                  dark
                  prefix="$"
                  outlined
                  label="Renta (Opcional)"
                  type="tel"
                  @focus="$event.target.select()"
                ></v-text-field>

                <v-text-field
                  v-model="lendingForm.entries.academicOutings"
                  v-only-numbers
                  dark
                  prefix="$"
                  outlined
                  label="Salidas académicas"
                  type="tel"
                  :rules="rules.required"
                  @focus="$event.target.select()"
                ></v-text-field>

                <v-text-field
                  v-model="lendingForm.entries.other"
                  v-only-numbers
                  dark
                  prefix="$"
                  outlined
                  label="Otros (Opcional)"
                  type="tel"
                  @focus="$event.target.select()"
                ></v-text-field>

                <v-chip
                  class="landing__form__amount__chip mt-2 d-flex justify-center"
                  color="white"
                  text-color="primary"
                >
                  <v-avatar left>
                    <v-icon>mdi-currency-usd</v-icon>
                  </v-avatar>
                  {{ computedAmount | toCOP }}
                </v-chip>
              </div>
            </div>
          </div>

          <v-divider class="mb-8" dark></v-divider>

          <div class="landing__form__term">
            <p class="mb-10"><b>En cuanto meses deseas pagarlo?</b></p>

            <v-slider
              v-model="lendingForm.termLimit"
              dark
              step="1"
              min="3"
              max="12"
              thumb-label="always"
              thumb-color="white"
              ticks
            >
              <template v-slot:thumb-label="{ value }">
                <span class="primary--text">{{ value }}</span>
              </template>
            </v-slider>
          </div>

          <v-flex
            v-if="!validAmountEnrollment"
            class="d-flex text-white justify-center mb-5"
          >
            <v-icon class="mr-5">mdi-alert</v-icon>
            <small
              >La suma de los rubros debe ser mayor o igual a $300.000 y menor o
              igual a $10.000.000</small
            >
          </v-flex>
          <v-btn
            block
            class="primary--text"
            type="submit"
            :disabled="!formValid || !validAmountEnrollment"
            >Solicitar</v-btn
          >

          <v-snackbar v-model="errorMsg">
            El monto seleccionado no es valido
            <v-btn color="white" text @click="errorMsg = null">
              Cerrar
            </v-btn>
          </v-snackbar>
        </v-form>

        <div class="landing__main__accounting" :class="{close: !accountingMenuOpen}">
          <v-btn
            fab
            outlined
            color="primary"
            @click="accountingMenuOpen = !accountingMenuOpen"
          >
            <v-icon>{{
              accountingMenuOpen ? 'mdi-close' : 'mdi-format-list-bulleted'
            }}</v-icon>
          </v-btn>

          <Accounting
            v-if="accountingMenuOpen"
            :amount="+lendingForm.amount"
            :term-limit="+lendingForm.termLimit"
          />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Accounting from '~/components/accounting.vue';

interface Lending {
  amount: number;
  termLimit: number;
  type: string;
  entries?: any;
  name: string;
  lastName: string;
  id: number;
  idType: GenericType;
  mobile: number;
  altMobile?: number;
  email: string;
  birthDate: string;
  genre: GenericType;
  maritalStatus: GenericType;
  state: GenericType;
  city: GenericType;
  address: GenericType;
  tel: number;
  socialStratum: GenericType;
  houseType: GenericType;
  dependents: number;
  contactType: string;
}

interface GenericType {
  id: number;
  description: string;
}

interface IndexData {
  formValid: false;
  errorMsg: null | string;
  rules: any;
  lendingForm: any;
  templateModels: any;
  accountingMenuOpen: boolean;
}

export default Vue.extend({
  name: 'Index',
  components: {
    Accounting
  },
  data(): IndexData {
    return {
      formValid: false,
      errorMsg: null,
      rules: {
        required: [
          (value: any) => value === 0 || !!value || 'Este campo es requerido'
        ],
        amount: [
          (value: any) => value === 0 || !!value || 'Debes agregar un monto',
          (value: any) =>
            (value >= 300000 && value <= 10000000) ||
            "El monto no puede ser menor a $300.000 ni mayor a $10'000.000"
        ]
      },
      lendingForm: {
        entries: {
          transport: 0,
          schoolSupplies: 0,
          feeding: 0,
          rent: 0,
          academicOutings: 0,
          other: 0
        },
        type: 'ENROLLMENT',
        amount: 300000,
        termLimit: 3
      },
      templateModels: {
        amount: {
          min: 300000,
          max: 10000000
        },
        termLimit: {
          min: 3,
          max: 12
        }
      },
      accountingMenuOpen: false
    };
  },
  computed: {
    computedAmount(): number {
      return Object.values(this.lendingForm.entries).reduce(
        (t: any, newVal: any) => Number(t) + Number(newVal),
        0
      ) as number;
    },
    validAmountEnrollment(): boolean {
      return this.lendingForm.type === 'ENROLLMENT'
        ? true
        : this.computedAmount >= this.templateModels.amount.min &&
            this.computedAmount <= this.templateModels.amount.max;
    }
  },
  methods: {
    request() {
      if (this.formValid) {
        this.lendingForm.amount =
          this.lendingForm.type !== 'ENROLLMENT'
            ? this.computedAmount
            : this.lendingForm.amount;

        if (this.lendingForm.amount > 0) {
          this.$store
            .dispatch('lendings/updateLending', this.lendingForm)
            .then(() => {
              this.$router.push({ name: 'lending' });
            })
            .catch(() => {
              this.errorMsg =
                'La solicitud no pudo ser iniciada, intenta nuevamente mas tarde';
            });
        } else {
          this.errorMsg = 'El monto agregado no es valido';
        }
      }
    }
  },
  head() {
    return {
      title: 'Bienvenido'
    };
  }
});
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/styles.sass';

.landing {
  padding-top: 0;

  &__container {
    padding-top: 2rem;

    @media #{map-get($display-breakpoints, 'md-and-up')} {
      padding-top: 4rem;
      max-width: 60rem;
    }
  }

  &__main {
    .ulending-title {
      margin-bottom: 0.1rem;
      padding: 0;
      font-size: $sm-size-title;
      line-height: $sm-size-title;

      @media #{map-get($display-breakpoints, 'sm-and-up')} {
        font-size: $md-size-title;
        line-height: $md-size-title;
      }

      @media #{map-get($display-breakpoints, 'md-and-up')} {
        font-size: $lg-size-title;
        line-height: $lg-size-title;
      }
    }

    &__accounting {
      position: fixed;
      bottom: 1rem;
      display: flex;
      right: 2rem;
      z-index: 2;

      width: 16rem;
      height: 16rem;
      overflow: hidden;

      transition: all 400ms ease;

      ::v-deep .v-card {
        &__title,
        &__text {
          opacity: 1;
          transition: all 400ms ease;
        }
      }

      &.close {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;

        ::v-deep .v-card {
          &__title,
          &__text {
            opacity: 0;
          }
        }
      }
    }
  }

  &__form {
    color: white;

    ::v-deep .error--text {
      color: #272727 !important; // Important to override default red nuxt errors
      caret-color: #dd2c00 !important;
    }

    .v-radio {
      .theme--dark {
        &.v-icon,
        &.v-label {
          color: white;
        }
      }
    }

    &__amount {
      .v-input {
        &__slider {
          position: relative;
          margin-bottom: 2em;

          .v-input__append-outer,
          .v-input__prepend-outer {
            position: absolute;
            bottom: -1em;
          }
          .v-input__append-outer {
            right: 0;
          }
        }
      }

      &__chip {
        position: sticky;
        bottom: 0;
      }
    }
  }
}
</style>
