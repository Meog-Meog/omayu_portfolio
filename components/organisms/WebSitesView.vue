<template>
  <div id="web-page" class="web-sites__container">
    <div class="web-sites__row">
      <img v-for="item of items.slice(0, 2)" :alt="item.alt" :src="item.image" class="js-is-in-view-target clickable" />
    </div>
    <div class="web-sites__title js-is-in-view-target">
      <img src="~/assets/image/textimg/top/web_site.svg?url" alt="Web Site" />
    </div>
    <div class="web-sites__row">
      <img v-for="item of items.slice(2, 4)" :alt="item.alt" :src="item.image" class="js-is-in-view-target clickable" />
    </div>
  </div>
</template>

<script setup lang="ts">
import items from "@/assets/data/webSiteItems.js";
</script>

<style lang="scss" scoped>
.web-sites {
  &__container {
    padding: 100px 25px 220px 25px;

    @include mq(md) {
      padding: 100px 75px 220px 75px;
    }

    @include mq(xl) {
      padding: 100px 100px 220px 100px;
    }

    text-align: center;
  }

  &__title {
    width: 100%;
    padding: 40px 0;
    text-align: center;

    @include mq(md) {
      padding: 75px 0;
    }

    @include mq(xl) {
      padding: 100px 0;
    }

    img {
      width: 100%;
      max-width: 726px;
      height: auto;
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
    margin: 30px 0;

    img {
      width: calc(50vw - 20px * 2);

      @include mq(md) {
        width: calc(50vw - 50px * 2);
      }

      @include mq(xl) {
        width: calc(50vw - 75px * 2);
      }
    }
  }

  &__row:nth-of-type(1) img:nth-of-type(1),
  &__row:nth-of-type(3) img:nth-of-type(2) {
    margin-bottom: 50px;

    @include mq(md) {
      margin-bottom: 75px;
    }

    @include mq(xl) {
      margin-bottom: 100px;
    }
  }

  &__row:nth-of-type(1) img:nth-of-type(2),
  &__row:nth-of-type(3) img:nth-of-type(1) {
    margin-top: 50px;

    @include mq(md) {
      margin-top: 75px;
    }

    @include mq(xl) {
      margin-top: 100px;
    }
  }

}
</style>