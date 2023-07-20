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
const showMouseStalker = useState('showMouseStalker', () => true)

onMounted(() =>
{
    if (process.client)
    {
        if (window.innerWidth < 1133) router.replace('/sorry')
        window.addEventListener('mouseover', (event) =>
        {
            if (event.relatedTarget === null)
            {
                showMouseStalker.value = true
            }
        });
        window.addEventListener('mouseout', (event) =>
        {
            if (event.relatedTarget === null)
            {
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