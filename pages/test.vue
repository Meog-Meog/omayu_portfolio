<template>
    <div style="background-color: #fff;">
        <illustration-panel />
    </div>
</template>

<script setup>
definePageMeta({
    layout: "v2",
})

const { $gsap, $ScrollTrigger } = useNuxtApp();
</script>
