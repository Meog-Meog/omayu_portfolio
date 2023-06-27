<template>
  <nav :class="{ 'menu-modal--open': showModal }" class="menu-modal">
    <div class="menu-modal__contents">
      <img alt="Created by Meog Meog" src="~/assets/image/kv/logo_hb.svg?url" />
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
      await router.push({ path: "/", hash: "#web-page" });
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
      await router.push({ path: "/", hash: "#competition" });
    }
    smoother.value.scrollTo('.competitions__title', false, "top 70%");
  }
}

const banner = {
  heading: "Banner",
  contents: [],
  scrollTo: async (payload: MouseEvent) =>
  {
    showModal.value = false
    dark.value = false
    darkGrad.value = false
    if (router.currentRoute.value.path !== "/")
    {
      await router.push({ path: "/", hash: "#banner" });
    }
    smoother.value.scrollTo('#banner', false, "top top");
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
      await router.push({ path: "/", hash: "#illustration" });
    }
    smoother.value.scrollTo('#illustration', false, "top top");
  }
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
