<template>
    <div>
        <mouse-stalker />
        <hamburger-button class="float-button-container" />
        <menu-modal />
        <profile-modal />
        <div id="smooth-wrapper" class="body">
            <div class="bg-normal" />
            <div class="bg-dark" :class="{ dark: dark && !darkGrad }" />
            <div class="bg-dark--grad" :class="{ dark: darkGrad }" />
            <div id="smooth-content" :class="{ hide: showModal }">
                <slot />
                <footer-view />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const showProfileModal = useState('showProfileModal', () => false)
const showModal = useState('showModal', () => false)
const dark = useState('dark', () => false)
const darkGrad = useState('darkGrad', () => false)
const mouseStalkerText = useState('mouseStalkerText', () => '')
const smoother = useState<ScrollSmoother>('smoother')
const { $ScrollTrigger, $ScrollSmoother } = useNuxtApp();

onMounted(() =>
{
    if (process.client)
    {
        nextTick(() =>
        {
            $ScrollTrigger.normalizeScroll(true)
            smoother.value = $ScrollSmoother.create({
                smooth: 2,
                effects: true,
            })
        })

    }
    const router = useRouter()
    router.afterEach(() =>
    {
        if (process.client)
        {
            nextTick(() =>
            {
                $ScrollSmoother.refresh()
                if (smoother.value) smoother.value.kill();
                smoother.value = $ScrollSmoother.create({
                    smooth: 2,
                    effects: true,
                })
            })
        }
    })
})
</script>

<style scoped>
.float-button-container {
    position: fixed;
    top: 30px;
    right: 45px;
}

* {
    cursor: none;
}

.body {
    position: relative;
}

.bg-normal,
.bg-dark,
.bg-dark--grad {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.3s ease;
}

.bg-normal {
    background-color: #fff;
    opacity: 1;
}

.bg-dark {
    background-image: url('~/assets/image/bg01.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0;
}

.bg-dark--grad {
    background-image: url('~/assets/image/bg02.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0;
}

.dark {
    opacity: 1;
}


.hide {
    opacity: 0;
    animation: 2.25s cubic-bezier(0.4, 0, 0, 1) 1s forwards fade-out;
}
</style>