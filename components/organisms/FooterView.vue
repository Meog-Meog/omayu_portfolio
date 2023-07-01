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
const scrollTo = useState<string>('scrollTo', () => '')
const smoother = useState<ScrollSmoother>('smoother')
const year: number = new Date().getFullYear();

const webSite = {
  heading: "Web Site",
  contents: [
    {
      label: "Sugoyose",
      url: "/sugoyose"
    },
    {
      label: "Spring Campaign",
      url: "/sugoyose-springcp"
    },
    {
      label: "Oshikatsu",
      url: "/sugoyose-oshikatsucp"
    },
    {
      label: "Hagoromo Academy",
      url: "/hagoromo-gakuen"
    }
  ],
  scrollTo: async (payload: MouseEvent) =>
  {
    if (router.currentRoute.value.path !== "/")
    {
      scrollTo.value = "web-site";
      await router.push("/");
    }
    else
    {
      nextTick(() =>
      {
        smoother.value.scrollTo('.web-sites__title', false, "top top");
      });
    }
  }
}

const competition = {
  heading: "Competition",
  contents: [
    {
      label: "COVERMARK",
      url: "/covermark"
    },
    {
      label: "CO.nnect",
      url: "/connect"
    },
    {
      label: "Matsushita Hospital",
      url: "/matsushita"
    }
  ],
  scrollTo: async (payload: MouseEvent) =>
  {
    if (router.currentRoute.value.path !== "/")
    {
      scrollTo.value = "competition";
      await router.push("/");
    }
    else
    {
      nextTick(() =>
      {
        smoother.value?.scrollTo('#competition', true, "center center");
      });
    }
  }
}

const banner = {
  heading: "Banner",
  contents: [],
  scrollTo: async (payload: MouseEvent) =>
  {
    if (router.currentRoute.value.path !== "/")
    {
      scrollTo.value = "banner";
      await router.push("/");
    } else
    {
      nextTick(() =>
      {
        smoother.value.scrollTo('#banner', false, "top top");
      });
    }
  }
}

const illustration = {
  heading: "Illustration",
  contents: [],
  scrollTo: async (payload: MouseEvent) =>
  {
    if (router.currentRoute.value.path !== "/")
    {
      scrollTo.value = "illustration";
      await router.push("/");
    }
    nextTick(() =>
    {
      smoother.value.scrollTo('#illustration', false, "top top");
    });
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