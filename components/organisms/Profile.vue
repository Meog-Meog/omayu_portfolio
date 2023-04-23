<template>
  <div class="profile__container">
    <div>
      <img src="~/assets/image/textimg/hb/mayu_teramoto.svg?url" class="profile__name js-is-in-view-target"
        alt="Mayu Teramoto" />
      <div class="profile__desc">
        <span>
          大阪府出身 / 東京都在住　Webデザイナー歴 5年
        </span>
        <a class="text-link" href="https://twitter.com/myttt33" rel="noopener" target="_blank">
          <img src="~/assets/image/profile/icon_twitter.svg?url" />
        </a>
        <a class="text-link" href="https://www.instagram.com/asage_ttt/" rel="noopener" target="_blank">
          <img src="~/assets/image/profile/icon_instagram.svg?url" />
        </a>
      </div>
      <div class="profile__text">
        UI領域においてメインデザイナーとして初めて携わった「スゴヨセ」で、グッドデザイン賞を受賞しました。また、ギャラリーサイト SANKOU! でもサイトを掲載いただいてます。
        日々の業務では、企画段階の打ち合わせに参加したり、エンジニアと相談して挙動やデザインを決めたり、同じチームで働くデザイナーのスケジュール管理なども行っています。
        好きなことは、1つの作業に集中して取り組む事です。得意なことは、整理整頓です。
      </div>
    </div>
    <img alt="" class="profile__picture" src="~/assets/image/profile/portrait.webp" />
  </div>
</template>

<style lang="scss" scoped>
.profile {
  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px 150px 130px 150px;

    div {
      width: auto;
    }
  }

  &__name {
    margin-bottom: 56px;

    img {
      width: 100%;
      max-width: 533px;
      height: auto;
    }
  }

  &__desc {
    margin-bottom: 28px;
    display: flex;
    align-items: center;

    span {
      margin-right: 23px;
      text-align: left;
      font: normal normal normal 14px/26px ZenKakuGothicNew;
      letter-spacing: 0;
      color: #CACACA;
      line-height: 1em;
    }

    a {
      margin-right: 10px;
      width: 26px;
      height: 26px;
    }
  }

  &__text {
    text-align: left;
    font: normal normal normal 14px/26px ZenKakuGothicNew;
    letter-spacing: 0;
    color: #CACACA;
    width: 100%;
  }

  &__picture {
    width: 100%;
    max-width: 433px;
    aspect-ratio: auto;
    margin-left: 50px;
  }
}
</style>
