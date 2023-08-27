<template>
  <div class="footer">
    <div class="footer__container">
      <div class="footer__main-contents">
        <div style="display: flex; justify-content: center;">
          <ScrollToTopButton2 />
        </div>
        <div class="footer__menu footer__text">
          <p class="text-link">
            <a class="footer__text" @click="webSite.scrollTo">Web Site</a>
          </p>
          <p class="text-link">
            <a class="footer__text" @click="competition.scrollTo">Competition</a>
          </p>
          <p class="text-link">
            <a class="footer__text" @click="banner.scrollTo">Banner</a>
          </p>
          <p class="text-link">
            <a class="footer__text" @click="illustration.scrollTo">Illustration</a>
          </p>
        </div>
      </div>
      <div>
        <img alt="Mayu Tetamoto" src="~/assets/image/mayuteramoto_ft.svg?url" style="margin-bottom: 95px; width: 733px"
          class="scroll-to-top-btn" @click.native="scrollToTop" />
        <div class="footer__menu-text" style="display: flex; justify-content: center; width: 100%; position: relative;">
          <div style="position: absolute; left: 0;">
            © {{ year }} Mayu Teramoto.
          </div>
          <div style="margin: 0 auto;">
            <p>
              Created by
              <a class="footer__menu-text text-link" href="https://github.com/orgs/Meog-Meog/people" rel="noopener"
                target="_blank" style="margin-right: -4px;">
                Meog Meog
              </a>.
            </p>
          </div>
          <div style="position: absolute; right: 0;">
            <a class="footer__menu-text text-link" href="https://twitter.com/myttt33" rel="noopener" target="_blank"
              style="margin-right: -4px;">
              X
            </a>,
            <a class="footer__menu-text text-link" href="https://www.instagram.com/asage_ttt/" rel="noopener"
              target="_blank" style="margin-left: -3px;">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const scrollTo = useState<Number>('scrollTo', () => -1)
const smoother = useState<ScrollSmoother>('smoother')
const year: number = new Date().getFullYear();
const mouseStalkerText = useState('mouseStalkerText', () => '')

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
    scrollTo.value = 9;
    if (router.currentRoute.value.path !== "/")
    {
      await router.push("/");
    }
  }
}

const scrollToTop = async () =>
{
  if (router.currentRoute.value.path !== "/")
  {
    await router.push({ path: "/" });
  } else
  {
    location.reload();
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
p {
  margin: 0;
}

a {
  text-decoration: none;
  color: #9F9F9F;
}

.footer__container {
  width: auto;
  flex: 1;
  padding: 41px 50px 40px 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.footer {
  position: relative;
  color: #101010;
  font: normal normal normal 16px/24px ZenKakuGothicNew;
  @include xd-line-spacing(16px, 24px, 4px, 3px);
  letter-spacing: 0.8px;
  width: 100vw;
  height: calc(100vh - 110px);
  display: flex;
}

.footer__text {
  color: #101010;
  letter-spacing: 0.8px;
}

.footer__menu-text {
  color: #101010;
  letter-spacing: 0.8px;
}

.footer__menu {
  position: absolute;
  top: 41px;
  right: 50px;
  text-align: right;

  & p {
    margin: 0;
    margin-bottom: 20px;
    letter-spacing: 0.8px;
    color: #101010;
  }
}
</style>