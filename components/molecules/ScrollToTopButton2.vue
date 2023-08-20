<template>
    <button @click.native="scrollTo">
        <img alt="Back to top" src="~/assets/image/icon_arrow.svg?url" />
    </button>
</template>

<script setup lang="ts">
const router = useRouter()
const mouseStalkerText = useState('mouseStalkerText', () => '')

const smoother = useState<ScrollSmoother>('smoother')
const scrollTo = async () =>
{
    location.reload();
}
</script>

<style lang="scss" scoped>
button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    border: 1px solid #CCCCCC;
    border-radius: 50%;
    overflow: hidden;
    transition: background-color 1s;
    cursor: none;

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background-color: black;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.4s, height 0.4s;
        z-index: 1;
    }

    &:hover {
        &::before {
            width: 110%;
            height: 110%;
        }

        img {
            filter: invert(100%);
        }
    }
}

img {
    filter: 0.4s;
    z-index: 2;
}

.scroll-to-top-btn {
    width: 17px;
    height: 17px;
}
</style>