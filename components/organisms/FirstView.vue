<template>
  <div id="first-view" class="first-view__container">
    <MayuTeramoto />
    <div class="first-view__scrolling-hint-container">
      <ScrollingHint />
    </div>
  </div>
</template>

<script setup lang="ts">
import MayuTeramoto from '@/assets/image/mayu_teramoto.svg';
import ScrollingHint from '@/components/molecules/ScrollingHint.vue';
</script>

<style lang="scss" scoped>
.first-view {
  &__container {
    height: 100vh;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 58px;
  }

  &__scrolling-hint-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
