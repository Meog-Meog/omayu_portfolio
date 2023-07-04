<template>
  <div class="container">
    <img id="kv-fullname" src="~/assets/image/kv/mayuteramoto.svg?url" alt="Mayu Teramoto" />
    <div id="kv-scrolling-hint">
      <ScrollingHint />
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

#kv-fullname {
  width: 100%;
  opacity: 0;
}

#kv-scrolling-hint {
  opacity: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
