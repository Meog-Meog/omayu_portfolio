<template>
    <div class="web-site__container">
        <img data-speed="0.1" class="web-site__text fade-in" :src="textImg" @load="onTextImgLoad" />
        <img class="web-site__mock slide-in" :src="mockImg" @load="onMockImgLoad" />
        <div class="web-site__body">
            <div class="web-site__design">
                <img v-for="url of capUrls" :key="url"
                    :class="{ 'web-site__design--pc': device === 'pc', 'web-site__design--sp': device === 'sp' }" :src="url"
                    @load="onCapImgLoad" />
            </div>
            <div class="web-site__desc-container">
                <div class="web-site__desc">
                    <WebsiteDesc :captures="captures" :contents="contents" />
                </div>
            </div>
        </div>
    </div>
    <div class="web-site__link">
        <WebsiteLinks :page-id="pageId" />
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
    textImg: string;
    mockImg: string;
    captures: Array<Capture>;
    contents: Contents;
}
const Props = withDefaults(defineProps<Props>(), {
    textImg: "",
    mockImg: "",
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

const route = useRoute()
const pageId = route.name?.toString() ?? ""

const { $gsap, $ScrollSmoother, $ScrollTrigger } = useNuxtApp();
const dark = useState('dark')
const darkGrad = useState('darkGrad')
const capUrls = useState('capUrls', () => [])
const device = useState('device', () => 'pc')
const imageLoadCounter = ref(0)


// capUrlsをwatchし、capUrlsが変更されたときにimageLoadCounterを更新
watch(capUrls, () =>
{
    imageLoadCounter.value++
})

const textImgGsapId = "web-site__text"
const mockImgGsapId = "web-site__mock"
const darkModeGsapId = "webpage--darkMode"
const fixDescGsapId = "webpage--fixDesc"
const showLinksGsapId = "webpage--showLinks"
const hideTextGsapId = "webpage--hideText"

const onTextImgLoad = () =>
{
    nextTick(() =>
    {
        $gsap.to(".web-site__text", {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
                id: textImgGsapId,
                trigger: ".web-site__text",
                start: "top top",  // when the top of the trigger hits the top of the viewport
                end: "bottom top",  // when the bottom of the trigger hits the top of the viewport
                scrub: true,  // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                once: true,
            },
        });
    })
}

const createDarkModeTriggerIfNotExists = () =>
{
    if (!$ScrollTrigger.getById(darkModeGsapId))
        $ScrollTrigger.create({
            id: darkModeGsapId,
            trigger: '.web-site__mock',
            start: "bottom top",
            endTrigger: '.web-site__body',
            end: "bottom top",
            onEnter: self =>
            {
                dark.value = true
                darkGrad.value = true
            },
            onEnterBack: self =>
            {
                dark.value = true
                darkGrad.value = true
            },
            onLeave: self =>
            {
                dark.value = false
                darkGrad.value = false
            },
            onLeaveBack: self =>
            {
                dark.value = false
                darkGrad.value = false
            },
            toggleClass: { targets: ".web-site__body", className: 'fade-in' },
            // markers: true
        });
}

const createFixDescTrigger = () =>
{
    if (!$ScrollTrigger.getById(fixDescGsapId))
        $ScrollTrigger.create({
            id: fixDescGsapId,
            trigger: '.web-site__desc',
            start: "center center",
            endTrigger: '.web-site__design',
            end: "bottom bottom",
            pin: '.web-site__desc',
            // markers: true
        });
}

const createShowLinksTrigger = () =>
{
    if (!$ScrollTrigger.getById(showLinksGsapId))
        $ScrollTrigger.create({
            id: showLinksGsapId,
            trigger: ".web-site__body",
            start: 'bottom top',
            endTrigger: ".web-site__link",
            end: "bottom top",
            toggleClass: { targets: ".web-site__link", className: 'fade-in' },
        })
    if (!$ScrollTrigger.getById(hideTextGsapId))
        $ScrollTrigger.create({
            id: hideTextGsapId,
            trigger: ".web-site__body",
            start: 'bottom top',
            endTrigger: ".footer",
            end: "bottom top",
            toggleClass: { targets: ".web-site__text", className: 'fade-out' },
        })
}

const onMockImgLoad = () =>
{
    nextTick(() =>
    {
        $ScrollTrigger.refresh()
        createDarkModeTriggerIfNotExists()
        createFixDescTrigger()
        createShowLinksTrigger()
    })
}

const onCapImgLoad = () =>
{
    nextTick(() =>
    {
        $ScrollTrigger.refresh()
        createDarkModeTriggerIfNotExists()
        createFixDescTrigger()
        createShowLinksTrigger()
    })
}

onMounted(() =>
{
    const mouseStalkerText = useState('mouseStalkerText')
    mouseStalkerText.value = ""
})

onUnmounted(() =>
{
    $ScrollTrigger.getById(textImgGsapId)?.kill()
    $ScrollTrigger.getById(mockImgGsapId)?.kill()
    $ScrollTrigger.getById(darkModeGsapId)?.kill()
    $ScrollTrigger.getById(fixDescGsapId)?.kill()
    $ScrollTrigger.getById(showLinksGsapId)?.kill()
    $ScrollTrigger.getById(hideTextGsapId)?.kill()
})

</script>

<style lang="scss" scoped>
.web-site__container {
    position: relative;
}

.web-site__text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;

    &.fade-in {
        animation: 2s cubic-bezier(0.4, 0, 0, 1) 0.5s forwards fade-in;
    }

    &.fade-out {
        animation: 0.1s cubic-bezier(0.4, 0, 0, 1) forwards fade-out;
    }
}

.web-site__mock {
    width: 100%;
    margin-bottom: 230px;

    &.slide-in {
        opacity: 0;
        transform: translateY(3rem);
        animation: 1s cubic-bezier(0.4, 0, 0, 1) forwards slide-in;
    }
}

.web-site__body {
    display: flex;
    padding: 0 100px;
    margin-bottom: 300px;
    opacity: 0;

    &.fade-in {
        animation: 1s cubic-bezier(0.4, 0, 0, 1) forwards fade-in;
    }
}

.web-site__design {
    margin-right: 60px;
    z-index: 1;
    min-width: 683px;
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

.web-site__desc-container {
    position: relative;
    width: 100%;
}

.web-site__desc {
    position: absolute;
    width: 100%;
}

.web-site__link {
    opacity: 0;

    &.fade-in {
        animation: 1s cubic-bezier(0.4, 0, 0, 1) forwards fade-in;
    }
}

* {
    margin: 0;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes fade-out {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes slide-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>