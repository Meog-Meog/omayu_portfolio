<template>
  <nav :class="{ 'menu-modal--open': showModal }" class="menu-modal">
    <div class="menu-modal__contents">
      <img class="scroll-to-top-btn" alt="Created by Meog Meog" src="~/assets/image/kv/logo_hb.svg?url"
        @click.native="scrollToTop" />
      <hr />
      <div class="menu-modal__menu">
        <link-menu-column style="margin-right: 104px;" :heading="webSite.heading" :contents="webSite.contents"
          :scrollTo="webSite.scrollTo" dark />
        <link-menu-column style="margin-right: 100px;" :heading="competition.heading" :contents="competition.contents"
          :scrollTo="competition.scrollTo" dark />
        <link-menu-column style="margin-right: 130px;" :heading="banner.heading" :contents="banner.contents"
          :scrollTo="banner.scrollTo" dark />
        <link-menu-column :heading="illustration.heading" :contents="illustration.contents"
          :scrollTo="illustration.scrollTo" dark />
      </div>
    </div>

  </nav>
</template>

<script setup lang="ts">
const router = useRouter()
const showModal = useState('showModal', () => false)
const dark = useState('dark', () => false)
const darkGrad = useState('darkGrad', () => false)
const smoother = useState<ScrollSmoother>('smoother')
const mouseStalkerText = useState('mouseStalkerText', () => '')
const scrollTo = useState<string>('scrollTo', () => '')

const scrollToTop = async () =>
{
  dark.value = false
  darkGrad.value = false
  showModal.value = false
  if (router.currentRoute.value.path !== "/")
  {
    await router.push({ path: "/" });
  }
  smoother.value.scrollTop(0);
}

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
    showModal.value = false
    dark.value = false
    darkGrad.value = false
    if (router.currentRoute.value.path !== "/")
    {
      scrollTo.value = "web-site";
      await router.push("/");
    }
    nextTick(() =>
    {
      smoother.value.scrollTo('.web-sites__title', false, "top top");
    });
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
    showModal.value = false
    dark.value = false
    darkGrad.value = false
    if (router.currentRoute.value.path !== "/")
    {
      scrollTo.value = "competition";
      await router.push("/");
    }
    smoother.value?.scrollTo('#competition', true, "center center");
  }
}

const banner = {
  heading: "Banner",
  contents: [],
  scrollTo: async (payload: MouseEvent) =>
  {
    showModal.value = false
    darkGrad.value = false
    scrollTo.value = "banner";
    if (router.currentRoute.value.path !== "/")
    {
      scrollTo.value = "banner";
      await router.push("/");
    } else
    {
      smoother.value?.scrollTo('.banners__title-container', false, "top top");
    }
  }
}

const illustration = {
  heading: "Illustration",
  contents: [],
  scrollTo: async (payload: MouseEvent) =>
  {
    showModal.value = false
    dark.value = false
    darkGrad.value = false
    if (router.currentRoute.value.path !== "/")
    {
      scrollTo.value = "illustration";
      await router.push("/");
    }
    smoother.value.scrollTo('#illustration', false, "top top");
  }
}

onMounted(() =>
{
  if (process.client)
  {
    for (const clickable of document.getElementsByClassName('scroll-to-top-btn'))
    {
      clickable.addEventListener('mouseover', () =>
      {
        mouseStalkerText.value = 'Home'
      }, false)
      clickable.addEventListener('mouseout', () =>
      {
        mouseStalkerText.value = ''
      }, false)
    }
  }
})
</script>

<style lang="scss" scoped>
.menu-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  width: 100%;
  margin: 0;
  z-index: 10;
  -webkit-overflow-scrolling: touch;
  opacity: 0;
  overflow: scroll;

  &--open {
    transition: .8s ease-out;
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
  }

}
</style>
