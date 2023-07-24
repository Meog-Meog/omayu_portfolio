<template>
  <nav :class="{ 'menu-modal--open': showModal }" class="menu-modal">
    <div class="menu-modal__contents">
      <div style="display: flex; align-items: flex-end;">
        <img class="scroll-to-top-btn" alt="Created by Meog Meog" src="~/assets/image/footer/logo_w.svg?url"
          @click.native="scrollToTop" />
        <p class="created-by-meog-meog">
          Created<br />
          by
          <a class="text-link" href="https://github.com/orgs/Meog-Meog/people" rel="noopener" target="_blank">
            Meog Meog
          </a>
        </p>
      </div>
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
const scrollTo = useState<Number>('scrollTo', () => -1)

const scrollToTop = async () =>
{
  dark.value = false
  darkGrad.value = false
  showModal.value = false
  if (router.currentRoute.value.path !== "/")
  {
    await router.push({ path: "/" });
  }
  location.reload();
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
    showModal.value = false
    darkGrad.value = false
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
    showModal.value = false
    dark.value = false
    darkGrad.value = false
    scrollTo.value = 11;
    if (router.currentRoute.value.path !== "/")
    {
      await router.push("/");
    }
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
a {
  text-decoration: none;
  color: #EEEEEE;
}

.scroll-to-top-btn {
  width: 147px;
  height: 149px;
  margin-right: 45px;
}

.created-by-meog-meog {
  font: normal normal normal 16px/30px ZenKakuGothicNew;
  @include xd-line-spacing(16px, 30px, 4px, 3px);
  letter-spacing: 0.64px;
  color: #EEEEEE;
}

.menu-modal {
  cursor: none;
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

  background-image: url('~/assets/image/bg01.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &--open {
    transition: .1s ease-out;
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
