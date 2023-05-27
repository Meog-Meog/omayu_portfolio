<template>
    <div>
        <div id="smooth-wrapper" :class="{ dark: dark, light: !dark }" class="body">
            <div id="smooth-content" :class="{ hide: showModal }">
                <WebsiteDetailView />
                <footer-view />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const showModal = useState('showModal', () => false)

const dark = useState('dark', () => false)
const mouseStalkerText = useState('mouseStalkerText', () => '')
</script>

<style scoped>
* {
    cursor: none;
}

.body {
    transition-timing-function: ease-out;
    transition-duration: 0.3s;
}

.light {
    background-color: #fff;
    color: #000;
}

.dark {
    position: relative;
    background-color: #0F0F0F;
    color: #5A5A5A;
}

.body::after {
    content: "";
    background: url('~/assets/image/banner/bgimg.png') 0% 0% no-repeat padding-box;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    opacity: 0;
    mix-blend-mode: overlay;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
    transition: opacity 0.5s ease-in;
}

.dark.body::after {
    opacity: 1;
}

.float-button-container {
    position: fixed;
    top: 30px;
    right: 45px;
}

.hide {
    opacity: 0;
    animation: 2.25s cubic-bezier(0.4, 0, 0, 1) 1s forwards fade-out;
}
</style>
