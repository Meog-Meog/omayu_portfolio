<template>
  <div class="container">
    <div id="ws-title" class="wrapper">
    </div>
    <div class="wrapper">
      <div id="ws-thumbnails1" class="thumbnails">
        <div v-for="item of items.slice(0, 2)" class="thumbnail" @click="router.push('/web-sites/' + item.id)">
          <img :alt="item.alt" :src="item.image" />
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div id="ws-thumbnails2" class="thumbnails">
        <div v-for="item of items.slice(2, 4)" class="thumbnail" @click="router.push('/web-sites/' + item.id)">
          <img :alt="item.alt" :src="item.image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import items from "@/assets/data/webSiteItems.js";
const router = useRouter();
const mouseStalkerText = useState('mouseStalkerText')

onMounted(() =>
{
  if (process.client)
  {
    for (const clickable of document.getElementsByClassName('thumbnail'))
    {
      clickable.addEventListener('mouseover', () =>
      {
        mouseStalkerText.value = 'View'
      }, false)
      clickable.addEventListener('mouseout', () =>
      {
        mouseStalkerText.value = ''
      }, false)
    }
  }
})
</script>

<style scoped lang="scss">
$w: 832px; // 背景画像の幅
$v: 40px; // 毎秒の移動速度
$t: $w / $v; // アニメーションの期間

#ws-title {
  width: 100%;
  background: url('~/assets/image/website/website.svg?url') repeat-x;
  background-position: center center;
  animation: scroll-anim #{$t}s linear infinite;
}

@keyframes scroll-anim {
  100% {
    background-position: -#{$w} center;
  }
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url('~/assets/image/bg03.webp');
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}

.wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.thumbnails {
  display: flex;
  gap: 100px;
  padding: 0 100px;

  .thumbnail {
    flex: 1;

    img {
      width: 100%;
      height: auto;
    }
  }
}

#ws-thumbnails1 {
  .thumbnail:nth-of-type(1) {
    margin-bottom: 100px;
  }

  .thumbnail:nth-of-type(2) {
    margin-top: 100px;
  }
}

#ws-thumbnails2 {
  .thumbnail:nth-of-type(1) {
    margin-top: 100px;
  }

  .thumbnail:nth-of-type(2) {
    margin-bottom: 100px;
  }
}
</style>