<template>
    <div id="website-links" style="padding: 60px 100px 150px 100px">
        <hr />
        <template v-for="(item, i) of items">
            <div class="row-with-hr" @click="router.push(item.id)">
                <div class="row">
                    <img :src="item.img" style="margin: 10px 0" />
                </div>
                <hr />
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
const mouseStalkerText = useState('mouseStalkerText')
const route = useRoute()
const router = useRouter();

const items = [
    {
        id: "/web-sites/sugoyose",
        img: "/image/lnk/lnk_sugoyose.webp"
    },
    {
        id: "/web-sites/sugoyose-springcp",
        img: "/image/lnk/lnk_springcp.webp"
    },
    {
        id: "/web-sites/sugoyose-oshikatsucp",
        img: "/image/lnk/lnk_oshikatsu.webp"
    },
    {
        id: "/web-sites/hagoromo-gakuen",
        img: "/image/lnk/lnk_hagoromo.webp"
    },
    {
        id: "/web-sites/covermark",
        img: "/image/lnk/lnk_covermark.webp"
    },
    {
        id: "/web-sites/connect",
        img: "/image/lnk/lnk_connect.webp"
    },
    {
        id: "/web-sites/matsushita",
        img: "/image/lnk/lnk_matsushita.webp"
    },
].filter((item) => item.id !== route.path)

onMounted(() =>
{
    if (process.client)
    {
        for (const clickable of document.getElementsByClassName('row-with-hr'))
        {
            clickable.addEventListener('mouseover', () =>
            {
                mouseStalkerText.value = 'View'
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
hr {
    background-color: #CCCCCC;
    height: 1px;
    border: none;
    margin: 0;
}

.row {
    display: flex;
    justify-content: center;
    align-self: center;
}

img {
    max-height: 120px;
    max-width: 100%;
}
</style>