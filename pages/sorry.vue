<template>
    <div class="container">
        <img src="image/sp_img/sorryforthetroubleofaccessing.svg?url" alt="Sorry for the trouble of accessing"
            class="sorry" />
        <div class="btn-wrapper">
            <a class="btn" href="https://www.instagram.com/asage_ttt/" rel="noopener" target="_blank"
                style="margin-right: 11.66%;">
                <img src="image/sp_img/icon_insta.svg?url" alt="Instagram" />
            </a>
            <a class="btn" href="https://twitter.com/myttt33" rel="noopener" target="_blank">
                <img src="image/sp_img/icon_tw.svg?url" alt="Twitter" />
            </a>
        </div>
        <img src="image/sp_img/at2023mayuteramoto.svg?url" alt="@2023 Mayu Teramoto." class="sorry" />
    </div>
</template>

<script setup>
import { createTypeReferenceDirectiveResolutionCache } from 'typescript';

definePageMeta({
    layout: "fullscreen",
})
</script>

<style scoped>
.container {
    background-image: url('~/assets/image/bg01.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

img {
    width: 100%;
}

.btn-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-self: center;
}

.btn {
    width: 14.4vw;
    aspect-ratio: 1;
    border-radius: 50%;
    border: none;

    img {
        width: 100%;
        aspect-ratio: 1;
    }
}
</style>
