<template>
    <mouse-stalker-v2 />
    <hamburger-button-v2 class="float-button-container" />
    <menu-modal />
    <profile-modal />
    <div id="smooth-wrapper" class="body">
        <div id="smooth-content">
            <slot />
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
const showMouseStalker = useState('showMouseStalker', () => true)
const mouseStalkerText = useState('mouseStalkerText', () => '')
const scrollTo = useState<string>('scrollTo', () => '')
const smoother = useState<ScrollSmoother>('smoother')
const { $ScrollTrigger, $ScrollSmoother } = useNuxtApp();

onMounted(() =>
{
    if (process.client)
    {
        if (window.innerWidth < 1133) router.replace('/sorry')
        /*
        smoother.value = $ScrollSmoother.create({
            smooth: 1,
            effects: true,
            normalizeScroll: true,
        })
        */
        window.addEventListener('mouseover', (event) =>
        {
            if (event.relatedTarget === null)
            {
                console.log('Mouse entered');
                showMouseStalker.value = true
            }
        });
        window.addEventListener('mouseout', (event) =>
        {
            if (event.relatedTarget === null)
            {
                console.log('Mouse left');
                showMouseStalker.value = false
            }
        });
    }
})

</script>

<style scoped>
.body {
    cursor: none;
}

.float-button-container {
    position: fixed;
    top: 30px;
    right: 45px;
}
</style>