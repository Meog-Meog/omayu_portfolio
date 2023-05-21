<template>
  <div id="first-view" class="first-view__container">
    <img src="~/assets/image/kv/mayuteramoto.svg?url" alt="Mayu Teramoto" class="first-view__name fade-in" />
    <div class="first-view__scrolling-hint-container fade-in">
      <ScrollingHint />
    </div>
  </div>
</template>

<script setup lang="ts">
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
  }

  &__name {
    width: 100%;

    &.fade-in {
      opacity: 0;
      animation: 2.25s cubic-bezier(0.4, 0, 0, 1) 0.5s forwards fade-in;
    }
  }

  &__scrolling-hint-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;

    &.fade-in {
      opacity: 0;
      animation: 2.25s cubic-bezier(0.4, 0, 0, 1) 1.5s forwards fade-in;
    }
  }

}
</style>
