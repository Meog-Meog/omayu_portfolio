<template>
    <div style="text-align: left;">
        <external-text-link :style="{ 'margin-bottom': contents.overview ? '30px' : '30px' }" :label="contents.title"
            :url="contents.url" large :letter-spacing="contents.titleLetterSpacihg" />
        <div v-if="contents.overview" style="margin-bottom: 30px;">
            <p>
                {{ contents.overview }}
            </p>
        </div>
        <hr style="margin-bottom: 25px;" />
        <div style="margin-bottom: 10px;">
            <p>
                {{ contents.period }}
            </p>
        </div>
        <div style="margin-bottom: 30px;">
            <p class="desc">
                {{ contents.area }}
            </p>
        </div>
        <div style="margin-bottom: 32px;">
            <p class="desc">
                <template v-for="d of contents.design">
                    {{ d }}
                    <br>
                </template>
            </p>
        </div>
        <div v-if="contents.awards.length > 0" style="margin-bottom: 34px;">
            <external-text-link v-for="(award, i) of contents.awards" :key="i" :label="award.name" :url="award.url"
                style="margin-bottom: 10px;" />
        </div>
        <template v-if="showDeviceLink || showPageLink">
            <hr style="margin-bottom: 30px;" />
            <div class="device-link">
                <p>
                    ページ切り替え
                </p>
                <template v-if="showDeviceLink">
                    <button v-if="captures[pageIdx].cap['pc'].length" class="icon-btn"
                        :class="{ 'icon-btn--active': device === 'pc' }" @click="changeDevice('pc')">
                        <img v-if="device === 'pc'" src="~/assets/image/icon/icon_desktop_eee.svg?url" />
                        <img v-else src="~/assets/image/icon/icon_desktop_6a6a6a.svg?url" />
                    </button>
                    <button v-if="captures[pageIdx].cap['sp'].length" class="icon-btn"
                        :class="{ 'icon-btn--active': device === 'sp' }" @click="changeDevice('sp')">
                        <img v-if="device === 'sp'" src="~/assets/image/icon/icon_phone_eee.svg?url" />
                        <img v-else src="~/assets/image/icon/icon_phone_6a6a6a.svg?url" />
                    </button>
                </template>
            </div>
            <div v-if="showPageLink" class="page-link">
                <span v-for="(page, i) of captures" :key="i">
                    <button class="text-btn" :class="{ 'text-btn--active': i === pageIdx }" @click="changePage(i)">
                        <span>
                            {{ page.label }}
                        </span>
                    </button>
                </span>
            </div>
        </template>
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
    titleLetterSpacihg: string,
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
            titleLetterSpacihg: "0px",
            url: "",
            period: "",
            area: "",
            overview: "",
            design: [""],
            awards: []
        }
    }
});

const { $gsap, $ScrollSmoother, $ScrollTrigger } = useNuxtApp();

const smoother = useState<ScrollSmoother>('smoother')
const device = useState('device', () => 'pc')
const deviceToShow = useState('deviceToShow', () => 'pc')
const pageIdx = useState('pageIdx', () => 0)
const capUrls = useState<String[]>('capUrls', () => [])
const capUrlsToShow = useState<String[]>('capUrlsToShow', () => [])
const capUrlsLoading = useState('capUrlsLoading', () => false)

const showPageLink = Props.captures.length > 1
const hasPcPage = Props.captures.some(c => c?.cap?.pc?.length > 0)
const hasSpPage = Props.captures.some(c => c?.cap?.sp?.length > 0)
const showDeviceLink = hasPcPage && hasSpPage

onMounted(() =>
{
    if (process.client)
    {
        device.value = 'pc'
        deviceToShow.value = 'pc'
        pageIdx.value = 0
        changeCaps()
        capUrlsToShow.value = capUrls.value
    }
})

const changeCaps = () =>
{
    capUrlsLoading.value = true
    capUrls.value = Props.captures[pageIdx.value].cap[device.value === 'pc' ? 'pc' : 'sp']
}
const changeDevice = (d: string) =>
{
    if (device.value !== d)
    {
        device.value = d
        changeCaps()
    }
}
const changePage = (idx: number) =>
{
    if (pageIdx.value !== idx)
    {
        if (device.value === 'pc' && Props.captures[idx]?.cap?.pc?.length === 0)
        {
            device.value = 'sp'
        } else if (device.value === 'sp' && Props.captures[idx]?.cap?.sp?.length === 0)
        {
            device.value = 'pc'
        }
        pageIdx.value = idx
        changeCaps()
    }
}
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    cursor: none;
}

h1 {
    margin-bottom: 30px;
    font: normal normal bold 22px/36px ZenKakuGothicNew;
    @include xd-line-spacing(22px, 36px, 4px, 3px);
    letter-spacing: 0.88px;
    color: #EEEEEE;
}

h2 {
    font: normal normal bold 13px/26px ZenKakuGothicNew;
    @include xd-line-spacing(13px, 26px, 4px, 3px);
    letter-spacing: 0px;
    color: #EEEEEE;
}

p {
    font: normal normal normal 13px/26px ZenKakuGothicNew;
    @include xd-line-spacing(13px, 26px, 4px, 3px);
    letter-spacing: 0px;
    color: #EEEEEE;
}

.desc {
    font: normal normal normal 13px/28px ZenKakuGothicNew;
    @include xd-line-spacing(13px, 28px, 4px, 3px);
}

button {
    font: normal normal normal 13px/26px ZenKakuGothicNew;
    @include xd-line-spacing(13px, 26px, 4px, 3px);
    letter-spacing: 0px;
    color: #6A6A6A;
    display: flex;
    align-items: center;
    justify-content: center;
}

button.active {
    color: #EEEEEE;
}

hr {
    background-color: #2c2c2c;
    height: 1px;
    border: none;
}

.device-link {
    display: flex;
    align-self: center;
    margin-bottom: 20px;

    p {
        margin: 0;
        margin-right: 25px;
    }

    button:not(:last-child) {
        margin-right: 30px;
    }
}

.page-link {
    display: flex;
    align-self: center;

    button {
        margin-right: 20px;
    }
}
</style>
