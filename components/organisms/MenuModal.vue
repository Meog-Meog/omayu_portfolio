<template>
  <nav :class="{ 'menu-modal--open': showModal }" class="menu-modal">
    <div style="width: 100%; height: 100vh;" @click="close">
    </div>
    <div class="menu-modal__menu">
      <div class="menu-modal__menu-items">
        <link-menu-column :heading="webSite.heading" :contents="webSite.contents" :scrollTo="webSite.scrollTo" />
        <link-menu-column :heading="competition.heading" :contents="competition.contents"
          :scrollTo="competition.scrollTo" />
        <link-menu-column :heading="banner.heading" :contents="banner.contents" :scrollTo="banner.scrollTo" />
        <link-menu-column :heading="illustration.heading" :contents="illustration.contents"
          :scrollTo="illustration.scrollTo" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const router = useRouter()
const showModal = useState('showModal', () => false)
const dark = useState('dark', () => false)
const darkGrad = useState('darkGrad', () => false)
const beforeDark = useState('beforeDark', () => false)
const smoother = useState<ScrollSmoother>('smoother')
const mouseStalkerText = useState('mouseStalkerText', () => '')
const scrollTo = useState<Number>('scrollTo', () => -1)

function close()
{
  showModal.value = false
  dark.value = beforeDark.value
}

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
    showModal.value = false
    dark.value = false
    darkGrad.value = false
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
    showModal.value = false
    dark.value = false
    darkGrad.value = false
    scrollTo.value = 4;
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
    showModal.value = false
    darkGrad.value = false
    scrollTo.value = 6;
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
    showModal.value = false
    dark.value = false
    darkGrad.value = false
    scrollTo.value = 9;
    if (router.currentRoute.value.path !== "/")
    {
      await router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-modal {
  cursor: none;
  position: fixed;
  top: 0;
  right: 0;
  pointer-events: none;
  width: 100%;
  height: 100vh;
  margin: 0;
  z-index: 10;
  -webkit-overflow-scrolling: touch;
  overflow: hidden;

  &--open {
    pointer-events: auto;

    .menu-modal__menu {
      width: 230px;
      padding-right: 50px;
    }

    .menu-modal__menu-items {
      opacity: 1;
    }
  }
}

.menu-modal__menu {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 100vh;
  background-image: url('~/assets/image/bg_hb.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: right;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.menu-modal__menu-items {
  opacity: 0;
  transition: all 0.3s ease;
  padding-top: 125px;
}
</style>
