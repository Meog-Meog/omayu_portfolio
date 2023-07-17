<template>
  <div class="container">
    <img id="wsm-mock" :src="mockImg" @load="onLoad" />
  </div>
</template>

<script setup lang="ts">
interface Props
{
  mockImg: string;
}
const Props = withDefaults(defineProps<Props>(), {
  mockImg: "",
});

const { $ScrollTrigger } = useNuxtApp();
const imgLoaded = useState('imgLoaded', () => false)
const onLoad = () =>
{
  nextTick(() =>
  {
    $ScrollTrigger.refresh();
    imgLoaded.value = true;
  });
};


</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#wsm-mock {
  width: 100%;
}
</style>
