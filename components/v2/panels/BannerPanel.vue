<template>
  <div class="container background--dark">
    <img id="bn__title" src="~/assets/image/textimg/top/Banner.svg?url" alt="Banner" />
    <div id="bn__grid-wrapper">
      <div class="bn__vertical-line" :style="{ height: gridWrapperHeightPx }" />
      <div class="bn__vertical-line" :style="{ height: gridWrapperHeightPx }" />
      <div id="bn__grid" style="padding-top: 50px;">
        <div v-for="item in itemsToShow">
          <img class="bn__thumbnail" :alt="item.alt" :src="item.image" @load="updaterGridWrapperHeightPx" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import items from "@/assets/data/bannerItems.js";

const gridWrapperHeightPx = ref(0)

const itemsToShow = [
  ...items,
  ...Array(items.length % 3 !== 0 ? 3 - (items.length % 3) : 0).fill({ isDummy: true })
]
const updaterGridWrapperHeightPx = () =>
{
  const container = document.querySelector('#bn__grid-wrapper')
  if (container)
  {
    gridWrapperHeightPx.value = `${container.getBoundingClientRect().height}px`
  }
}

useResize((width, height) =>
{
  updaterGridWrapperHeightPx();
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  width: 100vw;
  position: relative;
  padding: 60px 0 0 0;
  text-align: center;
}

.background--dark {
  background-image: url('~/assets/image/bg01.webp');
  background-position: center;
  background-size: contain;
  background-attachment: fixed;
}

#bn__grid-wrapper {
  position: relative;
}

#bn__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  div {
    padding: 70px 100px;
    border-bottom: #2c2c2c solid 1px;
  }
}

.bn__thumbnail {
  max-width: 100%;
}

.bn__vertical-line {
  position: absolute;
  top: 0;
  width: 1px;
  background: linear-gradient(#1a1a1a, #2c2c2c 50%);

  &:nth-of-type(1) {
    left: 33.33333%;
  }

  &:nth-of-type(2) {
    left: 66.66666%;
  }
}
</style>