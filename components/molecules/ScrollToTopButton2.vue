<template>
    <div class="wrapper">
        <button @click.native="scrollTo">
        </button>
        <img alt="Back to top" src="~/assets/image/icon_arrow.svg?url" />
    </div>
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
.wrapper {
    position: relative;
    width: 100px;
    height: 100px;
}

button {
    position: absolute;
    left: 15px;
    top: 15px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    border: 1px solid #CCCCCC;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.3s;
    cursor: none;
    z-index: 2;

    &:hover {
        width: 100px;
        height: 100px;
        left: 0;
        top: 0;
    }
}

img {
    position: absolute;
    left: 44px;
    top: 42px;
    filter: 0.4s;
    z-index: 1;
}
</style>