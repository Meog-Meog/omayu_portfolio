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
  cursor: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  width: 100%;
  margin: 0;
  z-index: 10;
  -webkit-overflow-scrolling: touch;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url('~/assets/image/bg01.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &--open {
    transition: .1s ease-out;
    pointer-events: auto;
    opacity: 1;

    .profile-modal__contents {
      opacity: 1;
      filter: blur(0);
    }
  }
}
</style>
