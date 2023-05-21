<template>
  <nav :class="{ 'profile-modal--open': showProfileModal }" class="profile-modal">
    <div class="profile-modal__contents">
      <profile />
    </div>
  </nav>
</template>

<script setup lang="ts">
const showProfileModal = useState('showProfileModal', () => false)
</script>

<style lang="scss" scoped>
.profile-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  transition: .8s ease-out;
  width: 100%;
  margin: 0;
  z-index: 10;
  -webkit-overflow-scrolling: touch;
  opacity: 0;
  overflow: scroll;
  display: flex;
  justify-content: center;
  align-items: center;

  &--open {
    pointer-events: auto;
    opacity: 1;

    .profile-modal__contents {
      opacity: 1;
      filter: blur(0);
    }
  }
}
</style>
