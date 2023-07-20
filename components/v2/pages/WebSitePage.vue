<template>
    <div id="section-groups-wrapper">
        <div id="section-group" class="swipe-section" style="z-index: 2;">
            <div style="position: relative;">
                <section id="wsm" class="panel">
                    <web-site-mock-panel :text-img="textImg" :mock-img="mockImg" />
                </section>
                <section id="wsd" class="panel" style="position: absolute; top: 0;">
                    <web-site-desc-panel :text-img="textImgDark" :captures="captures" :contents="contents" />
                </section>
            </div>
        </div>
        <div id="section-group-2" class="swipe-section" style="z-index: 1">
            <section id="wsl" class="panel">
                <web-site-link-panel />
                <footer-view />
            </section>
        </div>
    </div>
</template>

<script setup>
const Props = defineProps(["textImg", "textImgDark", "mockImg", "captures", "contents"]);
const mouseStalkerText = useState('mouseStalkerText', () => '')
const smoother = useState('smoother')
smoother.value?.kill();

const loaded = false;
const textLoaded = useState('textLoaded', () => false)
const imgLoaded = useState('imgLoaded', () => false)
const showModal = useState('showModal', () => false)
const showProfileModal = useState('showProfileModal', () => false)
const dark = useState('dark', () => false)
const darkGrad = useState('darkGrad', () => false)
imgLoaded.value = false
dark.value = false
darkGrad.value = false
showModal.value = false
showProfileModal.value = false

const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp();

let animating = false;
let isCoolDownForDown = false;
let intentObserver;
let currentIndex = 0;
let pinBgTrigger;
let transitionTriggerAfterWsm;
let transitionTriggerBeforeWsd;
let transitionTriggerAfterWsd;
let transitionTriggerBeforeWsl;
const defaultTsArgs = {
    duration: 0.5, ease: 'power3'
}
const transitions = [
    // 0: white-screen
    {
        id: "init",
        noEnterBack: true,
        enter: () => $gsap.timeline(),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline(),
        enterCallBack: () =>
        {
            intentObserver.enable();
            transitionTriggerAfterWsm.disable();
            transitionTriggerBeforeWsd.disable();
            transitionTriggerAfterWsd.disable();
            transitionTriggerBeforeWsl.disable();
        },
    },
    // 1: wsm
    {
        id: "wsm",
        leaveBack: () => $gsap.timeline(),
        enter: () => $gsap.timeline()
            .set('#section-group', { autoAlpha: 1, maxHeight: "500vh" })
            .set('#wsm', { y: 0, autoAlpha: 1 })
            .fromTo('#wsm-mock', { autoAlpha: 0, y: "3rem" }, { duration: 1, autoAlpha: 1, y: 0, ease: 'power2.inOut', })
            .fromTo('#wsm-bgtext', { autoAlpha: 0 }, { duration: 2, autoAlpha: 1, ease: 'power2.inOut', }, "<+50%"),
        leave: () => $gsap.timeline()
            .add(() => transitionTriggerAfterWsm.disable())
            .fromTo('#wsm-mock', { autoAlpha: 1, y: 0, }, { y: "-3rem", autoAlpha: 0, ...defaultTsArgs })
            .fromTo('#wsm-bgtext', { autoAlpha: 1 }, { autoAlpha: 0, ...defaultTsArgs }, "<"),
        enterBack: () => $gsap.timeline()
            .set('#section-group', { maxHeight: "500vh" })
            .add(() => smoother.value?.scrollTo("#wsm", false, "bottom-=10px bottom"))
            .fromTo('#wsm-mock', { y: "-3rem", autoAlpha: 0, }, { autoAlpha: 1, y: 0, ...defaultTsArgs })
            .fromTo('#wsm-bgtext', { autoAlpha: 0 }, { autoAlpha: 1, ...defaultTsArgs }, "<"),
        enterCallBack: () =>
        {
            $ScrollTrigger.refresh()
            intentObserver.disable();
            transitionTriggerAfterWsm.enable();
            transitionTriggerBeforeWsd.disable();
            transitionTriggerAfterWsd.disable();
            transitionTriggerBeforeWsl.disable();
        },
        enterBackCallBack: () =>
        {
            $ScrollTrigger.refresh();
            intentObserver.disable();
            transitionTriggerAfterWsm.enable();
            transitionTriggerBeforeWsd.disable();
            transitionTriggerAfterWsd.disable();
            transitionTriggerBeforeWsl.disable();
        },
    },
    // 2: wsd(head)
    {
        id: "wsd(head)",
        leaveBack: () => $gsap.timeline()
            .add(() => dark.value = false)
            .set(["#section-group", "#section-groups-wrapper"], { clearProps: "height" })
            .fromTo(['#wsd', '#wsd-bgtext'], { autoAlpha: 1 }, { autoAlpha: 0, ...defaultTsArgs })
            .fromTo(['#wsd-design', '#wsd-desc'], { y: 0, autoAlpha: 1 }, { y: "3rem", autoAlpha: 0 }, "<"),
        enter: () => $gsap.timeline()
            .add(() => dark.value = true)
            .set("#section-group-2", { maxHeight: "100vh" })
            .set('#section-group', { maxHeight: "10000vh" })
            .add(() => smoother.value.scrollTo("#wsd", false, "top top"))
            .add(() => document.body.style.position = 'fixed')
            .add(() => window.document.getElementById('section-group').style.height = window.document.getElementById('wsd').offsetHeight + 'px')
            .add(() => window.document.getElementById('section-groups-wrapper').style.height = window.document.getElementById('wsd').offsetHeight + 'px')
            .fromTo(['#wsd', '#wsd-bgtext'], { autoAlpha: 0 }, { autoAlpha: 1, ...defaultTsArgs })
            .fromTo(['#wsd-design', '#wsd-desc'], { autoAlpha: 0, y: "3rem" }, { autoAlpha: 1, y: 0, ...defaultTsArgs })
            .add(() => document.body.style.position = 'static'),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline(),
        enterCallBack: () =>
        {
            $ScrollTrigger.refresh();
            intentObserver.enable();
            transitionTriggerAfterWsm.disable();
            transitionTriggerBeforeWsd.disable();
            transitionTriggerAfterWsd.disable();
            transitionTriggerBeforeWsl.disable();
        },
        enterBackCallBack: () =>
        {
            $ScrollTrigger.refresh();
            intentObserver.enable();
            transitionTriggerAfterWsm.disable();
            transitionTriggerBeforeWsd.disable();
            transitionTriggerAfterWsd.disable();
            transitionTriggerBeforeWsl.disable();
        },
    },
    // 2: wsd
    {
        id: "wsd",
        leaveBack: () => $gsap.timeline(),
        enter: () => $gsap.timeline(),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline(),
        enterCallBack: () =>
        {
            intentObserver.disable();
            transitionTriggerAfterWsm.disable();
            transitionTriggerBeforeWsd.enable();
            transitionTriggerAfterWsd.enable();
            transitionTriggerBeforeWsl.disable();
        },
        enterBackCallBack: () =>
        {
            intentObserver.disable();
            transitionTriggerAfterWsm.disable();
            transitionTriggerBeforeWsd.enable();
            transitionTriggerAfterWsd.enable();
            transitionTriggerBeforeWsl.disable();
        },
    },
    // 2: wsd(tail)
    {
        id: "wsd(tail)",
        leaveBack: () => $gsap.timeline(),
        enter: () => $gsap.timeline(),
        leave: () => $gsap.timeline()
            .add(() => dark.value = false)
            .fromTo(['#wsd-design', '#wsd-desc'], { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: "-3rem", ...defaultTsArgs }, "<")
            .fromTo('#wsm-bgtext', { autoAlpha: 1 }, { autoAlpha: 0, ...defaultTsArgs }, "<")
            .fromTo('#wsd', { autoAlpha: 1 }, { autoAlpha: 0, ...defaultTsArgs })
            .set('#section-group', { autoAlpha: 0 }),
        enterBack: () => $gsap.timeline()
            .add(() => dark.value = true)
            .add(() => $gsap.set(["#section-group", "#section-groups-wrapper"], { height: window.document.getElementById('wsd').offsetHeight + 'px' }))
            .set("#section-group-2", { maxHeight: "100vh" })
            .set('#section-group', { autoAlpha: 1 })
            .add(() => smoother.value.scrollTo("#wsd", false, "bottom-=20 bottom"))
            .fromTo('#wsd', { autoAlpha: 0 }, { autoAlpha: 1, ...defaultTsArgs })
            .fromTo('#wsm-bgtext', { autoAlpha: 0 }, { autoAlpha: 1, ...defaultTsArgs })
            .fromTo(['#wsd-design', '#wsd-desc'], { autoAlpha: 0, y: "-3rem" }, { autoAlpha: 1, y: 0, ...defaultTsArgs }, "<+50%"),
        enterCallBack: () =>
        {
            intentObserver.enable();
            transitionTriggerAfterWsm.disable();
            transitionTriggerBeforeWsd.disable();
            transitionTriggerAfterWsd.disable();
            transitionTriggerBeforeWsl.disable();
        },
        enterBackCallBack: () =>
        {
            intentObserver.enable();
            transitionTriggerAfterWsm.disable();
            transitionTriggerBeforeWsd.disable();
            transitionTriggerAfterWsd.disable();
            transitionTriggerBeforeWsl.disable();
        },
    },
    // 5: wsl
    {
        id: "wsl",
        leaveBack: () => $gsap.timeline()
            .set("#section-groups-wrapper", { clearProps: "height" })
            .fromTo('#wsl', { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: "3rem", ...defaultTsArgs })
            .set("#section-group-2", { autoAlpha: 0 }),
        enter: () => $gsap.timeline()
            .add(() => smoother.value.scrollTo("#wsd", false, "top+=10 top"))
            .set("#section-group-2", { autoAlpha: 1, maxHeight: "500vh" })
            .add(() => window.document.getElementById('section-groups-wrapper').style.height = window.document.getElementById('section-group-2').offsetHeight + 'px')
            .fromTo('#wsl', { autoAlpha: 0, y: "3rem" }, { autoAlpha: 1, y: 0, ...defaultTsArgs }),
        enterCallBack: () =>
        {
            intentObserver.disable();
            transitionTriggerAfterWsm.disable();
            transitionTriggerBeforeWsd.disable();
            transitionTriggerAfterWsd.disable();
            transitionTriggerBeforeWsl.enable();
        },
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline(),
        enterBackCallBack: () =>
        {
            intentObserver.disable();
            transitionTriggerAfterWsm.disable();
            transitionTriggerBeforeWsd.disable();
            transitionTriggerAfterWsd.disable();
            transitionTriggerBeforeWsl.enable();
        },
    }
]
function preventDefault(e)
{
    e.preventDefault();
}
// handle the panel swipe animations
function gotoPanel(index, isScrollingDown)
{
    console.log("===== gotoPanel =====")
    animating = true;

    if (isScrollingDown && index >= transitions.length)
    {
        animating = false;
        return
    }
    if (!isScrollingDown && currentIndex <= 1)
    {
        animating = false;
        return
    }

    console.log(`${transitions[currentIndex].id} -> ${transitions[index].id}`)
    const tl = $gsap.timeline()
    const callBacks = []
    if (isScrollingDown)
    {
        if (currentIndex >= 0)
        {
            console.log(`leave ${transitions[currentIndex].id}`)
            tl.add(transitions[currentIndex].leave())
            callBacks.push(transitions[currentIndex].leaveCallBack)
        }
        if (index < transitions.length)
        {
            console.log(`enter ${transitions[index].id}`)
            tl.add(transitions[index].enter())
            callBacks.push(transitions[index].enterCallBack)
        }
    } else
    {
        if (currentIndex >= 0)
        {
            console.log(`leaveBack ${transitions[currentIndex].id}`)
            tl.add(transitions[currentIndex].leaveBack())
            callBacks.push(transitions[currentIndex].leaveBackCallBack)
        }
        if (index < transitions.length)
        {
            console.log(`enterBack ${transitions[index].id}`)
            tl.add(transitions[index].enterBack())
            callBacks.push(transitions[index].enterBackCallBack)
        }
    }
    tl.then(() =>
    {
        callBacks.forEach(cb => cb && cb())
        animating = false;
    })
    currentIndex = index;
    console.log("===== /gotoPanel =====")
}

onMounted(() =>
{
    if (process.client)
    {
        setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }), 200)
        mouseStalkerText.value = ""
        smoother.value = $ScrollSmoother.create({
            smooth: 1,
            effects: true,
            normalizeScroll: true,
        })

        // wsmセクションの出口で状態遷移するためのトリガー
        transitionTriggerAfterWsm = $ScrollTrigger.create({
            id: "transitionTriggerAfterWsm",
            trigger: "#wsm",
            start: "bottom-=10px bottom-=1",
            end: "bottom-=1 bottom+=1",
            onLeaveBack: () =>
            {
            },
            onEnter: () =>
            {
                gotoPanel(currentIndex + 1, true);
                console.log(`transitionTriggerAfterWsm: onEnter`)
            },
            onLeave: () =>
            {
            },
            onEnterBack: () =>
            {
            },
        });
        transitionTriggerAfterWsm.disable();

        // wsdセクションの入口で状態遷移するためのトリガー
        transitionTriggerBeforeWsd = $ScrollTrigger.create({
            id: "transitionTriggerBeforeWsd",
            trigger: "#wsd",
            start: "top top-=1",
            end: "top top+=1",
            onLeaveBack: () =>
            {
            },
            onEnter: () =>
            {
            },
            onLeave: () =>
            {
            },
            onEnterBack: () =>
            {
                console.log(`transitionTriggerBeforeWsd: onEnterBack`)
                gotoPanel(currentIndex - 1, false);
            },
        })
        transitionTriggerBeforeWsd.disable();
        // wsdセクションの出口で状態遷移するためのトリガー
        transitionTriggerAfterWsd = $ScrollTrigger.create({
            id: "transitionTriggerAfterWsd",
            trigger: "#wsd",
            start: "bottom bottom+=1",
            end: "bottom bottom-=1",
            onLeaveBack: () =>
            {
            },
            onEnter: () =>
            {
                console.log(`transitionTriggerAfterWsd: onEnter`)
                gotoPanel(currentIndex + 1, true);
            },
            onLeave: () =>
            {
            },
            onEnterBack: () =>
            {
            },
        })
        transitionTriggerAfterWsd.disable();
        // wslセクションの入口で状態遷移するためのトリガー
        transitionTriggerBeforeWsl = $ScrollTrigger.create({
            id: "transitionTriggerBeforeWsl",
            trigger: "#wsl",
            start: "top top+=1",
            end: "top top-=1",
            onLeaveBack: () =>
            {
            },
            onEnter: () =>
            {
            },
            onLeave: () =>
            {
            },
            onEnterBack: () =>
            {
                console.log(`transitionTriggerBeforeWsl: onEnterBack`)
                gotoPanel(currentIndex - 1, false);
            },
        })
        transitionTriggerBeforeWsl.disable();

        pinBgTrigger = $ScrollTrigger.create({
            id: "pinBgTrigger",
            trigger: "#wsd-bg",
            pin: true,
            start: "top top",
            endTrigger: "#wsd",
            end: "bottom bottom"
        })
        pinBgTrigger.enable();

        intentObserver = $ScrollTrigger.observe({
            type: "wheel,touch",
            onUp: () =>
            {
                if (!isCoolDownForDown)
                {
                    !animating && gotoPanel(currentIndex + 1, true);
                }
            },
            onDown: () =>
            {
                !animating && gotoPanel(currentIndex - 1, false);
            },
            wheelSpeed: -1,
            tolerance: 10,
            preventDefault: true,
            onPress: self =>
            {
                // on touch devices like iOS, if we want to prevent scrolling, we must call preventDefault() on the touchstart (Observer doesn't do that because that would also prevent side-scrolling which is undesirable in most cases)
                $ScrollTrigger.isTouch && self.event.preventDefault()
            }
        })
        intentObserver.enable();
        // gotoPanel(currentIndex + 1, true);
    }
});

onUnmounted(() =>
{
    isCoolDownForDown = false;
    currentIndex = 0;
    animating = false;
    intentObserver?.kill();
    pinBgTrigger?.kill();
    transitionTriggerBeforeWsd?.kill();
    transitionTriggerAfterWsd?.kill();
    transitionTriggerBeforeWsl?.kill();
});

watch(imgLoaded, () =>
{
    if (imgLoaded && textLoaded && currentIndex === 0)
    {
        gotoPanel(1, true);
    }
});
watch(textLoaded, () =>
{
    if (imgLoaded && textLoaded && currentIndex === 0)
    {
        gotoPanel(1, true);
    }
});
const capUrls = useState('capUrls', () => [])
const capUrlsToShow = useState('capUrlsToShow', () => [])
const capUrlsLoading = useState('capUrlsLoading', () => false)
watch(capUrlsLoading, () =>
{
    if (capUrlsLoading.value && currentIndex >= 2)
    {
        console.log("capUrls changed")
        $gsap.timeline()
            .fromTo(["#wsd-bgtext", "#wsd-design"], { opacity: 1 }, { opacity: 0, duration: 0.3, ease: "power2.out" })
            .add(() => smoother.value.scrollTo("#wsd", false, "top+=10 top"))
            .add(() => capUrlsToShow.value = capUrls.value, ">")
    }
    if (!capUrlsLoading.value)
    {
        console.log("capUrls loaded")
        $gsap.timeline()
            .fromTo(["#wsd-bgtext", "#wsd-design"], { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
            .add(() =>
            {
                $ScrollTrigger.refresh()
                if (currentIndex >= 2)
                {
                    currentIndex = 3
                    gotoPanel(3, true);
                    $gsap.set(["#section-group", "#section-groups-wrapper"], { height: window.document.getElementById('wsd').offsetHeight + 'px' })
                }
                $ScrollTrigger.refresh()
            })
    }
});
watch(showModal, () =>
{
    if (showModal.value)
    {
        smoother.value?.paused(true);
        document.body.style.overflow = 'hidden';
    } else
    {
        smoother.value?.paused(false);
        transitions[currentIndex].enterCallBack();
        document.body.style.overflow = 'auto';
    };
});
watch(showProfileModal, () =>
{
    if (showProfileModal.value)
    {
        smoother.value?.paused(true);
        document.body.style.overflow = 'hidden';
    } else
    {
        smoother.value?.paused(false);
        transitions[currentIndex].enterCallBack();
        document.body.style.overflow = 'auto';
    };
});
</script>

<style lang="scss" scoped>
#section-groups-wrapper {
    position: relative;
    width: 100%;
}

.swipe-section {
    position: relative;
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
    background-color: #fff;
}

#section-group-2 {
    opacity: 0;
    max-height: 100vh;
    overflow: hidden;
    position: absolute;
    top: 0;
}

.swipe-section .fullscreen-panel {
    position: absolute;
    opacity: 0;
}

.swipe-section .panel {
    opacity: 0;
    width: 100%;
}
</style>
