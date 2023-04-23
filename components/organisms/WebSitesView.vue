<template>
  <div id="web-page" class="web-sites__container">
    <div class="web-sites__row">
      <img v-for="item of items.slice(0, 2)" :alt="item.alt" :src="item.image" class="js-is-in-view-target clickable" />
    </div>
    <img src="~/assets/image/textimg/top/web_site.svg?url" class="web-sites__title js-is-in-view-target" alt="Web Site" />
    <div class="web-sites__row">
      <img v-for="item of items.slice(2, 4)" :alt="item.alt" :src="item.image" class="js-is-in-view-target clickable" />
    </div>
  </div>
</template>

<script setup lang="ts">
import items from "@/assets/data/webSiteItems.js";
</script>

<style lang="scss" scoped>
$img-margin-x: 75px;
$img-margin-y: 100px;

.web-sites {
  &__container {
    padding: 100px 100px 220px 100px;
    text-align: center;
  }

  &__title {
    margin: 100px 0;
    text-align: center;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
  }

  &__row:nth-of-type(1) img:nth-of-type(1) {
    margin-bottom: $img-margin-y;
    width: calc(50vw - $img-margin-x * 2);
  }

  &__row:nth-of-type(1) img:nth-of-type(2) {
    margin-top: $img-margin-y;
    width: calc(50vw - $img-margin-x * 2);
  }

  &__row:nth-of-type(2) img:nth-of-type(1) {
    margin-top: $img-margin-y;
    width: calc(50vw - $img-margin-x * 2);
  }

  &__row:nth-of-type(2) img:nth-of-type(2) {
    margin-bottom: $img-margin-y;
    width: calc(50vw - $img-margin-x * 2);
  }
}
</style>