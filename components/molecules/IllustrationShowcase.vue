<template>
    <div class="illustration-showcase__container js-is-in-view-target">
        <div class="illustration-showcase__back clickable-back" @click="back" />
        <div class="illustration-showcase__next clickable-next" @click="next" />
        <div class="illustration-showcase__display">
            <div style="position: relative; width: 100%; aspect-ratio: 1;">
                <div v-for="(item, i) of itemsWithSlotIdx" :key="i" class="illustration-showcase__item"
                    :class="{ 'illustration-showcase__slot--show': show(i), 'illustration-showcase__slot0': item.slotIdx === 0, 'illustration-showcase__slot1': item.slotIdx === 1, 'illustration-showcase__slot2': item.slotIdx === 2 }"
                    :style="{ 'z-index': itemsWithSlotIdx.length - decrement(i + 1, idx) }">
                    <img v-if="show(i)" :alt="item.alt" :src="item.image" style="width: 100%;" />
                </div>
            </div>
            <div class="illustration-showcase__item-number-container">
                <div>0{{ idx + 1 }}</div>
                <div class="illustration-showcase__item-number-separator" />
                <div>0{{ items.length }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import items from "@/assets/data/illustrationItems.js"

const itemsWithSlotIdx = items.map((item, i) =>
{
    return {
        ...item,
        slotIdx: i % 3
    }
})

const wait = (sec: number): Promise<unknown> =>
{
    return new Promise((resolve, reject) =>
    {
        setTimeout(resolve, sec * 1000);
    });
};

const increment = (x: number, delta: number = 1) => (x + delta) % itemsWithSlotIdx.length
const decrement = (x: number, delta: number = 1) => (x - delta + itemsWithSlotIdx.length) % itemsWithSlotIdx.length
const show = (pos: number) => (itemsWithSlotIdx.length + pos - idx.value) % itemsWithSlotIdx.length < 4

const idx = ref(0)
const next = async () =>
{
    const items = document.getElementsByClassName('illustration-showcase__item')
    const item = items[idx.value]
    item.classList.add('slide-out')
    await wait(0.2)
    idx.value = increment(idx.value)
}
const back = async () =>
{
    const items = document.getElementsByClassName('illustration-showcase__item')
    const item = items[decrement(idx.value)]
    item.classList.add('slide-in')
    await wait(0.2)
    idx.value = decrement(idx.value)
}

</script>

<style lang="scss" scoped>
$transition-second: 0.2s;
$animation-prop: cubic-bezier(0.17, 0.87, 1, 1);

.illustration-showcase {

    &__container {
        position: relative;
        width: 100%;
        max-width: 500px;
    }

    &__back {
        position: absolute;
        left: -10%;
        height: 100%;
        width: 50%;
        z-index: 100;
    }

    &__next {
        position: absolute;
        right: -10%;
        height: 100%;
        width: 50%;
        z-index: 100;
    }

    &__display {
        position: relative;
        width: 100%;
        max-width: 500px;
        height: fit-content;
    }

    &__item {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
        transition: opacity $transition-second $animation-prop;
        opacity: 0;
    }

    &__slot0 {
        transform: translate3d(0%, 0%, 0px) rotate(-4.2495deg);

        &.slide-out {
            animation: slide-out-0 $transition-second $animation-prop forwards;
        }

        &.slide-in {
            animation: slide-in-0 $transition-second $animation-prop forwards;
        }
    }

    &__slot1 {
        transform: translate3d(0%, 0%, 0px) rotate(4.2495deg);

        &.slide-out {
            animation: slide-out-1 $transition-second $animation-prop forwards;
        }

        &.slide-in {
            animation: slide-in-1 $transition-second $animation-prop forwards;
        }
    }

    &__slot2 {
        transform: translate3d(0%, 0%, 0px) rotate(0deg);

        &.slide-out {
            animation: slide-out-2 $transition-second $animation-prop forwards;
        }

        &.slide-in {
            animation: slide-in-2 $transition-second $animation-prop forwards;
        }
    }

    &__slot {
        &--show {
            opacity: 1;
        }

        &--prev {
            opacity: 0;
        }
    }

    &__item-number {
        &-container {
            display: flex;
            align-items: center;
            justify-content: end;
            padding-top: 70px;
            font: normal normal 300 16px/20px Roboto;
            @include xd-line-height(16px, 20px);
            letter-spacing: 0.8px;
            opacity: 1;
            margin-left: auto;

            div:nth-of-type(1) {
                color: #101010;
            }

            div:nth-of-type(3) {
                color: #909090;
            }
        }

        &-separator {
            width: 0.5px;
            height: 10px;
            background: #909090 0% 0% no-repeat padding-box;
            margin: 0 15px;
        }
    }
}

@keyframes slide-out-0 {
    0% {
        transform: translate3d(0%, 0%, 0px) rotate(-4.2495deg);
        opacity: 1;
    }

    100% {
        transform: translate3d(-8.9897%, -8.9897%, 0px) rotate(-9.4949deg);
        opacity: 0;
    }
}

@keyframes slide-in-0 {
    100% {
        transform: translate3d(0%, 0%, 0px) rotate(-4.2495deg);
        opacity: 1;
    }

    0% {
        transform: translate3d(-8.9897%, -8.9897%, 0px) rotate(-9.4949deg);
        opacity: 0;
    }
}

@keyframes slide-out-1 {
    0% {
        transform: translate3d(0%, 0%, 0px) rotate(4.2495deg);
        opacity: 1;

    }

    100% {
        transform: translate3d(8.9897%, -8.9897%, 0px) rotate(9.4949deg);
        opacity: 0;

    }
}

@keyframes slide-in-1 {
    100% {
        transform: translate3d(0%, 0%, 0px) rotate(4.2495deg);
        opacity: 1;

    }

    0% {
        transform: translate3d(8.9897%, -8.9897%, 0px) rotate(9.4949deg);
        opacity: 0;

    }
}

@keyframes slide-out-2 {
    0% {
        transform: translate3d(0%, 0%, 0px);
        opacity: 1;

    }

    100% {
        transform: translate3d(0%, -8.9897%, 0px);
        opacity: 0;

    }
}

@keyframes slide-in-2 {
    100% {
        transform: translate3d(0%, 0%, 0px);
        opacity: 1;

    }

    0% {
        transform: translate3d(0%, -8.9897%, 0px);
        opacity: 0;

    }
}
</style>