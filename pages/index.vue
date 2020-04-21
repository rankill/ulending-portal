<template>
  <v-layout class="landing flex-column">
    <v-container class="landing-container">
      <!--REQUIREMENTS-->
      <v-flex>
        REQUIREMENTS
      </v-flex>

      <!--ABOUT-->
      <v-flex>
        ABOUT
      </v-flex>

      <!--TYPES-->
      <v-flex>
        <v-parallax :height="200"></v-parallax>
      </v-flex>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
export default {
  head() {
    return {
      title: 'Home'
    }
  }
}
</script>
