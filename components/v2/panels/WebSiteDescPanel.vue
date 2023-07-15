<template>
    <div id="wsd-bg" />
    <div class="container">
        <div id="wsd-design">
            <img v-for="url of capUrls" :key="url"
                :class="{ 'web-site__design--pc': device === 'pc', 'web-site__design--sp': device === 'sp' }" :src="url" />
        </div>
        <div id="wsd-desc-container">
            <div id="wsd-desc" class="web-site__desc-container">
                <WebsiteDesc :captures="captures" :contents="contents" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Award
{
    name: string;
    url: string;
}
interface Contents
{
    title: string,
    url: string,
    period: string,
    area: string,
    overview: string,
    design: Array<string>,
    awards: Array<Award>
}
interface CaptureImg
{
    pc: Array<string>;
    sp: Array<string>;
}
interface Capture
{
    label: string;
    cap: CaptureImg;
}
interface Props
{
    captures: Array<Capture>;
    contents: Contents;
}
const Props = withDefaults(defineProps<Props>(), {
    captures: () =>
        [
            {
                label: "Page name", cap: { pc: [], sp: [] }
            }
        ],
    contents: () =>
    {
        return {
            title: "",
            url: "",
            period: "",
            area: "",
            overview: "",
            design: [""],
            awards: []
        }
    }
});

const capUrls = useState('capUrls', () => [])
const device = useState('device', () => 'pc')

</script>

<style lang="scss" scoped>
.container {
    min-height: 100vh;
    width: 100vw;
    position: relative;
    text-align: center;
    display: flex;
    padding: 150px 100px;
}

#wsd-bg {
    position: fixed;
    height: 100vh;
    width: 100%;
    background-image: url('~/assets/image/bg02.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

#wsd-design {
    margin-right: 60px;
    z-index: 100;
    width: 683px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    img.web-site__design--pc {
        width: 100%;
    }

    img.web-site__design--sp {
        width: 213px;
    }

    img.web-site__design--sp:not(:last-child) {
        margin-right: 40px;
    }
}

#wsd-desc-container {
    position: relative;
}

#wsd-desc {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
}
</style>