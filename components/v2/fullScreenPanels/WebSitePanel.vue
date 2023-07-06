<template>
  <div class="container">
    <div class="wrapper">
      <img id="ws-title" src="~/assets/image/website/website.svg?url" alt="Web Site" />
    </div>
    <div class="wrapper">
      <div id="ws-thumbnails1" class="thumbnails">
        <div v-for="item of items.slice(0, 2)" class="thumbnail" @click="router.push('/' + item.id)">
          <img :alt="item.alt" :src="item.image" />
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div id="ws-thumbnails2" class="thumbnails">
        <div v-for="item of items.slice(2, 4)" class="thumbnail" @click="router.push('/' + item.id)">
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
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
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