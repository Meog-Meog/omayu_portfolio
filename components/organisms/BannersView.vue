<template>
  <div id="banner" class="js-target-darken">
    <div class="banners__container">
      <div class="banners__title-container">
        <img :src="titleImg" class="banners__title js-is-in-view-target" alt="Banner" />
      </div>
      <div class="banners__contents">
        <div class="banners__vertical-line" :style="horizontalLineStyle" />
        <div class="banners__vertical-line" :style="horizontalLineStyle" />
        <div class="banners__grid" style="padding-top: 50px;">
          <div v-for="(item, idx) in itemsToShow.slice(0, 9)" :key="idx">
            <img :alt="item.alt" :src="item.image" class="js-is-in-view-target" />
          </div>
        </div>
      </div>
    </div>
    <div class="banners__grid banners__additional" :class="{ 'banners__additional--show': isExpand }">
      <div v-for="(item, idx) in itemsToShow.slice(9)" :key="idx">
        <img v-if="!item.isDummy" :alt="item.alt" :src="item.image" class="js-is-in-view-target" />
      </div>
    </div>
    <button v-if="!isExpand" class="clickable" :class="{ 'text--dark': dark }" type="button" style="cursor: none;"
      @click="toggle">
      <span v-if="isExpand">Hide</span>
      <span v-else>View All</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { chunk } from "lodash";

import titleImg from '@/assets/image/textimg/top/Banner.svg?url';
import items from "@/assets/data/bannerItems.js";

const mouseStalkerText = useState('mouseStalkerText', () => '')
const dark = useState('dark', () => false)
const containerHeightPx = ref(0)
const titleContainerHeightPx = ref(0)
const isExpand = ref(false)

const itemsToShow = [...items, ...Array(items.length % 3 !== 0 ? 3 - (items.length % 3) : 0).fill({ isDummy: true })]

const toggle = () =>
{
  isExpand.value = !isExpand.value
  mouseStalkerText.value = ''
}

const updateContainerHeight = () =>
{
  const container = document.querySelector('.banners__contents')
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
    // opacity: ratio
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

useResize((width: number, height: number) =>
{
  updateContainerHeight();
  updateTitleContainerHeight();
});

onMounted(() =>
{
  updateContainerHeight();
  updateTitleContainerHeight();
})

onUpdated(() =>
{
  updateContainerHeight();
  updateTitleContainerHeight();
})
</script>

<style lang="scss" scoped>
$line-color: #2c2c2c;

.banners {
  &__container {
    position: relative;
  }

  &__title {
    font-size: 170px;
    text-align: center;
    line-height: 1em;
    font-family: Valery, serif;

    &-container {
      padding-top: 60px;
      text-align: center;
    }
  }

  &__contents {
    position: relative;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    div {
      padding: 70px 100px;
      border-bottom: #2c2c2c solid 1px;

      img {
        max-width: 100%;
      }
    }
  }

  &__vertical-line {
    position: absolute;
    top: 0;
    width: 1px;
    background: linear-gradient(#1a1a1a, #2c2c2c);
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
    // background-color: #707070;
    background-color: #2c2c2c;
  }

  &__additional {
    position: relative;
    max-height: 0;
    overflow: hidden;
    transition: max-height 1s;

    &--show {
      max-height: 1600px;
    }

    div {
      border-top: solid 1px $line-color;
      border-left: solid 1px $line-color;

      &:nth-child(3n + 1) // 3列の場合

        {
        border-left: none;
      }

    }
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
  border-bottom: 1px solid #2c2c2c;
}

.text--dark {
  color: #fff;
}
</style>