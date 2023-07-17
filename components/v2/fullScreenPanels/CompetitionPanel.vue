<template>
  <div class="container">
    <div id="cp-title">
      <img src="~/assets/image/competition/competition.svg?url" alt="Competition" />
    </div>
    <div class="number-container">
      <div>0{{ competitionIdx }}</div>
      <div class="number-separator" />
      <div>0{{ items.length }}</div>
    </div>
    <div id="cp-thumbnails-wrapper">
      <ul id="cp-thumbnails">
        <li v-for="(item, i) in items" :key="i" class="clickable-view" @click="router.push('/web-sites/' + item.id)">
          <img :alt="item.alt" :src="item.image" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import items from '@/assets/data/competitionItems.js';
const router = useRouter();
const competitionIdx = useState<Number>('competitionIdx', () => 1)
const mouseStalkerText = useState('mouseStalkerText')

onMounted(() =>
{
  if (process.client)
  {
    for (const clickable of document.getElementsByClassName('clickable-view'))
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

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100%;
  padding: 0 100px;
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
  margin-bottom: 35px;
  margin-right: 78px;
}

#cp-thumbnails-wrapper {
  position: relative;
  width: 100%;
  // height: calc((100vw - 300px)/2 * 640 / 1066);
  height: 530px;
}

#cp-thumbnails {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  gap: 0 50px;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    justify-content: center;

    /*
    &:first-of-type {
      margin-left: 150px;
    }

    &:last-of-type {
       margin-right: 170px;
    }
    */

    img {
      width: 433px;
      // width: calc((100vw - 300px)/2);
    }
  }
}

.number-container {
  position: absolute;
  left: 100px;
  top: calc(50vh + 530px / 2 - 16px);
  display: flex;
  align-items: center;
  justify-content: end;
  font: normal normal 300 16px/20px Roboto;
  @include xd-line-spacing(16px, 20px, 4px, 3px);
  letter-spacing: 0.8px;
  opacity: 1;
  margin-left: auto;

  div:nth-of-type(1) {
    color: #101010;
  }

  div:nth-of-type(3) {
    color: #909090;
  }
}

.number-separator {
  width: 0.5px;
  height: 10px;
  background: #909090 0% 0% no-repeat padding-box;
  margin: 0 15px;
}
</style>