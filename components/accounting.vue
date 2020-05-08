<template>
  <v-card>
    <v-card-title class="headline">Simular tu cuentas?</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>Monto: {{ amount | toCOP }}</v-row>
        <v-row>Monto total: {{ totalAmount | toCOP }}</v-row>
        <v-row>Interes total: {{ totalRate | toCOP }}</v-row>
        <v-row>Tecnologia: {{ tech | toCOP }}</v-row>
        <v-row>Aval: {{ endorsementVal | toCOP }}</v-row>
        <v-row>Mensual: {{ monthlyPayVal | toCOP }}</v-row>
      </v-container>
    </v-card-text>
    <v-card-actions v-if="showActions">
      <v-spacer></v-spacer>
      <v-btn color="primary darken-1" @click="$emit('on-click')">
        {{ actionText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Vue } from 'vue-property-decorator';

const TECH = 15000;
const ENDORSEMENT = 0.035; // (AMOUNT * ENDORSEMENT) / TERMLIMIT
const RATE = 0.02;

export default Vue.extend({
  name: 'Accounting',
  props: {
    amount: {
      type: Number,
      default: 0
    },
    termLimit: {
      type: Number,
      default: 0
    },
    actionText: {
      type: String,
      default: 'Solicitar'
    },
    showActions: Boolean
  },
  data() {
    return {
      tech: TECH,
      endorsement: ENDORSEMENT,
      rate: RATE
    };
  },
  computed: {
    endorsementVal() {
      return Math.round((this.amount * this.endorsement) / this.termLimit);
    },
    monthlyPayVal() {
      const monthlyPay =
        (this.rate * this.amount) /
          (1 - (1 / (1 + this.rate)) ** this.termLimit) +
        this.tech +
        this.endorsementVal;
      return Math.round(monthlyPay);
    },
    totalAmount() {
      return this.monthlyPayVal * this.termLimit;
    },
    totalRate() {
      return this.totalAmount - this.amount;
    }
  },
  methods: {
    getRate() {}
  }
});
</script>

<style scoped lang="scss"></style>
