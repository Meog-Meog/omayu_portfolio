<template>
  <div class="footer">
    <img src="~/assets/image/textimg/top/thank_you_for_visiting.svg?url" alt="Thank you for visiting"
      class="footer__ty" />
    <div class="footer__menu">
      <scroll-to-top-button />
      <p class="text-link"><a @click="scrollTo('#web-page')">Web Site</a></p>
      <p class="text-link"><a @click="scrollTo('#banner')">Banner</a></p>
      <p class="text-link"><a @click="scrollTo('#illustration')">Illustration</a></p>
    </div>
    <div class="footer__copy-right">
      © {{ year }} Mayu Teramoto’s Portfolio
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrollToTopButton from '@/components/molecules/ScrollToTopButton.vue';
const smoother = useState<ScrollSmoother>('smoother')
const scrollTo = (target: string): void =>
{
  smoother.value.scrollTo(target, true);
}
const year: number = new Date().getFullYear();
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  background: #0F0F0F 0% 0% no-repeat padding-box;
  color: #FFFFFF;
  overflow: hidden;

  &__menu {
    margin: 65px 0 238px 100px;
    display: flex;
    align-items: center;

    .text-link {
      margin-right: 26px;
    }
  }

  &__ty {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &__copy-right {
    margin-right: 50px;
    margin-bottom: 40px;
    text-align: end;
    font: normal normal normal 12px/17px ZenKakuGothicNew;
    letter-spacing: 0.6px;
    line-height: 1em;
  }
}
</style>