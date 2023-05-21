<template>
    <div class="about-me__container">
        <div class="about-me__text text-link" @click="show">
            About Me
        </div>
        <div class="about-me__link">
            <a class="text-link" href="https://twitter.com/myttt33" rel="noopener" target="_blank">
                <img src="~/assets/image/footer/twitter_ft.webp" />
            </a>
        </div>
        <div class="about-me__link">
            <a class="text-link" href="https://www.instagram.com/asage_ttt/" rel="noopener" target="_blank">
                <img src="~/assets/image/footer/instagram_ft.webp" />
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useState } from "nuxt/app";

const showProfileModal = useState('showProfileModal', () => false)
const dark = useState('dark', () => false)

const show = () =>
{
    showProfileModal.value = true
    dark.value = true
}
</script>

<style lang="scss" scoped>
.about-me {

    &__container {
        padding: 0 67px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__text {
        margin-bottom: 30px;
    }

    &__link {
        margin-bottom: 30px;

        a {
            img {
                width: 23px;
                height: auto;
            }
        }
    }
}
</style>