<template>
  <div class="footer">
    <div class="footer__main-container">
      <div class="footer__main-contents">
        <ScrollToTopButton2 style="margin-top: 91px;" />
        <div class="footer__menu">
          <link-menu-column style="margin-right: 60px;" :heading="webSite.heading" :contents="webSite.contents"
            :scrollTo="webSite.scrollTo" />
          <link-menu-column style="margin-right: 50px;" :heading="competition.heading" :contents="competition.contents"
            :scrollTo="competition.scrollTo" />
          <link-menu-column style="margin-right: 80px;" :heading="banner.heading" :contents="banner.contents"
            :scrollTo="banner.scrollTo" />
          <link-menu-column style="margin-right: 114px;" :heading="illustration.heading" :contents="illustration.contents"
            :scrollTo="illustration.scrollTo" />
        </div>
      </div>
      <div class="footer__copy-right">
        © {{ year }} Mayu Teramoto.
      </div>
    </div>
    <div class="footer__about-me">
      <AboutMeMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const scrollTo = useState<Number>('scrollTo', () => -1)
const smoother = useState<ScrollSmoother>('smoother')
const year: number = new Date().getFullYear();

const webSite = {
  heading: "Web Site",
  contents: [
    {
      label: "Sugoyose",
      url: "/web-sites/sugoyose"
    },
    {
      label: "Spring Campaign",
      url: "/web-sites/sugoyose-springcp"
    },
    {
      label: "Oshikatsu",
      url: "/web-sites/sugoyose-oshikatsucp"
    },
    {
      label: "Hagoromo Academy",
      url: "/web-sites/hagoromo-gakuen"
    }
  ],
  scrollTo: async (payload: MouseEvent) =>
  {
    scrollTo.value = 2;
    if (router.currentRoute.value.path !== "/")
    {
      await router.push("/");
    }
  }
}

const competition = {
  heading: "Competition",
  contents: [
    {
      label: "COVERMARK",
      url: "/web-sites/covermark"
    },
    {
      label: "CO.nnect",
      url: "/web-sites/connect"
    },
    {
      label: "Matsushita Hospital",
      url: "/web-sites/matsushita"
    }
  ],
  scrollTo: async (payload: MouseEvent) =>
  {
    scrollTo.value = 5;
    if (router.currentRoute.value.path !== "/")
    {
      await router.push("/");
    }
  }
}

const banner = {
  heading: "Banner",
  contents: [],
  scrollTo: async (payload: MouseEvent) =>
  {
    scrollTo.value = 8;
    if (router.currentRoute.value.path !== "/")
    {
      await router.push("/");
    }
  }
}

const illustration = {
  heading: "Illustration",
  contents: [],
  scrollTo: async (payload: MouseEvent) =>
  {
    scrollTo.value = 11;
    if (router.currentRoute.value.path !== "/")
    {
      await router.push("/");
    }
  }
}

</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

a {
  text-decoration: none;
  color: #9F9F9F;
}

.footer {
  position: relative;
  color: #101010;
  font: normal normal normal 16px/24px ZenKakuGothicNew;
  @include xd-line-spacing(16px, 24px, 4px, 3px);
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
    @include xd-line-spacing(13px, 19px, 4px, 3px);
    letter-spacing: 0.52px;
    color: #101010;
  }

  &__about-me {
    padding-top: 101px;
    padding-right: 19px;
  }
}
</style>