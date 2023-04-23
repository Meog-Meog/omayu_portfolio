<template>
    <div class="scrolling-hint">
        <div class="scrolling-hint-circle" />
        <div class="scrolling-hint-bar" />
    </div>
</template>

<style lang="scss" scoped>
$height: 70px;
$circle-diameter: 9px;
$color: #101010;

.scrolling-hint {
    position: relative;
    height: $height;
    width: $circle-diameter + 1px;
    display: flex;
    justify-content: center;

    &-circle {
        width: $circle-diameter;
        height: $circle-diameter;
        border-radius: 50%;
        background-color: $color;
        position: absolute;
        animation: scrolling-hint-animation 2.3s linear infinite;
    }

    &-bar {
        width: 1px;
        height: 100%;
        background-color: $color;
    }
}

@keyframes scrolling-hint-animation {
    0% {
        opacity: 0;
        top: 0;
    }

    30% {
        opacity: 1;
    }

    70% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        top: calc(100% - 0px);
    }
}
</style>
