<template>
    <img alt="back_to_top" :src="backToTopImg" class="scroll-to-top-btn clickable--dark"
        @click.native="scrollTo('#first-view')" />
</template>

<script setup lang="ts">
import back_to_top from 'assets/image/backtotop.webp';
const backToTopImg: string = back_to_top
const smoother = useState<ScrollSmoother>('smoother')
const scrollTo = (target: string): void =>
{
    smoother.value.scrollTo(target, false);
}
</script>

<style lang="scss" scoped>
.scroll-to-top-btn {
    width: 150px;
    height: 150px;
    margin-right: 50px;
    animation: 30s linear infinite rotation;
}

@keyframes rotation {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>