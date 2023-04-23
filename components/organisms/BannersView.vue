<template>
  <div id="banner">
    <div class="banners__container">
      <div class="banners__vertical-line" :style="horizontalLineStyle" />
      <div class="banners__vertical-line" :style="horizontalLineStyle" />
      <div class="banners__horizontal-line" :style="horizontalLine1Style" />
      <div class="banners__horizontal-line" :style="horizontalLine2Style" />
      <div class="banners__title-container">
        <img src="~/assets/image/textimg/top/Banner.svg?url" class="banners__title js-is-in-view-target" alt="Banner" />
      </div>
      <div v-for="(row, rowIndex) in chunkedItems" class="banners__row" :key="'row-' + rowIndex">
        <img v-for="(item, itemIndex) in row" :alt="item.alt" :src="item.image"
          class="banners__item js-is-in-view-target clickable" :key="'item-' + rowIndex + '-' + itemIndex" />
      </div>
    </div>
    <button class="clickable" :class="{ 'text--dark': dark }" type="button" style="cursor: none;">
      View All
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useResize } from '@/composables/useResize';

import { chunk } from "lodash";
import items from "assets/data/bannerItems.js";

const dark = useState('dark', () => false)
const containerHeightPx = ref(0)
const titleContainerHeightPx = ref(0)

const chunkedItems = chunk(items.slice(0, 9), 3);

const updateContainerHeight = () =>
{
  const container = document.querySelector('.banners__container')
  if (container)
  {
    containerHeightPx.value = container.getBoundingClientRect().height
  }
}

const updateTitleContainerHeight = () =>
{
  const container = document.querySelector('.banners__title-container')
  if (container)
  {
    titleContainerHeightPx.value = container.getBoundingClientRect().height
  }
}

useResize((width: number, height: number) =>
{
  updateContainerHeight();
  updateTitleContainerHeight();
});

const horizontalLineStyle = computed(() =>
{
  return {
    height: String(containerHeightPx.value) + 'px'
  }
})

const horizontalLine1Style = computed(() =>
{
  const ratio = (titleContainerHeightPx.value + (containerHeightPx.value - titleContainerHeightPx.value) / 3) / containerHeightPx.value
  return {
    top: String(ratio * 100) + '%',
    opacity: ratio
  }
})

const horizontalLine2Style = computed(() =>
{
  const ratio = (titleContainerHeightPx.value + (containerHeightPx.value - titleContainerHeightPx.value) * 2 / 3) / containerHeightPx.value
  return {
    top: String(ratio * 100) + '%',
    opacity: ratio
  }
})

onMounted(() =>
{
  if (process.client)
  {
    updateContainerHeight();
    updateTitleContainerHeight();
  }
})
</script>

<style lang="scss" scoped>
.banners {
  &__container {
    position: relative;
  }

  &__title {
    margin-bottom: 50px;
    font-size: 170px;
    text-align: center;
    line-height: 1em;
    font-family: Valery, serif;

    &-container {
      padding-top: 60px;
      text-align: center;
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
  }

  &__item {
    margin: 70px 100px;
    width: calc((100vw - 600px) / 3);
  }

  &__vertical-line {
    position: absolute;
    top: 0;
    width: 1px;
    background: linear-gradient(180deg, #70707000, #707070ff);
  }

  &__vertical-line:nth-of-type(1) {
    left: 33.33333%;
  }

  &__vertical-line:nth-of-type(2) {
    left: 66.66666%;
  }

  &__horizontal-line {
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #707070;
  }
}

button {
  width: 100%;
  height: 70px;
  text-align: center;
  font: normal normal normal 16px/35px ZenKakuGothicNew;
  letter-spacing: 0.64px;
  color: #000;
  opacity: 1;
  border-top: 1px solid #707070;
  border-bottom: 1px solid #707070;
}

.text--dark {
  color: #fff;
}
</style>