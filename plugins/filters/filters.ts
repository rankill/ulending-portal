import Vue from 'vue';

Vue.filter('toCOP', (value: number) => {
  if (!value) return 0;
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
});
