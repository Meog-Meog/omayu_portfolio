<template>
  <section class="competitions__container js-horizontal-scroll-trigger">
    <div class="competitions__wrapper js-is-in-view-target">
      <img :src="title" class="web-competitions__title js-is-in-view-target" alt="Competition" />
      <div class="competitions__items-wrapper">
        <ul class="competitions__items">
          <li v-for="(item, i) in items" :key="i" class="competitions__item">
            <img :alt="item.alt" :src="item.image" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted } from "vue";
import items from '@/assets/data/competitionItems.js';
import title from '@/assets/image/textimg/top/Competition.svg?url'

onMounted(() =>
{
  if (process.client)
  {
    // 横スクロールの設定
    const listWrapperEl = document.querySelector('.competitions__items-wrapper');
    const listEl = document.querySelector('.competitions__items');
    if (listWrapperEl == null || listEl == null) return;
    gsap.to(listEl, {
      x: () => -(listEl.clientWidth - listWrapperEl.clientWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: '.js-horizontal-scroll-trigger',
        start: 'center center',
        end: () => `+=${listEl.clientWidth - listWrapperEl.clientWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }
})
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  margin: 0;
}

.competitions {
  &__container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 250px;
  }

  &__wrapper {
    width: 100%;
  }

  &__title {
    margin-bottom: -45px;
  }

  &__items {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    gap: 0 15px;

    &-wrapper {
      position: relative;
      width: 100%;
      height: 228px;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-of-type {
      margin-left: 468px;
    }

    &:last-of-type {
      margin-right: 100px;
    }

    img {
      height: 228px;
    }
  }
}
</style>