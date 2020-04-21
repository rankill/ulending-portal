<template>
  <v-app class="app" light>
    <!--NAVBAR-->
    <v-app-bar
      class="app__navbar m3"
      :color="!scrolledNavbar ? 'primary' : 'primary'"
      fixed
      app
      :height="'80'"
      :elevation="!scrolledNavbar ? 0 : 15"
    >
      <!--LEFT NAVBAR-->
      <UlendingLogo />
    </v-app-bar>

    <!--CONTENT-->
    <v-content class="app__content">
      <nuxt />
    </v-content>

    <!--FOOTER-->
    <v-footer :fixed="fixed">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import UlendingLogo from '~/components/UlendingLogo.vue'

const SCROLL_OFFSET = 60

export default {
  components: { UlendingLogo },
  data() {
    return {
      scrolledNavbar: false,
      lastScrollPosition: 0,
      clipped: false,
      drawer: false,
      fixed: false,
      right: true,
      primaryBg: this.$vuetify.theme.primary
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      this.scrolledNavbar = window.pageYOffset > SCROLL_OFFSET
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
    }
  }
}
</script>

<style lang="scss">
.app {
}
</style>
