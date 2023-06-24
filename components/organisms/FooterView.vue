<template>
  <div class="footer">
    <div class="footer__main-container">
      <div class="footer__main-contents">
        <ScrollToTopButton2 style="margin-top: 91px;" />
        <div class="footer__menu">
          <div class="footer__menu-item" style="margin-right: 60px;">
            <p class="text-link"><a @click="scrollToWebsite">Web Site</a></p>
            <p class="text-link"><a>Sugoyose</a></p>
            <p class="text-link"><a>Spring Campaign</a></p>
            <p class="text-link"><a>Oshikatsu</a></p>
            <p class="text-link"><a>Hagoromo Academy</a></p>
          </div>
          <div class="footer__menu-item" style="margin-right: 50px;">
            <p class="text-link"><a @click="scrollToCompetition">Competition</a></p>
            <p class="text-link"><a>COVERMARK</a></p>
            <p class="text-link"><a>CO.nnect</a></p>
            <p class="text-link"><a>Matsushita Hospital</a></p>
          </div>
          <div class="footer__menu-item" style="margin-right: 80px;">
            <p class="text-link"><a @click="scrollToBanner">Banner</a></p>
          </div>
          <div class="footer__menu-item" style="margin-right: 114px;">
            <p class="text-link"><a @click="scrollToIllustration">Illustration</a></p>
          </div>
        </div>
      </div>
      <div class="footer__copy-right">
        © {{ year }} Mayu Teramoto’s Portfolio
      </div>
    </div>
    <div class="footer__about-me">
      <AboutMeMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
const smoother = useState<ScrollSmoother>('smoother')
const scrollToWebsite = (): void =>
{
  smoother.value.scrollTo('.web-sites__title', false, "top top");
}
const scrollToCompetition = (): void =>
{
  smoother.value.scrollTo('.competitions__title', false, "top 70%");
}
const scrollToBanner = (): void =>
{
  smoother.value.scrollTo('#banner', false, "top top");
}
const scrollToIllustration = (): void =>
{
  smoother.value.scrollTo('#illustration', false, "top top");
}
const year: number = new Date().getFullYear();
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.footer {
  position: relative;
  color: #101010;
  font: normal normal normal 16px/24px ZenKakuGothicNew;
  letter-spacing: 0.64px;
  width: 100vw;
  height: calc(100vh - 110px);
  border-top: #cccccc 1px solid;
  display: flex;
  // padding-left: 100px;
  // padding-right: 19px;

  &__main {

    &-container {
      width: auto;
      flex: 1;
      padding-bottom: 41px;
      padding-left: 100px;
      border-right: #cccccc 1px solid;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &-contents {
      display: flex;
      justify-content: space-between;
    }

  }


  &__menu {
    padding-top: 101px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;

    &-item {
      div {
        margin: 0;
      }

      >:first-child {
        margin-bottom: 30px;
      }

      >*:not(:first-child) {
        margin-bottom: 25px;
        color: #9F9F9F;
      }
    }
  }

  &__copy-right {
    font: normal normal normal 13px/19px ZenKakuGothicNew;
    letter-spacing: 0.52px;
    color: #101010;
  }

  &__about-me {
    padding-top: 101px;
    padding-right: 19px;
  }
}
</style>