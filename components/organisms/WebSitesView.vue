<template>
  <div id="web-page" class="web-sites__container">
    <div class="web-sites__title">
      <img src="~/assets/image/website/website.svg?url" alt="Web Site" />
    </div>
    <div class="web-sites__thumbnails">
      <div class="web-sites__row">
        <div v-for="item of items.slice(0, 2)" class="web-sites__thumbnail web-sites__thumbnail--first clickable-view"
          @click="router.push('/' + item.id)">
          <img :alt="item.alt" :src="item.image" />
        </div>
      </div>
      <div class="web-sites__row">
        <div v-for="item of items.slice(2, 4)" class="web-sites__thumbnail web-sites__thumbnail--second clickable-view"
          @click="router.push('/' + item.id)">
          <img :alt="item.alt" :src="item.image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import items from "@/assets/data/webSiteItems.js";
const { $gsap } = useNuxtApp();
const router = useRouter();

onMounted(() =>
{
  if (process.client)
  {
    const title = document.querySelector('.web-sites__title');
    const container = document.querySelector('.web-sites__container');
    $gsap.to(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top top',
        endTrigger: container,
        end: 'bottom top',
        pin: title,
        // once: true,
        //markers: true
      }
    });
    $gsap.to(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top top',
        endTrigger: container,
        end: 'bottom top',
        toggleClass: { targets: title, className: 'slide-in' },
        once: true,
        //markers: true
      }
    });
    /*
    document.querySelectorAll('.web-sites__thumbnail--first').forEach((el, idx) =>
    {
      $gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'center 70%',
          toggleClass: { targets: el, className: 'slide-in' },
          once: true,
          //markers: true
        }
      });
    });
    document.querySelectorAll('.web-sites__thumbnail--second').forEach((el, idx) =>
    {
      $gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'center 80%',
          toggleClass: { targets: el, className: 'slide-in' },
          once: true,
          // markers: true
        }
      });
    });
    */
  }
})
</script>

<style lang="scss" scoped>
.web-sites {
  &__container {
    padding: 50vh 100px 0 100px;
    margin-bottom: 150vh;
    position: relative;
    text-align: center;
  }

  &__title {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 50vh;
    z-index: 1;

    &.slide-in {
      img {
        opacity: 1;
        transform: translateY(-50%);
      }
    }

    img {
      width: 100%;
      max-width: 726px;
      height: auto;
      opacity: 0;
      transform: translateY(calc(-50% + 5rem));
      transition: all 1.5s cubic-bezier(0.4, 0, 0, 1);
    }
  }

  &__thumbnails {
    position: relative;
    z-index: 2;
    padding-top: 50vh;
  }

  &__row {
    display: flex;
    margin: 30px 0;
    position: relative;
    z-index: 2;

    .web-sites__thumbnail {
      width: 50%;

      img {
        // opacity: 0;
        opacity: 1;
        transform: translateY(5rem);
        width: 100%;
        height: auto;
        transition: all 1.5s cubic-bezier(0.4, 0, 0, 1);
      }

      &.slide-in {
        img {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }

    &:nth-of-type(1) {
      margin-bottom: 228px;

      .web-sites__thumbnail:nth-of-type(1) {
        margin-bottom: 100px;
        margin-right: 50px;
      }

      .web-sites__thumbnail:nth-of-type(2) {
        margin-top: 100px;
        margin-left: 50px;
      }
    }

    &:nth-of-type(2) {
      .web-sites__thumbnail:nth-of-type(1) {
        margin-top: 100px;
        margin-right: 50px;
      }

      .web-sites__thumbnail:nth-of-type(2) {
        margin-bottom: 100px;
        margin-left: 50px;

      }
    }
  }

}
</style>