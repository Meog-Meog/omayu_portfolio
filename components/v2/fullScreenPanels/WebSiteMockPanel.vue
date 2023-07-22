<template>
  <div class="container">
    <img id="wsm-bgtext" :src="textImg" @load="textLoaded = true" />
    <img id="wsm-mock" :src="mockImg" @load="onLoad" />
  </div>
</template>

<script setup lang="ts">
interface Props
{
  mockImg: string;
  textImg: string;
}
const Props = withDefaults(defineProps<Props>(), {
  mockImg: "",
  textImg: ""
});

const { $ScrollTrigger } = useNuxtApp();
const textLoaded = useState('textLoaded', () => false)
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
  width: 100vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#wsm-bgtext {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1001;
}

#wsm-mock {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 155px;
}
</style>
