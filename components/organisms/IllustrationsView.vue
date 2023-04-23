<template>
  <div id="illustration" class="illustrations__section js-is-in-view-target--lighten">
    <div class="illustrations__container">
      <img src="~/assets/image/textimg/top/Illustration.svg?url" class="illustrations__title js-is-in-view-target"
        alt="Illustration" />
      <div class="illustrations__showcase-wrapper">
        <div class="clickable-back" style="position: absolute; height: 100%; width: 50%; z-index: 100;" @click="back">
        </div>
        <div class="clickable-next" style="position: absolute; height: 100%; width: 50%; z-index: 100; left: 50%;"
          @click="next">
        </div>
        <div class="illustrations__showcase">
          <div class="illustrations__showcase-inner">
            <img v-for="(item, i) of items" :key="i" :alt="item.alt" :src="item.image" class="illustrations__item"
              :class="{ 'fade-enter-active': idx > i }" />
          </div>
        </div>
      </div>
    </div>
    <div class="illustrations__item-number-container">
      <div>0{{ idx + 1 }}</div>
      <div class="illustrations__item-number-separator" />
      <div>0{{ items.length }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useState } from "nuxt/app";
import items from "@/assets/data/illustrationItems.js"

const dark = useState('dark', () => false)
const idx = ref(0)
const next = () =>
{
  if (idx.value < items.length - 1)
  {
    idx.value++
  }
}
const back = () =>
{
  if (idx.value > 0)
  {
    idx.value--
  }
}

onMounted(() =>
{
  if (process.client)
  {
    // スクロールイベントの設定
    let targets = document.querySelectorAll('.js-is-in-view-target--lighten')
    window.addEventListener('scroll', function ()
    {
      for (const target of targets)
      {
        const posY = target.getBoundingClientRect().top + window.scrollY
        if (window.scrollY > posY - window.innerHeight / 2)
        {
          dark.value = false
        }
      }
    });
  }
})

</script>

<style lang="scss" scoped>
.illustrations {
  &__section {
    padding: 151px 0 150px 0;
  }

  &__container {
    display: flex;
    align-items: center;
    padding-left: 100px;
    margin-bottom: 59.52px;
  }

  &__containts {
    width: 100%;
  }

  &__title {
    width: 100%;
    max-width: 477px;
    height: auto;
  }

  &__showcase {
    padding: 0 50px;

    &-wrapper {
      position: relative;
      margin-right: 100px;
      margin-left: 63px;
      width: 100%;
      height: fit-content;
    }

    &-inner {
      position: relative;
      width: 100%;
      aspect-ratio: 1;

      img {
        width: 100%;
        height: auto;
        opacity: 0;
      }

      img.fade-enter-active {
        animation: slide-in-1 0.2s cubic-bezier(0.17, 0.87, 1, 1) forwards;
      }

      img.fade-leave-active {
        animation: slide-in-1 0.2s cubic-bezier(0.17, 0.87, 1, 1) reverse !important;
      }
    }
  }

  &__item {
    width: 500px;
    height: 500px;
    position: absolute;
  }

  &__item-number {
    &-container {
      display: flex;
      align-items: center;
      text-align: end;
      justify-content: end;
      margin-right: 150px;
      font: normal normal 300 16px/20px Roboto;
      letter-spacing: 0.8px;
      color: #000000;
      opacity: 1;
      line-height: 1em;
      margin-left: auto;

      div:nth-of-type(1) {
        color: #000;
      }

      div:nth-of-type(3) {
        color: #a3a3a3;
      }
    }

    &-separator {
      width: 0.5px;
      height: 10px;
      background: #a3a3a3 0% 0% no-repeat padding-box;
      margin: 0 15px;
    }
  }
}

@keyframes slide-in-1 {
  0% {
    transform: translate3d(-8.9897%, -8.9897%, 0px) rotate(-9.4949deg);
    opacity: 0;
  }

  100% {
    transform: translate3d(0%, 0%, 0px) rotate(-4.2495deg);
    opacity: 1;
  }
}
</style>