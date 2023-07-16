<template>
    <div id="wsd-bg">
        <div class="container">
            <div class="wsd-design-size" />
            <div id="wsd-desc-container">
                <div id="wsd-desc" class="web-site__desc-container">
                    <WebsiteDesc :captures="captures" :contents="contents" />
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div id="wsd-design" class="wsd-design-size">
            <img v-for="url of capUrls" :key="url"
                :class="{ 'web-site__design--pc': device === 'pc', 'web-site__design--sp': device === 'sp' }" :src="url"
                @load="$ScrollTrigger.refresh()" />
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

const { $ScrollSmoother, $ScrollTrigger } = useNuxtApp();
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
    z-index: 1000;
    position: absolute;
    height: 100vh;
    width: 100%;
    background-image: url('~/assets/image/bg02.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

#wsd-design {
    z-index: 1001;
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

.wsd-design-size {
    margin-right: 60px;
    width: 683px;
}

#wsd-desc-container {
    position: relative;
}

#wsd-desc {
    z-index: 1000;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
}
</style>