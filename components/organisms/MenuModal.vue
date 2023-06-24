<template>
  <nav :class="{ 'menu-modal--open': showModal }" class="menu-modal">
    <div class="menu-modal__contents">
      <img alt="Created by Meog Meog" src="~/assets/image/kv/logo_hb.svg?url" />
      <hr />
      <div class="menu-modal__menu">
        <div class="menu-modal__menu-item" style="margin-right: 100px;">
          <p class="text-link"><a @click="hideModalAndScrollToWebsite">Web Site</a></p>
          <p class="text-link"><a>Sugoyose</a></p>
          <p class="text-link"><a>Spring Campaign</a></p>
          <p class="text-link"><a>Oshikatsu</a></p>
          <p class="text-link"><a>Hagoromo Academy</a></p>
        </div>
        <div class="menu-modal__menu-item" style="margin-right: 100px;">
          <p class="text-link"><a @click="hideModalAndScrollToCompetition">Competition</a></p>
          <p class="text-link"><a>COVERMARK</a></p>
          <p class="text-link"><a>CO.nnect</a></p>
          <p class="text-link"><a>Matsushita Hospital</a></p>
        </div>
        <div class="menu-modal__menu-item" style="margin-right: 130px;">
          <p class="text-link"><a @click="hideModalAndScrollToBanner">Banner</a></p>
        </div>
        <div class="menu-modal__menu-item">
          <p class="text-link"><a @click="hideModalAndScrollToIllustration">Illustration</a></p>
        </div>
      </div>
    </div>

  </nav>
</template>

<script setup lang="ts">
const showModal = useState('showModal', () => false)
const dark = useState('dark', () => false)
const smoother = useState<ScrollSmoother>('smoother')
const hideModalAndScrollToWebsite = (): void =>
{
  showModal.value = false
  dark.value = false
  smoother.value.scrollTo('.web-sites__title', false, "top top");
}
const hideModalAndScrollToCompetition = (): void =>
{
  showModal.value = false
  dark.value = false
  smoother.value.scrollTo('.competitions__title', false, "top 70%");
}
const hideModalAndScrollToBanner = (): void =>
{
  showModal.value = false
  smoother.value.scrollTo('#banner', false, "top top");
}
const hideModalAndScrollToIllustration = (): void =>
{
  showModal.value = false
  dark.value = false
  smoother.value.scrollTo('#illustration', false, "top top");
}
</script>

<style lang="scss" scoped>
.menu-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  transition: .8s ease-out;
  width: 100%;
  margin: 0;
  z-index: 10;
  -webkit-overflow-scrolling: touch;
  opacity: 0;
  overflow: scroll;

  &--open {
    pointer-events: auto;
    opacity: 1;

    .menu-modal__contents {
      opacity: 1;
      filter: blur(0);
    }
  }

  &__contents {
    padding: 90px 150px;

    hr {
      margin: 90px 0;
      background-color: #3B3B3B;
      height: 0.5px;
      border: none;
    }
  }

  &__menu {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    &-item {
      div {
        margin: 0;
      }

      >:first-child {
        margin-bottom: 30px;
        color: #EEEEEE;
      }

      >*:not(:first-child) {
        margin-bottom: 25px;
        color: #6A6A6A;
      }
    }
  }

}
</style>
