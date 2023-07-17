<template>
  <div v-show="showMouseStalker" id="mouse-stalker" :class="{ 'disable-mix-blend-mode': mouseStalkerText }">
    <div
      :class="{ 'mouse-stalker--clickable': mouseStalkerText, 'mouse-stalker--clickable--dark': mouseStalkerText && (dark || isMouseStalkerTextDark) }"
      class="mouse-stalker">
      <span>
        {{ mouseStalkerTextToShow }}
      </span>
    </div>
    <div :class="{ 'mouse-stalker__dot--clickable': mouseStalkerText }" class="mouse-stalker__dot" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useState } from "nuxt/app";

const showMouseStalker = useState('showMouseStalker', () => true)
const dark = useState('dark', () => false)
const mouseStalkerText = useState('mouseStalkerText', () => '')
const mouseStalkerTextToShow = computed(() =>
{
  return mouseStalkerText.value.replace(/--dark/g, '')
})
const isMouseStalkerTextDark = computed(() =>
{
  return mouseStalkerText.value.endsWith('--dark')
})

onMounted(() =>
{
  if (process.client)
  {
    const stalker = window.document.getElementById('mouse-stalker')
    window.document.addEventListener('mousemove', function (e)
    {
      stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)'
    })
  }
})
</script>
<style lang="scss" scoped>
#mouse-stalker {
  pointer-events: none;
  position: fixed;
  top: -40px;
  left: -40px;
  width: 80px;
  height: 80px;
  z-index: 100;
  mix-blend-mode: difference;
}

.disable-mix-blend-mode {
  mix-blend-mode: normal !important;
}

.mouse-stalker {
  border: 1px solid #efefef66;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  top: 20px;
  left: 20px;
  position: absolute;
  transition: all 0.3s;
}

.mouse-stalker--clickable {
  background-color: #000;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -20px;
  left: -20px;
  border-color: #000;
}

.mouse-stalker--clickable--dark {
  background-color: #fff;
  border-color: #fff;
}

.mouse-stalker__dot {
  background-color: #efefef;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  top: 38px;
  left: 38px;
  position: absolute;
}

.mouse-stalker__dot--clickable {
  opacity: 0;
}

.mouse-stalker--clickable span {
  font: normal normal normal 16px/24px A1GothicStd;
  @include xd-line-spacing(16px, 24px, 4px, 3px);
  letter-spacing: 0.64px;
  color: #eee;
}

.mouse-stalker--clickable--dark span {
  color: #101010;
}
</style>