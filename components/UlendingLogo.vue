<template>
  <img
    class="UlendingLogo"
    alt="Ulending logo"
    src="/logo/negative_color.png"
  />
</template>

<style>
.UlendingLogo {
  height: auto;
  width: 10rem;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>

<script lang="ts">
export default {
  name: 'UlendingLogo'
}
</script>
