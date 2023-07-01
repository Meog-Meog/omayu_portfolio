<template>
  <section id="competition" class="competitions__container js-horizontal-scroll-trigger">
    <div class="competitions__wrapper">
      <div class="competitions__title">
        <img src="~/assets/image/competition/competition.svg?url" alt="Competition" />
      </div>
      <div class="competitions__items-wrapper">
        <ul class="competitions__items">
          <li v-for="(item, i) in items" :key="i" class="competitions__item clickable-view"
            @click="router.push('/' + item.id)">
            <img :alt="item.alt" :src="item.image" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const router = useRouter();
import { onMounted } from "vue";
import items from '@/assets/data/competitionItems.js';
const smoother = useState<ScrollSmoother>('smoother')

onMounted(() =>
{
  if (process.client)
  {
    const { $gsap } = useNuxtApp();

    const container = document.querySelector('.competitions__container');
    const title = document.querySelector('.competitions__title');
    const items = document.querySelector('.competitions__items-wrapper');
    const listWrapperEl = document.querySelector('.competitions__items-wrapper');
    const listEl = document.querySelector('.competitions__items');
    if (title != null)
    {
      $gsap.to(title, {
        scrollTrigger: {
          trigger: '.js-horizontal-scroll-trigger',
          start: 'center center',
          endTrigger: container,
          end: 'bottom top',
          onEnter: async () =>
          {
            title.classList.add('slide-in');
            if (items != null)
              items.classList.add('slide-in');
            smoother.value.paused(true);
            await new Promise(res => setTimeout(res, 1000))
            smoother.value.paused(false);
          },
          once: false,
          //markers: true
        }
      });
    }
    // 横スクロールの設定
    if (listWrapperEl == null || listEl == null) return;
    $gsap.to(listEl, {
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
        //markers: true
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

.competitions__container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100vh;
}

.competitions__wrapper {
  width: 100%;
}

.competitions__title {
  margin-bottom: -55px;

  img {
    opacity: 0;
    transform: translateY(5rem);
    transition: all 1.5s cubic-bezier(0.4, 0, 0, 1);
  }

  &.slide-in {
    img {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &.slide-out {
    opacity: 0;
    transform: translateY(-5rem);
  }
}

.competitions__items {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  gap: 0 15px;
}

.competitions__items-wrapper {
  position: relative;
  width: 100%;
  height: calc((100vw - 300px)/2 * 640 / 1066);

  opacity: 0;
  transform: translateY(5rem);
  transition: all 1.5s 0.3s cubic-bezier(0.4, 0, 0, 1);

  &.slide-in {
    opacity: 1;
    transform: translateY(0);
  }

  &.slide-out {
    opacity: 0;
    transform: translateY(-5rem);
  }
}

.competitions__item {
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-of-type {
    margin-left: 150px;
  }

  &:last-of-type {
    margin-right: 170px;
  }

  img {
    width: calc((100vw - 300px)/2);
  }
}
</style>