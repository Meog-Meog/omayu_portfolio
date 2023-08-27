<template>
  <div class="container">
    <div style="position: relative; width: 100%;">
      <img id="kv-fullname" src="~/assets/image/kv/mayuteramoto.svg?url" alt="Mayu Teramoto">
      <div id="kv-menu" style="position: absolute; top:0px; right: 50px; text-align: right;">
        <p class="text-link">
          <a :class="{ dark: dark }" @click="scrollToWebSite">Web Site</a>
        </p>
        <p class="text-link">
          <a :class="{ dark: dark }" @click="scrollToCompetition">Competition</a>
        </p>
        <p class="text-link">
          <a :class="{ dark: dark }" @click="scrollToBanner">Banner</a>
        </p>
        <p class="text-link">
          <a :class="{ dark: dark }" @click="scrollToIllustration">Illustration</a>
        </p>
      </div>
    </div>
    <div id="kv-scrolling-hint">
      <span style="position: absolute; left: 50px;">
        Web Designer.
      </span>
      <span class="text-link" style="position: absolute; right: 50px;" @click="showAboutMe">
        About Me!
      </span>
      <ScrollingHint />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useState } from "nuxt/app";

const showProfileModal = useState('showProfileModal', () => false)
const dark = useState('dark', () => false)
const scrollTo = useState<Number>('scrollTo', () => -1)

const showAboutMe = () =>
{
  showProfileModal.value = true
  dark.value = true
}

const scrollToWebSite = () =>
{
  scrollTo.value = 2;
}
const scrollToCompetition = () =>
{
  scrollTo.value = 4;
}
const scrollToBanner = () =>
{
  scrollTo.value = 6;
}
const scrollToIllustration = () =>
{
  scrollTo.value = 9;
}

</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('~/assets/image/bg05.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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

p {
  margin: 0;
  margin-bottom: 20px;
  letter-spacing: 1.4px;
  color: #101010;
}

span {
  font: normal normal normal 16px/24px ZenKakuGothicNew;
  @include xd-line-spacing(16px, 24px, 4px, 3px);
  letter-spacing: 1.4px;
  color: #101010;
}
</style>
