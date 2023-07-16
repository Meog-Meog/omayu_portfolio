<template>
  <div class="container">
    <div class="wrapper">
      <div id="cp-title">
        <img src="~/assets/image/competition/competition.svg?url" alt="Competition" />
      </div>
      <div id="cp-thumbnails-wrapper">
        <ul id="cp-thumbnails">
          <li v-for="(item, i) in items" :key="i" class="clickable-view" @click="router.push('/web-sites/' + item.id)">
            <img :alt="item.alt" :src="item.image" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import items from '@/assets/data/competitionItems.js';
const router = useRouter();
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

.wrapper {
  width: 100%;
}

#cp-title {
  margin-bottom: -55px;
}

#cp-thumbnails-wrapper {
  position: relative;
  width: 100%;
  height: calc((100vw - 300px)/2 * 640 / 1066);
  opacity: 0;
  visibility: hidden;
}

#cp-thumbnails {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  gap: 0 15px;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-of-type {
      margin-left: 150px;
    }

    &:last-of-type {
      margin-right: 170px;
    }

    img {
      width: calc((100vw - 300px)/2);
    }
  }
}
</style>