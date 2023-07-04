<template>
  <div class="container">
    <div class="wrapper">
      <div id="cmp-title">
        <img src="~/assets/image/competition/competition.svg?url" alt="Competition" />
      </div>
      <div id="cmp-thumbnails">
        <ul class="competitions__items">
          <li v-for="(item, i) in items" :key="i" class="competitions__item clickable-view"
            @click="router.push('/' + item.id)">
            <img :alt="item.alt" :src="item.image" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import items from '@/assets/data/competitionItems.js';

</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

.wrapper {
  width: 100%;
}

#cmp-title {
  margin-bottom: -55px;
  position: fixed;
}

#cmp-thumbnails {
  position: relative;
  width: 100%;
  height: calc((100vw - 300px)/2 * 640 / 1066);
}

.competitions__items {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  gap: 0 15px;
}

.competitions__item {
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
</style>