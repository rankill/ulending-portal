<template>
  <div
    class="lending_summary d-flex align-center justify-space-between"
    :class="[row ? 'flex-column' : '']"
  >
    <v-flex
      class="d-flex align-center justify-center"
      :class="[row ? 'justify-space-between mb-5' : 'flex-column']"
    >
      <b>Solicitud:</b>
      <span class="primary--text">
        {{ amount | toCOP }}
      </span>
    </v-flex>

    <v-flex
      class="d-flex align-center justify-center"
      :class="[row ? 'justify-space-between mb-5' : 'flex-column']"
    >
      <b>Plazo:</b>
      <span class="primary--text"> {{ termLimit }} meses</span>
    </v-flex>

    <v-flex
      class="d-flex align-center justify-center"
      :class="[row ? 'justify-space-between' : 'flex-column']"
    >
      <b>Estado:</b>
      <v-chip label :color="isComplete ? 'success' : 'orange'" outlined>
        {{ isComplete ? 'Completo' : 'Pendiente' }}
      </v-chip>
    </v-flex>
  </div>
</template>

<script>
import { Vue } from 'vue-property-decorator';

export default Vue.extend({
  name: 'Summary',
  props: {
    row: Boolean,
    amount: {
      type: Number,
      default: 0
    },
    termLimit: {
      type: Number,
      default: 0
    },
    isComplete: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style scoped lang="scss">
.lending_summary {
  border-bottom: 1px solid var(--v-primary-base);
  border-radius: 4px;
  width: 100%;
  background-color: white;
  padding: 1rem;

  & > div {
    width: 100%;
  }
}
</style>
