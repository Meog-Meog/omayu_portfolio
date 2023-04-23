<template>
  <div id="mouse-stalker" :class="{'disable-mix-blend-mode': mouseStalkerText}">
    <div
        :class="{'mouse-stalker--clickable': mouseStalkerText, 'mouse-stalker--clickable--dark': mouseStalkerText && (dark || isMouseStalkerTextDark)}"
        class="mouse-stalker"
    >
      <span>
        {{ mouseStalkerTextToShow }}
      </span>
    </div>
    <div :class="{'mouse-stalker__dot--clickable': mouseStalkerText}" class="mouse-stalker__dot"/>
  </div>
</template>

<script>
export default {
  name: 'mouse-stalker'
}
</script>

<script setup>
import {onMounted} from "vue";
import {useState} from "nuxt/app";

const dark = useState('dark', () => false)
const mouseStalkerText = useState('mouseStalkerText', () => '')
const mouseStalkerTextToShow = computed(() => {
  return mouseStalkerText.value.replace(/--dark/g, '')
})
const isMouseStalkerTextDark = computed(() => {
  return mouseStalkerText.value.endsWith('--dark')
})

onMounted(() => {
  if (process.client) {
    const stalker = window.document.getElementById('mouse-stalker')
    window.document.addEventListener('mousemove', function (e) {
      stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)'
    })
  }
})
</script>
<style scoped>
#mouse-stalker {
  pointer-events: none;
  position: fixed;
  top: -60px;
  left: -60px;
  width: 120px;
  height: 120px;
  z-index: 100;
  mix-blend-mode: difference;
}

.disable-mix-blend-mode {
  mix-blend-mode: normal !important;
}

.mouse-stalker {
  border: 1px solid #ffffff55;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  top: 30px;
  left: 30px;
  position: absolute;
}

.mouse-stalker--clickable {
  background-color: #000;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  top: 0;
  left: 0;
  border-color: #000;
}

.mouse-stalker--clickable--dark {
  background-color: #fff;
  border-color: #fff;
}

.mouse-stalker__dot {
  background-color: #fff;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  top: 58px;
  left: 58px;
  position: absolute;
}

.mouse-stalker__dot--clickable {
  opacity: 0;
}

.mouse-stalker--clickable span {
  font: normal normal normal 16px/24px A1GothicStd;
  letter-spacing: 0.64px;
  color: #fff;
}

.mouse-stalker--clickable--dark span {
  color: #000;
}

</style>