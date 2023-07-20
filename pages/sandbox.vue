<template>
    <div ref="loadingAnimation"></div>
</template>

<script setup>
definePageMeta({
    layout: "v2",
})

import lottie from 'lottie-web';
const loadingAnimation = ref(null);

onMounted(() =>
{
    if (process.client)
    {
        lottie.loadAnimation({
            container: loadingAnimation.value,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/circles-menu-1.json',
            setSpeed: 2
        });
    }
})
</script>
