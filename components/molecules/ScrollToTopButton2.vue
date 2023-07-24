<template>
    <div>
        <img alt="back_to_top" src="~/assets/image/footer/logo.svg?url" class="scroll-to-top-btn"
            @click.native="scrollTo" />
        <p class="created-by-meog-meog">
            Created<br />
            by
            <a class="text-link" href="https://github.com/orgs/Meog-Meog/people" rel="noopener" target="_blank">
                Meog Meog
            </a>
        </p>
    </div>
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
    } else
    {
        location.reload();
    }
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
a {
    text-decoration: none;
    color: #101010;
}

.scroll-to-top-btn {
    width: 147px;
    height: 149px;
    margin-bottom: 33px;
}

.created-by-meog-meog {
    font: normal normal normal 16px/30px ZenKakuGothicNew;
    @include xd-line-spacing(16px, 30px, 4px, 3px);
    letter-spacing: 0.64px;
}
</style>