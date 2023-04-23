<template>
  <nav :class="{ 'profile-modal--open': showModal }" class="profile-modal">
    <div class="profile-modal__contents">
      <ul class="profile-modal__nav-menu">
        <li>
          <img src="~/assets/image/textimg/hb/web_site.svg?url" class="js-is-in-view-target" alt="Web Site"
            @click="hideModalAndScrollTo('#web-page')" />
        </li>
        <li>
          <img src="~/assets/image/textimg/hb/Banner.svg?url" class="js-is-in-view-target" alt="Banner"
            @click="hideModalAndScrollTo('#banner')" />
        </li>
        <li>
          <img src="~/assets/image/textimg/hb/Illustration.svg?url" class="js-is-in-view-target" alt="Illustration"
            @click="hideModalAndScrollTo('#illustration')" />
        </li>
      </ul>
      <hr>
      <profile />
    </div>
  </nav>
</template>

<script setup lang="ts">
const showModal = useState('showModal', () => false)
const dark = useState('dark', () => false)
const smoother = useState<ScrollSmoother>('smoother')
const hideModalAndScrollTo = (target: string) =>
{
  showModal.value = false
  dark.value = false
  smoother.value.scrollTo(target, false);
}
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
  background-color: #000;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0;
  overflow: scroll;

  &--open {
    pointer-events: auto;
    opacity: 1;

    .profile-modal__contents {
      opacity: 1;
      filter: blur(0);
    }
  }

  &__contents {
    padding: 100px 90px;

    hr {
      margin-bottom: 100px;
      background-color: #3B3B3B;
      height: 0.5px;
      border: none;
    }
  }

  &__nav-menu {
    margin-bottom: 50px;

    li {
      margin-bottom: 50px;
      font-size: 170px;
      line-height: 1em;
      font-family: Valery, serif;
      color: #5A5A5A;
    }

    li img {
      transition-duration: .5s;
    }

    li img:hover {
      opacity: 0.4;
    }
  }
}
</style>
