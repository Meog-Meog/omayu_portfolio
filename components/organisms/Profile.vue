<template>
  <div class="profile__container">
    <div>
      <img src="~/assets/image/profile/mayuteramoto_pf.svg?url" class="profile__name" alt="Mayu Teramoto" />
      <div class="profile__desc">
        <span>
          大阪府出身 / 東京都在住　Webデザイナー歴 5年目
        </span>
      </div>
      <div class="profile__text">
       WebマーケティングとtoCの自社サービスを運営する会社で、デザイナーとして業務に携わってきました。<br>
       どんな案件でも、自分も携わったと胸を張って言えるデザイン制作を心掛けています。
      </div>
    </div>
    <img alt="" class="profile__picture" src="~/assets/image/profile/portrait.webp" />
  </div>
</template>

<script setup lang="ts">
const year: number = new Date().getFullYear();
</script>

<style lang="scss" scoped>
.profile {
  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 150px;
    color: #eeeeee;

    div {
      width: auto;
    }
  }

  &__name {
    margin-bottom: 60px;

    img {
      width: 100%;
      max-width: 533px;
      height: auto;
    }
  }

  &__desc {
    margin-bottom: 34px;
    display: flex;
    align-items: center;

    span {
      text-align: left;
      font: normal normal normal 14px ZenKakuGothicNew;
      letter-spacing: 0;
      @include xd-line-spacing(14px, 26px, 4px, 3px);
    }

    a {
      margin-right: 10px;
      width: 26px;
      height: 26px;
    }
  }

  &__text {
    text-align: left;
    font: normal normal normal 14px/29px ZenKakuGothicNew;
    letter-spacing: 0;
    width: 100%;
    @include xd-line-spacing(14px, 29px, 4px, 3px);
  }

  &__picture {
    width: 100%;
    max-width: 433px;
    aspect-ratio: auto;
    margin-left: 50px;
  }
}
</style>
