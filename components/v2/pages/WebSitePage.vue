<template>
    <div id="section-groups-wrapper">
        <div id="section-group" class="swipe-section" style="z-index: 2;">
            <section id="init"
                style="height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center;">
                <div style="width: 80px;" ref="loadingAnimation"></div>
            </section>
            <section id="wsm" class="panel" style="margin-top: -100vh;">
                <web-site-mock-panel :text-img="textImg" :mock-img="mockImg" />
            </section>
            <section id="wsd" class="panel">
                <web-site-desc-panel :text-img="textImgDark" :captures="captures" :contents="contents" />
            </section>
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
import lottie from 'lottie-web';
const loadingAnimation = ref(null);

const Props = defineProps(["textImg", "textImgDark", "mockImg", "captures", "contents"]);
const mouseStalkerText = useState('mouseStalkerText', () => '')
const smoother = useState('smoother')

const loaded = false;
const textLoaded = useState('textLoaded', () => false)
const imgLoaded = useState('imgLoaded', () => false)
const showModal = useState('showModal', () => false)
const showProfileModal = useState('showProfileModal', () => false)
const dark = useState('dark', () => false)
const darkGrad = useState('darkGrad', () => false)

const timeline = useState('timeline', () => null)

const intentObserverTop = useState('intentObserver', () => null)
const pinScrollTrigger1Top = useState('pinScrollTrigger1', () => null)
const transitionTriggerBeforeBnTop = useState('transitionTriggerBeforeBn', () => null)
const transitionTriggerAfterBnTop = useState('transitionTriggerAfterBn', () => null)
const transitionTriggerBeforeIlTop = useState('transitionTriggerBeforeIl', () => null)
const intentObserver = useState('intentObserverWeb', () => null)
const pinBgTrigger = useState('pinBgTriggerWeb', () => null)
const transitionTriggerAfterWsm = useState('transitionTriggerAfterWsmWeb', () => null)
const transitionTriggerBeforeWsd = useState('transitionTriggerBeforeWsdWeb', () => null)
const transitionTriggerAfterWsd = useState('transitionTriggerAfterWsdWeb', () => null)
const transitionTriggerBeforeWsl = useState('transitionTriggerBeforeWslWeb', () => null)
const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp();

let animating = false;
let isCoolDownForDown = false;
let currentIndex = 0;
const defaultTsArgs = {
    duration: 0.5, ease: 'power3'
}
const transitions = [
    // 0: white-screen
    {
        id: "init",
        noEnterBack: true,
        enter: () => $gsap.timeline(),
        leave: () => $gsap.timeline().to("#init", { autoAlpha: 0, ...defaultTsArgs }),
        enterBack: () => $gsap.timeline(),
        enterCallBack: () =>
        {
            intentObserver.enable();
            transitionTriggerAfterWsm.value.disable();
            transitionTriggerBeforeWsd.value.disable();
            transitionTriggerAfterWsd.value.disable();
            transitionTriggerBeforeWsl.value.disable();
        },
    },
    // 1: wsm
    {
        id: "wsm",
        leaveBack: () => $gsap.timeline(),
        enter: () => $gsap.timeline()
            .add(() =>
            {
                intentObserver.value.disable();
                transitionTriggerAfterWsm.value.enable();
                transitionTriggerBeforeWsd.value.disable();
                transitionTriggerAfterWsd.value.disable();
                transitionTriggerBeforeWsl.value.disable();
            })
            .set('#section-group', { autoAlpha: 1, height: window.document.getElementById('wsm').offsetHeight + 'px' })
            .set('#wsm', { y: 0, autoAlpha: 1 })
            .set('#wsd', { marginTop: "-" + window.document.getElementById('wsm').offsetHeight + 'px' })
            .fromTo('#wsm-mock', { autoAlpha: 0, y: "3rem" }, { duration: 1, autoAlpha: 1, y: 0, ease: 'power2.inOut', })
            .fromTo('#wsm-bgtext', { autoAlpha: 0 }, { duration: 2, autoAlpha: 1, ease: 'power2.inOut', }, "<+50%"),
        leave: () => $gsap.timeline()
            .add(() => transitionTriggerAfterWsm.value.disable())
            .fromTo('#wsm-mock', { autoAlpha: 1, y: 0, }, { y: "-3rem", autoAlpha: 0, ...defaultTsArgs })
            .fromTo('#wsm-bgtext', { autoAlpha: 1 }, { autoAlpha: 0, ...defaultTsArgs }, "<"),
        enterBack: () => $gsap.timeline()
            .set('#section-group', { autoAlpha: 1, height: window.document.getElementById('wsm').offsetHeight + 'px' })
            .add(() => smoother.value?.scrollTo("#wsm", false, "bottom-=10px bottom"))
            .add(() =>
            {
                $ScrollTrigger.refresh();
                intentObserver.value.disable();
                transitionTriggerAfterWsm.value.enable();
                transitionTriggerBeforeWsd.value.disable();
                transitionTriggerAfterWsd.value.disable();
                transitionTriggerBeforeWsl.value.disable();
            })
            .fromTo('#wsm-mock', { y: "-3rem", autoAlpha: 0, }, { autoAlpha: 1, y: 0, ...defaultTsArgs })
            .fromTo('#wsm-bgtext', { autoAlpha: 0 }, { autoAlpha: 1, ...defaultTsArgs }, "<"),
        enterCallBack: () =>
        {
            $ScrollTrigger.refresh();
            intentObserver.value.disable();
            transitionTriggerAfterWsm.value.enable();
            transitionTriggerBeforeWsd.value.disable();
            transitionTriggerAfterWsd.value.disable();
            transitionTriggerBeforeWsl.value.disable();
        },
    },
    // 2: wsd(head)
    {
        id: "wsd(head)",
        leaveBack: () => $gsap.timeline()
            .add(() => dark.value = false)
            .fromTo(['#wsd', '#wsd-bgtext'], { autoAlpha: 1 }, { autoAlpha: 0, ...defaultTsArgs })
            .fromTo(['#wsd-design', '#wsd-desc'], { y: 0, autoAlpha: 1 }, { y: "3rem", autoAlpha: 0 }, "<"),
        enter: () => $gsap.timeline()
            .add(() => dark.value = true)
            .set('#wsd', { marginTop: "-" + window.document.getElementById('wsm').offsetHeight + 'px' })
            .set("#section-group", { height: window.document.getElementById('wsd').offsetHeight + 'px' })
            .add(() => $ScrollTrigger.refresh())
            .add(() => smoother.value.scrollTo("#wsd", false, "top top"))
            .add(() =>
            {
                intentObserver.value.enable();
                transitionTriggerAfterWsm.value.disable();
                transitionTriggerBeforeWsd.value.disable();
                transitionTriggerAfterWsd.value.disable();
                transitionTriggerBeforeWsl.value.disable();
            })
            .fromTo(['#wsd', '#wsd-bgtext'], { autoAlpha: 0 }, { autoAlpha: 1, ...defaultTsArgs })
            .fromTo(['#wsd-design', '#wsd-desc'], { autoAlpha: 0, y: "3rem" }, { autoAlpha: 1, y: 0, ...defaultTsArgs })
            .add(() => document.body.style.position = 'static'),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline()
            .add(() =>
            {
                intentObserver.value.enable();
                transitionTriggerAfterWsm.value.disable();
                transitionTriggerBeforeWsd.value.disable();
                transitionTriggerAfterWsd.value.disable();
                transitionTriggerBeforeWsl.value.disable();
            }),
        enterCallBack: () =>
        {
            intentObserver.value.enable();
            transitionTriggerAfterWsm.value.disable();
            transitionTriggerBeforeWsd.value.disable();
            transitionTriggerAfterWsd.value.disable();
            transitionTriggerBeforeWsl.value.disable();
        },
    },
    // 2: wsd
    {
        id: "wsd",
        leaveBack: () => $gsap.timeline(),
        enter: () => $gsap.timeline()
            .add(() =>
            {
                intentObserver.value.disable();
                transitionTriggerAfterWsm.value.disable();
                transitionTriggerBeforeWsd.value.enable();
                transitionTriggerAfterWsd.value.enable();
                transitionTriggerBeforeWsl.value.disable();
            }),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline()
            .add(() =>
            {
                intentObserver.value.disable();
                transitionTriggerAfterWsm.value.disable();
                transitionTriggerBeforeWsd.value.enable();
                transitionTriggerAfterWsd.value.enable();
                transitionTriggerBeforeWsl.value.disable();
            }),
        enterCallBack: () =>
        {
            intentObserver.value.disable();
            transitionTriggerAfterWsm.value.disable();
            transitionTriggerBeforeWsd.value.enable();
            transitionTriggerAfterWsd.value.enable();
            transitionTriggerBeforeWsl.value.disable();
        },
    },
    // 2: wsd(tail)
    {
        id: "wsd(tail)",
        leaveBack: () => $gsap.timeline(),
        enter: () => $gsap.timeline()
            .add(() =>
            {
                intentObserver.value.enable();
                transitionTriggerAfterWsm.value.disable();
                transitionTriggerBeforeWsd.value.disable();
                transitionTriggerAfterWsd.value.disable();
                transitionTriggerBeforeWsl.value.disable();
            }),
        leave: () => $gsap.timeline()
            .add(() => dark.value = false)
            .fromTo(['#wsd-design', '#wsd-desc'], { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: "-3rem", ...defaultTsArgs }, "<")
            .fromTo('#wsd-bgtext', { autoAlpha: 1 }, { autoAlpha: 0, ...defaultTsArgs }, "<")
            .fromTo('#wsd', { autoAlpha: 1 }, { autoAlpha: 0, ...defaultTsArgs })
            .set('#section-group', { autoAlpha: 0 }),
        enterBack: () => $gsap.timeline()
            .add(() => dark.value = true)
            .set("#section-group-2", { height: "100vh" })
            .set('#section-group', { autoAlpha: 1, height: window.document.getElementById('wsd').offsetHeight + 'px' })
            .fromTo('#wsd', { autoAlpha: 0 }, { autoAlpha: 1, ...defaultTsArgs })
            .add(() => smoother.value.scrollTo("#wsd", false, "bottom bottom"))
            .add(() => $ScrollTrigger.refresh())
            .fromTo('#wsd-bgtext', { autoAlpha: 0 }, { autoAlpha: 1, ...defaultTsArgs })
            .fromTo(['#wsd-design', '#wsd-desc'], { autoAlpha: 0, y: "-3rem" }, { autoAlpha: 1, y: 0, ...defaultTsArgs }, "<+50%")
            .add(() =>
            {
                intentObserver.value.enable();
                transitionTriggerAfterWsm.value.disable();
                transitionTriggerBeforeWsd.value.disable();
                transitionTriggerAfterWsd.value.disable();
                transitionTriggerBeforeWsl.value.disable();
            }),
        enterCallBack: () =>
        {
            intentObserver.value.enable();
            transitionTriggerAfterWsm.value.disable();
            transitionTriggerBeforeWsd.value.disable();
            transitionTriggerAfterWsd.value.disable();
            transitionTriggerBeforeWsl.value.disable();
        },
    },
    // 5: wsl
    {
        id: "wsl",
        leaveBack: () => $gsap.timeline()
            .fromTo('#wsl', { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: "3rem", ...defaultTsArgs })
            .set("#section-group-2", { autoAlpha: 0, height: "100vh" }),
        enter: () => $gsap.timeline()
            .add(() => smoother.value.scrollTo("#wsd", false, "top+=10 top"))
            .set("#section-group", { height: "100vh", autoAlpha: 0 })
            .set("#section-group-2", { autoAlpha: 1, maxHeight: "10000vh" })
            .fromTo('#wsl', { autoAlpha: 0, y: "3rem" }, { autoAlpha: 1, y: 0, ...defaultTsArgs })
            .add(() =>
            {
                intentObserver.value.disable();
                transitionTriggerAfterWsm.value.disable();
                transitionTriggerBeforeWsd.value.disable();
                transitionTriggerAfterWsd.value.disable();
                transitionTriggerBeforeWsl.value.enable();
            }),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline()
            .add(() =>
            {
                intentObserver.value.disable();
                transitionTriggerAfterWsm.value.disable();
                transitionTriggerBeforeWsd.value.disable();
                transitionTriggerAfterWsd.value.disable();
                transitionTriggerBeforeWsl.value.enable();
            }),
        enterCallBack: () =>
        {
            intentObserver.value.disable();
            transitionTriggerAfterWsm.value.disable();
            transitionTriggerBeforeWsd.value.disable();
            transitionTriggerAfterWsd.value.disable();
            transitionTriggerBeforeWsl.value.enable();
        },
    }
]

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
    timeline.value?.kill();
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
    timeline.value = tl
    currentIndex = index;
    console.log("===== /gotoPanel =====")
}

onMounted(() =>
{
    if (process.client)
    {
        console.log("===== onMounted web =====")
        timeline.value?.kill();

        intentObserverTop.value?.kill();
        pinScrollTrigger1Top.value?.kill();
        transitionTriggerBeforeBnTop.value?.kill();
        transitionTriggerAfterBnTop.value?.kill();
        transitionTriggerBeforeIlTop.value?.kill();

        smoother.value = smoother.value || $ScrollSmoother.create({
            smooth: 1,
            effects: true,
            normalizeScroll: true,
        })

        imgLoaded.value = false;
        textLoaded.value = false;

        lottie.loadAnimation({
            container: loadingAnimation.value,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/circles-menu-1.json'
        });
        $gsap.timeline().set('#init', { autoAlpha: 1 })

        imgLoaded.value = false
        dark.value = false
        darkGrad.value = false
        showModal.value = false
        showProfileModal.value = false

        setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }), 1)
        mouseStalkerText.value = ""

        // wsmセクションの出口で状態遷移するためのトリガー
        transitionTriggerAfterWsm.value?.kill();
        transitionTriggerAfterWsm.value = $ScrollTrigger.create({
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
        transitionTriggerAfterWsm.value.disable();

        // wsdセクションの入口で状態遷移するためのトリガー
        transitionTriggerBeforeWsd.value?.kill();
        transitionTriggerBeforeWsd.value = $ScrollTrigger.create({
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
        transitionTriggerBeforeWsd.value.disable();
        // wsdセクションの出口で状態遷移するためのトリガー
        transitionTriggerAfterWsd.value?.kill();
        transitionTriggerAfterWsd.value = $ScrollTrigger.create({
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
        transitionTriggerAfterWsd.value.disable();
        // wslセクションの入口で状態遷移するためのトリガー
        transitionTriggerBeforeWsl.value?.kill();
        transitionTriggerBeforeWsl.value = $ScrollTrigger.create({
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
        transitionTriggerBeforeWsl.value.disable();

        pinBgTrigger.value?.kill();
        pinBgTrigger.value = $ScrollTrigger.create({
            id: "pinBgTrigger",
            trigger: "#wsd-bg",
            pin: true,
            start: "top top",
            endTrigger: "#wsd",
            end: "bottom bottom"
        })
        pinBgTrigger.value.enable();

        intentObserver.value?.kill();
        intentObserver.value = $ScrollTrigger.observe({
            id: "intentObserverWeb",
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
        intentObserver.value.enable();
        // gotoPanel(currentIndex + 1, true);
    }
});

onUnmounted(() =>
{
    console.log("===== onUnmounted web =====")
    dark.value = false
    darkGrad.value = false
    showModal.value = false
    showProfileModal.value = false
    isCoolDownForDown = false;
    currentIndex = 0;
    animating = false;
    mouseStalkerText.value = ""
});
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
let mockLoading = false
watch(imgLoaded, async () =>
{
    if (!mockLoading && imgLoaded && textLoaded && currentIndex === 0)
    {
        mockLoading = true
        await sleep(500);
        gotoPanel(1, true);
    }
});
watch(textLoaded, async () =>
{
    if (!mockLoading && imgLoaded && textLoaded && currentIndex === 0)
    {
        mockLoading = true
        await sleep(500);
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
                if (currentIndex >= 2)
                {
                    currentIndex = 3
                    gotoPanel(3, true);
                    $gsap.set('#section-group', { autoAlpha: 1, height: window.document.getElementById('wsd').offsetHeight + 'px' })
                    $ScrollTrigger.refresh()
                }
            })
    }
});
watch(showModal, () =>
{
    if (showModal.value)
    {
        console.log("showModal.value = true")
        smoother.value?.paused(true);
        document.body.style.overflow = 'hidden';
    } else
    {
        console.log("showModal.value = false")
        smoother.value?.paused(false);
        transitions[currentIndex].enterCallBack();
        document.body.style.overflow = 'auto';
    };
});
watch(showProfileModal, () =>
{
    if (showProfileModal.value)
    {
        console.log("showProfileModal.value = true")
        smoother.value?.paused(true);
        document.body.style.overflow = 'hidden';
    } else
    {
        console.log("showProfileModal.value = false")
        dark.value = false
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
    margin-top: -100vh;
    overflow: hidden;
}

.swipe-section .panel {
    opacity: 0;
    width: 100%;
}

.loading-animation {
    opacity: 0;
    transition: opacity 1s;
}
</style>
