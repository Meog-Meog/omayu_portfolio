<template>
    <img alt="back_to_top" src="~/assets/image/footer/logo_ft.svg?url" class="scroll-to-top-btn" @click.native="scrollTo" />
</template>

<script setup lang="ts">
const router = useRouter()
const mouseStalkerText = useState('mouseStalkerText', () => '')

const smoother = useState<ScrollSmoother>('smoother')
const scrollTo = async () =>
{
    if (router.currentRoute.value.path !== "/")
    {
        await router.push({ path: "/" });
    }
    smoother.value.scrollTop(0);
}

onMounted(() =>
{
    if (process.client)
    {
        for (const clickable of document.getElementsByClassName('scroll-to-top-btn'))
        {
            clickable.addEventListener('mouseover', () =>
            {
                mouseStalkerText.value = 'Home'
            }, false)
            clickable.addEventListener('mouseout', () =>
            {
                mouseStalkerText.value = ''
            }, false)
        }
    }
})
</script>

<style lang="scss" scoped>
.scroll-to-top-btn {
    width: 147px;
    height: 187px;
}
</style>