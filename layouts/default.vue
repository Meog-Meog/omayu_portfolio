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
            <div id="smooth-content" :class="{ hide: showModal || showProfileModal }">
                <slot />
                <footer-view />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const showProfileModal = useState('showProfileModal', () => false)
const showModal = useState('showModal', () => false)
const dark = useState('dark', () => false)
const darkGrad = useState('darkGrad', () => false)
const mouseStalkerText = useState('mouseStalkerText', () => '')
const scrollTo = useState<string>('scrollTo', () => '')
const smoother = useState<ScrollSmoother>('smoother')
const { $ScrollTrigger, $ScrollSmoother } = useNuxtApp();

onMounted(() =>
{
    if (window.innerWidth < 1133)
    {
        router.replace('/sorry')
    }
    if (process.client)
    {
        nextTick(() =>
        {
            $ScrollTrigger.normalizeScroll(true)
            smoother.value = $ScrollSmoother.create({
                smooth: 1,
                effects: true,
            })
        })

    }
    router.afterEach(() =>
    {
        if (process.client)
        {
            nextTick(() =>
            {
                $ScrollSmoother.refresh()
                if (smoother.value) smoother.value.kill();
                smoother.value = $ScrollSmoother.create({
                    smooth: 1.5,
                    effects: true,
                })
            })
        }
    })
})

watch(route, value =>
{
    showModal.value = false
    if (scrollTo.value !== 'banner')
    {
        dark.value = false
    }
    darkGrad.value = false
    mouseStalkerText.value = ''
    showProfileModal.value = false
}, { deep: true, immediate: true })

watch(showModal, value =>
{
    function disableScroll(event: Event)
    {
        event.preventDefault();
    }
    if (value)
    {
        document.body.classList.add('overflow-hidden');
    }
    else
    {
        document.body.classList.remove('overflow-hidden');
    }
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