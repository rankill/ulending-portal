<template>
  <v-app class="app" light>
    <!--NAVBAR-->
    <v-app-bar
      class="app__navbar"
      :color="!scrolledNavbar ? 'primary' : 'primary'"
      fixed
      app
      :height="headerHeight"
      :elevation="!scrolledNavbar ? 0 : 10"
    >
      <!--LEFT NAVBAR-->
      <div class="">
        <nuxt-link
          class="app__navbar__logo"
          tag="img"
          :src="require('~/static//logo/negative_color.png')"
          to="/"
        >
        </nuxt-link>
      </div>
    </v-app-bar>

    <!--CONTENT-->
    <v-content class="app__content">
      <nuxt />
    </v-content>

    <!--FOOTER-->
    <v-footer :fixed="fixed">
      <span>U Lending &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

interface IndexData {
  headerHeight: number;
  scrolledNavbar: boolean;
  fixed: boolean;
}

const SCROLL_OFFSET = 30;

export default Vue.extend({
  data(): IndexData {
    return {
      headerHeight: 90,
      scrolledNavbar: false,
      fixed: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      this.scrolledNavbar = window.pageYOffset > SCROLL_OFFSET;
    }
  },
  head() {
    return {
      titleTemplate: '%s - U Lending',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Un préstamo para tu futuro: Financiamos tu matrícula y sostenimiento durante el periodo académico'
        }
      ]
    };
  }
});
</script>

<style lang="scss">
.app__navbar {
  &__logo {
    height: auto;
    width: 10rem;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
}
.v-radio {
  .v-input--selection-controls__input {
    .v-icon {
      font-size: 35px;
    }
  }
}
</style>
