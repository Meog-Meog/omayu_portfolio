<template>
  <section id="illustration" class="illustrations__section">
    <div class="illustrations__container">
      <img src="~/assets/image/textimg/top/Illustration.svg?url" class="illustrations__title js-is-in-view-target"
        alt="Illustration" />
      <div class="illustrations__showcase-wrapper js-is-in-view-target--lazy">
        <illustration-showcase style="margin-bottom: -86px;" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.illustrations {
  &__section {
    padding: 164px 0 241px 0;
  }

  &__container {
    display: flex;
    align-items: center;
    padding-left: 100px;
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

    &-wrapper {
      position: relative;
      margin-right: 150px;
      margin-left: 125px;
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: center;
    }

  }
}
</style>