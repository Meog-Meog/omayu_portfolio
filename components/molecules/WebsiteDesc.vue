<template>
    <div>
        <external-text-link style="margin-bottom: 30px;" :label="contents.title" :url="contents.url" large />
        <div class="item">
            <h2 style="margin-bottom: 7px;">
                制作期間
            </h2>
            <p>
                {{ contents.period }}
            </p>
        </div>
        <div class="item">
            <h2 style="margin-bottom: 10px;">
                担当領域
            </h2>
            <p>
                {{ contents.area }}
            </p>
        </div>
        <div class="item">
            <h2 style="margin-bottom: 10px;">
                サービス概要
            </h2>
            <p>
                {{ contents.overview }}
            </p>
        </div>
        <div class="item">
            <h2 style="margin-bottom: 12px;">
                施策・デザイン説明
            </h2>
            <p>
                {{ contents.design }}
            </p>
        </div>
        <div v-if="contents.awards.length > 0" class="item">
            <h2 style="margin-bottom: 10px;">
                受賞歴・掲載歴
            </h2>
            <external-text-link v-for="(award, i) of contents.awards" :key="i" :label="award.name" :url="award.url" />
        </div>
        <template v-if="showDeviceLink || showPageLink">
            <hr />
            <div v-if="showDeviceLink" class="device-link">
                <p>
                    ページ切り替え
                </p>
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
    url: string,
    period: string,
    area: string,
    overview: string,
    design: string,
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
            design: "",
            awards: []
        }
    }
});

const { $ScrollSmoother, $ScrollTrigger } = useNuxtApp();

const smoother = useState<ScrollSmoother>('smoother')
const device = useState('device', () => 'pc')
const pageIdx = useState('pageIdx', () => 0)
const capUrls = useState<String[]>('capUrls', () => [])

const showPageLink = Props.captures.length > 1
const hasPcPage = Props.captures.some(c => c.cap.pc.length > 0)
const hasSpPage = Props.captures.some(c => c.cap.sp.length > 0)
const showDeviceLink = showPageLink || (hasPcPage && hasSpPage)

onMounted(() =>
{
    if (process.client)
    {
        device.value = 'pc'
        pageIdx.value = 0
        changeCaps()
    }
})

const changeCaps = () =>
{
    capUrls.value = Props.captures[pageIdx.value].cap[device.value === 'pc' ? 'pc' : 'sp']
    if (smoother.value)
    {
        smoother.value.scrollTo('.web-site__desc', false, "center center");
    }
    nextTick(() =>
    {
        $ScrollTrigger.refresh()
    })
}
const changeDevice = (d: string) =>
{
    device.value = d
    changeCaps()
}
const changePage = (idx: number) =>
{
    if (device.value === 'pc' && Props.captures[idx].cap.pc.length === 0)
    {
        device.value = 'sp'
    } else if (device.value === 'sp' && Props.captures[idx].cap.sp.length === 0)
    {
        device.value = 'pc'
    }
    pageIdx.value = idx
    changeCaps()
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
    @include xd-line-height(22px, 36px);
    letter-spacing: 0.88px;
    color: #EEEEEE;
}

.item {
    margin-bottom: 24px;
}

h2 {
    font: normal normal bold 13px/26px ZenKakuGothicNew;
    @include xd-line-height(13px, 26px);
    letter-spacing: 0px;
    color: #EEEEEE;
}

p {
    font: normal normal normal 13px/26px ZenKakuGothicNew;
    @include xd-line-height(13px, 26px);
    letter-spacing: 0px;
    color: #EEEEEE;
}

button {
    font: normal normal normal 13px/26px ZenKakuGothicNew;
    @include xd-line-height(13px, 26px);
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
    margin: 30px 0;
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
