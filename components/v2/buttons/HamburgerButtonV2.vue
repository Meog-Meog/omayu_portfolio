<template>
  <button :class="{ 'hamburger-btn--active': showModal || showProfileModal }" class="hamburger-btn clickable fade-in"
    @click="toggle">
    <div class="hamburger-btn__line" />
    <div class="hamburger-btn__line" />
    <div class="hamburger-btn__line" />
  </button>
</template>

<script setup>
import { useState } from "nuxt/app";

const showProfileModal = useState('showProfileModal', () => false)
const showModal = useState('showModal', () => false)
const dark = useState('dark', () => false)
const beforeDark = useState('beforeDark', () => false)
const mouseStalkerText = useState('mouseStalkerText')


const toggle = (_) =>
{
  if (showModal.value || showProfileModal.value)
  {
    showModal.value = false
    showProfileModal.value = false
    dark.value = beforeDark.value
  } else
  {
    beforeDark.value = dark.value
    showModal.value = true
    dark.value = true
  }
}

onMounted(() =>
{
  if (process.client)
  {
    for (const clickable of document.getElementsByClassName('hamburger-btn'))
    {
      clickable.addEventListener('mouseover', () =>
      {
        mouseStalkerText.value = 'Click'
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
.hamburger-btn {
  width: 50px;
  height: 50px;
  padding: 20px 5px 19px 5px;
  z-index: 11;
  transition-timing-function: ease-out;
  transition-duration: 0.3s;
  mix-blend-mode: difference;
  cursor: none;

  &.fade-in {
    opacity: 0;
    animation: 2.25s cubic-bezier(0.4, 0, 0, 1) 1s forwards fade-in;
  }

  &--active &__line {
    background-color: #eee;
  }

  &--active &__line:nth-of-type(1) {
    width: 41px;
    transform: translateY(5px) rotate(-15.376251248826deg);
    height: 1px;
  }

  &--active &__line:nth-of-type(2) {
    opacity: 0;
  }

  &--active &__line:nth-of-type(3) {
    width: 41px;
    transform: translateY(-7px) rotate(15.376251248826deg);
    height: 1px;
  }

  &__line {
    width: 100%;
    height: 1px;
    background-color: #eeeeee55;
    margin: 0 auto 5px auto;
    transition: all .4s;
  }

  &__line:nth-of-type(3) {
    margin-bottom: 0;
  }
}
</style>