import { Vue } from 'vue-property-decorator';

Vue.directive('onlyNumbers', {
  inserted(el: any) {
    el.onkeypress = (event: any) => {
      event = event || window.event;
      const charCode = event.which ? event.which : event.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        event.preventDefault();
      } else {
        return true;
      }
    };
  }
});
