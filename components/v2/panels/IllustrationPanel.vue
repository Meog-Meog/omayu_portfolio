<template>
  <div class="container">
    <div class="wrapper">
      <img id="il__title" src="~/assets/image/illustration/Illustration.svg?url" alt="Illustration" />
      <div id="il__showcase-wrapper">
        <illustration-showcase-v2 id="il__showcase" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url('~/assets/image/bg04.webp');
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
}

.wrapper {
  display: flex;
  align-items: center;
  padding-top: 70px;
  padding-left: 150px;
  margin-bottom: 86px;
}

#il__title {
  width: 100%;
  max-width: 477px;
  height: auto;
}

#il__showcase-wrapper {
  position: relative;
  margin-right: 150px;
  margin-left: 75px;
  width: 50vw;
  display: flex;
  justify-content: center;
}

#il__showcase {
  margin-bottom: -86px;
}
</style>