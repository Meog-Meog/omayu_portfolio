<template>
  <button :class="{'hamburger-btn--active': showModal}" class="hamburger-btn clickable" @click="toggle">
    <div class="hamburger-btn__line"/>
    <div class="hamburger-btn__line"/>
    <div class="hamburger-btn__line"/>
  </button>
</template>

<script setup>
import {useState} from "nuxt/app";

const showModal = useState('showModal', () => false)
const dark = useState('dark', () => false)

const toggle = (e) => {
  showModal.value = !showModal.value
  dark.value = !dark.value
}
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

  &--active &__line {
    background-color: #707070;
  }

  &--active &__line:nth-of-type(1) {
    width: 41px;
    transform: translateY(6px) rotate(-15.376251248826deg);
  }

  &--active &__line:nth-of-type(2) {
    opacity: 0;
  }

  &--active &__line:nth-of-type(3) {
    width: 41px;
    transform: translateY(-6px) rotate(15.376251248826deg);
  }

  &__line {
    width: 100%;
    height: 1px;
    background-color: #fff;
    margin: 0 auto 5px auto;
    transition: all .4s;
  }

  &__line:nth-of-type(3) {
    margin-bottom: 0;
  }
}
</style>