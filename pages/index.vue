<template>
    <div id="section-groups-wrapper">
        <div id="section-group-1" class="swipe-section" style="z-index: 2;">
            <section id="kv" class="fullscreen-panel">
                <key-visual-panel />
            </section>
            <section id="ws" class="fullscreen-panel">
                <web-site-panel />
            </section>
            <section id="cp" class="fullscreen-panel">
                <competition-panel />
            </section>
            <section id="bn" class="panel">
                <banner-panel />
            </section>
        </div>
        <div id="section-group-2" class="swipe-section" style="z-index: 1;">
            <section id="il" class="panel">
                <illustration-panel />
                <footer-view />
            </section>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "v2",
})

const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp();
const smoother = useState('smoother')
const scrollTo = useState('scrollTo')
smoother.value?.kill();
smoother.value = null;
const competitionIdx = useState('competitionIdx', () => 1)
const showModal = useState('showModal', () => false)
const showProfileModal = useState('showProfileModal', () => false)
const dark = useState('dark', () => false)
const darkGrad = useState('darkGrad', () => false)

let currentIndex = 0;
let animating;
const intentObserver = useState('intentObserver', () => null)
const pinScrollTrigger1 = useState('pinScrollTrigger1', () => null)
const transitionTriggerBeforeBn = useState('transitionTriggerBeforeBn', () => null)
const transitionTriggerAfterBn = useState('transitionTriggerAfterBn', () => null)
const transitionTriggerBeforeIl = useState('transitionTriggerBeforeIl', () => null)
const intentObserverWeb = useState('intentObserverWeb', () => null)
const pinBgTriggerWeb = useState('pinBgTriggerWeb', () => null)
const transitionTriggerAfterWsmWeb = useState('transitionTriggerAfterWsmWeb', () => null)
const transitionTriggerBeforeWsdWeb = useState('transitionTriggerBeforeWsdWeb', () => null)
const transitionTriggerAfterWsdWeb = useState('transitionTriggerAfterWsdWeb', () => null)
const transitionTriggerBeforeWslWeb = useState('transitionTriggerBeforeWslWeb', () => null)

let isCoolDownForDown = false;
let timerIdForDown;

function coolDownForDown(timeout = 100)
{
    isCoolDownForDown = true;
    clearTimeout(timerIdForDown);
    timerIdForDown = setTimeout(() =>
    {
        isCoolDownForDown = false;
    }, timeout);
}

const defaultTsArgs = {
    duration: 0.5, ease: 'power3'
}

const kvCallback = () =>
{
    smoother.value?.kill();
    smoother.value = null;
    $ScrollTrigger.refresh();
    transitionTriggerBeforeBn.value.disable();
    transitionTriggerAfterBn.value.disable();
    transitionTriggerBeforeIl.value.disable();
    setTimeout(() => window.scrollTo(0, 0), 200)
    pinScrollTrigger1.value.enable();
    intentObserver.value.enable();
}
const wsCallback = () =>
{
    smoother.value?.kill();
    smoother.value = null;
    $ScrollTrigger.refresh();
    transitionTriggerBeforeBn.value.disable();
    transitionTriggerAfterBn.value.disable();
    transitionTriggerBeforeIl.value.disable();
    pinScrollTrigger1.value.enable();
    intentObserver.value.enable();
    $ScrollTrigger.refresh();
}
const cpCallback = () =>
{
    smoother.value?.kill();
    smoother.value = null;
    $ScrollTrigger.refresh();
    transitionTriggerBeforeBn.value.disable();
    transitionTriggerAfterBn.value.disable();
    transitionTriggerBeforeIl.value.disable();
    setTimeout(() => window.scrollTo(0, 0), 200)
    pinScrollTrigger1.value.enable();
    intentObserver.value.enable();
}

const transitions = [
    // 0: white-screen
    {
        id: "init",
        noEnterBack: true,
        enter: () => $gsap.timeline(),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline(),
        leaveByJump: () => $gsap.timeline(),
        fadeOut: () => $gsap.timeline()
    },
    // 1: kv
    {
        id: "kv",
        enter: () => $gsap.timeline()
            .add(() => kvCallback())
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" })
            .set('#kv', { y: 0, autoAlpha: 1 })
            .fromTo('#kv-fullname', { autoAlpha: 0, }, { duration: 1, autoAlpha: 1, ease: 'power2.inOut' })
            .fromTo('#kv-scrolling-hint', { autoAlpha: 0, }, { duration: 1, autoAlpha: 1, ease: 'power2.inOut' }),
        leave: () => $gsap.timeline()
            .to('#kv', { y: "-3rem", autoAlpha: 0, ...defaultTsArgs }),
        enterBack: () => $gsap.timeline()
            .add(() => kvCallback())
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" })
            .set(['#kv-fullname', '#kv-scrolling-hint'], { autoAlpha: 1 })
            .fromTo('#kv', { y: "-3rem", autoAlpha: 0 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        fadeOut: () => $gsap.timeline()
            .to(['#section-group-1', '#kv'], { autoAlpha: 0, ...defaultTsArgs }),
        enterCallBack: () =>
        {
            kvCallback();
        },
    },
    // 2: ws(title)
    {
        id: "ws(title)",
        leaveBack: () => $gsap.timeline()
            .to('#ws', { y: "3rem", autoAlpha: 0, ...defaultTsArgs }),
        enter: () => $gsap.timeline()
            .set("#section-groups-wrapper", { clearProps: "height" })
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" })
            .set(['#ws-thumbnails1', '#ws-thumbnails2'], { autoAlpha: 0, y: 0 })
            .fromTo('#ws', { y: "3rem", autoAlpha: 0 }, { autoAlpha: 1, y: 0, ...defaultTsArgs })
            .add(() => wsCallback()),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline()
            .add(() => wsCallback())
            .set("#section-groups-wrapper", { clearProps: "height" })
            .set(['#ws-thumbnails1', '#ws-thumbnails2'], { autoAlpha: 0 })
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" }),
        enterBackByJump: () => $gsap.timeline()
            .set("#section-groups-wrapper", { clearProps: "height" })
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" })
            .set(['#ws-thumbnails1', '#ws-thumbnails2'], { autoAlpha: 0, y: 0 })
            .fromTo('#ws', { y: "3rem", autoAlpha: 0 }, { autoAlpha: 1, y: 0, ...defaultTsArgs })
            .add(() => wsCallback()),
        fadeOut: () => $gsap.timeline()
            .to(['#section-group-1', '#ws'], { autoAlpha: 0, ...defaultTsArgs }),
        enterCallBack: () =>
        {
            wsCallback();
        },
    },
    // 3: ws(1,2)
    {
        id: "ws(1,2)",
        leaveBack: () => $gsap.timeline()
            .to('#ws-thumbnails1', { y: "3rem", autoAlpha: 0, ...defaultTsArgs }),
        enter: () => $gsap.timeline()
            .add(() => wsCallback())
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" })
            .set('#ws-thumbnails2', { autoAlpha: 0, zIndex: -1 })
            .fromTo('#ws-thumbnails1', { y: "3rem", autoAlpha: 0, zIndex: 1 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        leave: () => $gsap.timeline()
            .to('#ws-thumbnails1', { y: "-3rem", autoAlpha: 0, ...defaultTsArgs }),
        enterBack: () => $gsap.timeline()
            .add(() => wsCallback())
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" })
            .set('#ws-thumbnails2', { autoAlpha: 0, zIndex: -1 })
            .fromTo('#ws-thumbnails1', { y: "-3rem", autoAlpha: 0, zIndex: 1 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        fadeOut: () => $gsap.timeline()
            .to(['#section-group-1', '#ws'], { autoAlpha: 0, ...defaultTsArgs }),
        enterCallBack: () =>
        {
            wsCallback();
        },
    },
    // 4: ws(3,4)
    {
        id: "ws(3,4)",
        leaveBack: () => $gsap.timeline()
            .to('#ws-thumbnails2', { y: "3rem", autoAlpha: 0, ...defaultTsArgs }),
        enter: () => $gsap.timeline()
            .add(() => wsCallback())
            .set('#ws-thumbnails1', { autoAlpha: 0, zIndex: -1 })
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" })
            .fromTo('#ws-thumbnails2', { y: "3rem", autoAlpha: 0, zIndex: 1 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        leave: () => $gsap.timeline()
            .to('#ws', { y: "-3rem", autoAlpha: 0, ...defaultTsArgs }),
        enterBack: () => $gsap.timeline()
            .add(() => wsCallback())
            .set('#ws-thumbnails1', { autoAlpha: 0, zIndex: -1 })
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" })
            .set('#ws-thumbnails2', { autoAlpha: 1, zIndex: 1 })
            .fromTo('#ws', { y: "-3rem", autoAlpha: 0 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        fadeOut: () => $gsap.timeline()
            .to(['#section-group-1', '#ws'], { autoAlpha: 0, ...defaultTsArgs }),
        enterCallBack: () =>
        {
            wsCallback();
        },
    },
    // 4: cp(1)
    {
        id: "cp(1)",
        leaveBack: () => $gsap.timeline()
            .fromTo(["#cp"], { y: 0, autoAlpha: 1 }, { y: "3rem", autoAlpha: 0, ...defaultTsArgs })
            .set('#cp', { autoAlpha: 0 }),
        enter: () => $gsap.timeline()
            .add(() => setTimeout(() => window.scrollTo(0, 0), 200))
            .add(() => cpCallback())
            .set("#section-groups-wrapper", { clearProps: "height" })
            .add(() => competitionIdx.value = 1)
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" })
            .set(['#cp-thumbnails > li', '#cp-thumbnails'], { autoAlpha: 1, x: 0 })
            .fromTo(["#cp"], { y: "3rem", autoAlpha: 0 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline()
            .add(() => cpCallback())
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" })
            .add(() => competitionIdx.value = 1),
        enterBackByJump: () => $gsap.timeline()
            .add(() => setTimeout(() => window.scrollTo(0, 0), 200))
            .set("#section-groups-wrapper", { clearProps: "height" })
            .add(() => competitionIdx.value = 1)
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" })
            .set(['#cp-thumbnails > li', '#cp-thumbnails'], { autoAlpha: 1, x: 0 })
            .fromTo(["#cp"], { y: "3rem", autoAlpha: 0 }, { y: 0, autoAlpha: 1, ...defaultTsArgs })
            .add(() => cpCallback()),
        fadeOut: () => $gsap.timeline()
            .to(['#section-group-1', '#cp'], { autoAlpha: 0, ...defaultTsArgs }),
        enterCallBack: () =>
        {
            cpCallback();
        },
    },
    // 6: cp(2)
    {
        id: "cp(2)",
        leaveBack: () => $gsap.timeline()
            //.fromTo("#cp-thumbnails", { x: -(window.innerWidth - 300) / 2 }, { x: 0, ...defaultTsArgs },),
            .fromTo("#cp-thumbnails", { x: -483 }, { x: 0, ...defaultTsArgs })
            .fromTo("#cp-thumbnails > :nth-child(1)", { autoAlpha: 0 }, { autoAlpha: 1, ...defaultTsArgs }, "<"),
        enter: () => $gsap.timeline()
            .add(() => cpCallback())
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" })
            .add(() => competitionIdx.value = 2)
            //.fromTo("#cp-thumbnails", { x: 0 }, { x: -(window.innerWidth - 300) / 2, ...defaultTsArgs }),
            .fromTo("#cp-thumbnails", { x: 0 }, { x: -483, ...defaultTsArgs })
            .fromTo("#cp-thumbnails > :nth-child(1)", { autoAlpha: 1 }, { autoAlpha: 0, ...defaultTsArgs }, "<"),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline()
            .add(() => cpCallback())
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" })
            .add(() => competitionIdx.value = 2)
            .set('#cp', { autoAlpha: 1 }),
        fadeOut: () => $gsap.timeline()
            .to(['#section-group-1', '#cp'], { autoAlpha: 0, ...defaultTsArgs }),
        enterCallBack: () =>
        {
            cpCallback();
        },
    },
    // 6: cp(3)
    {
        id: "cp(3)",
        leaveBack: () => $gsap.timeline()
            //.fromTo("#cp-thumbnails", { x: -(window.innerWidth - 300) / 2 }, { x: 0, ...defaultTsArgs },),
            .fromTo("#cp-thumbnails", { x: -483 * 2 }, { x: -483, ...defaultTsArgs })
            .fromTo("#cp-thumbnails > :nth-child(2)", { autoAlpha: 0 }, { autoAlpha: 1, ...defaultTsArgs }, "<"),
        enter: () => $gsap.timeline()
            .add(() => cpCallback())
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" })
            .add(() => competitionIdx.value = 3)
            //.fromTo("#cp-thumbnails", { x: 0 }, { x: -(window.innerWidth - 300) / 2, ...defaultTsArgs }),
            .fromTo("#cp-thumbnails", { x: -483 }, { x: -483 * 2, ...defaultTsArgs })
            .fromTo("#cp-thumbnails > :nth-child(2)", { autoAlpha: 1 }, { autoAlpha: 0, ...defaultTsArgs }, "<"),
        leave: () => $gsap.timeline()
            .fromTo('#cp', { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: "-3rem" }),
        enterBack: () => $gsap.timeline()
            .add(() => cpCallback())
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "100vh" })
            .set("#cp-thumbnails", { x: -483 * 2, ...defaultTsArgs })
            .set(["#cp-thumbnails > :nth-child(1)", "#cp-thumbnails > :nth-child(2)"], { autoAlpha: 0 })
            .add(() => competitionIdx.value = 3)
            .fromTo('#cp', { autoAlpha: 0, y: "-3rem" }, { autoAlpha: 1, y: 0 }),
        fadeOut: () => $gsap.timeline()
            .to(['#section-group-1', '#cp'], { autoAlpha: 0, ...defaultTsArgs }),
        enterCallBack: () =>
        {
            cpCallback();
        },
    },
    // 7: bn(head)
    {
        id: "bn(head)",
        leaveBack: () => $gsap.timeline()
            .add(() => dark.value = false)
            .to('#bn', { autoAlpha: 0, ...defaultTsArgs })
            .to(['#bn__title', '#bn__grid-wrapper'], { y: "3rem", autoAlpha: 0, ...defaultTsArgs }, "<"),
        enter: () => $gsap.timeline()
            .add(() => dark.value = true)
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "10000vh" })
            .set('#bn', { y: 0, autoAlpha: 0 })
            .set(['#bn__title', '#bn__grid-wrapper'], { y: "3rem", autoAlpha: 0 })
            .to('#bn', { autoAlpha: 1, ...defaultTsArgs })
            .to('#bn__title', { y: 0, autoAlpha: 1, ...defaultTsArgs })
            .to('#bn__grid-wrapper', { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline()
            .add(() => dark.value = true)
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "10000vh" }),
        enterBackByJump: () => $gsap.timeline()
            .add(() => dark.value = true)
            .add(() => setTimeout(() => window.scrollTo(0, 0), 200))
            .set("#section-groups-wrapper", { clearProps: "height" })
            .set('#section-group-1', { autoAlpha: 1, maxHeight: "10000vh" })
            .set('#bn', { y: 0, autoAlpha: 0 })
            .set(['#bn__title', '#bn__grid-wrapper'], { y: "3rem", autoAlpha: 0 })
            .to('#bn', { autoAlpha: 1, ...defaultTsArgs })
            .to('#bn__title', { y: 0, autoAlpha: 1, ...defaultTsArgs })
            .to('#bn__grid-wrapper', { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        fadeOut: () => $gsap.timeline()
            .add(() => dark.value = false)
            .to(['#section-group-1', '#bn'], { autoAlpha: 0, ...defaultTsArgs }),
        enterCallBack: () =>
        {
            smoother.value?.kill();
            smoother.value = null;
            $ScrollTrigger.refresh();
            pinScrollTrigger1.value.disable();
            intentObserver.value.enable();
            transitionTriggerBeforeBn.value.disable();
            transitionTriggerAfterBn.value.disable();
            transitionTriggerBeforeIl.value.disable();
        },
        enterBackCallBack: () =>
        {
            smoother.value?.kill();
            smoother.value = null;
            pinScrollTrigger1.value.disable();
            intentObserver.value.enable();
            transitionTriggerBeforeBn.value.disable();
            transitionTriggerAfterBn.value.disable();
            transitionTriggerBeforeIl.value.disable();
        },
    },
    // 8: bn(body)
    {
        id: "bn(body)",
        leaveBack: () => $gsap.timeline(),
        enter: () => $gsap.timeline().add(() => dark.value = true).set("#section-group-2", { maxHeight: "100vh" }),
        enterCallBack: () =>
        {
            smoother.value = $ScrollSmoother.create({
                smooth: 1,
                effects: true,
                normalizeScroll: true,
            })
            pinScrollTrigger1.value.disable();
            intentObserver.value.disable();
            transitionTriggerBeforeBn.value.enable();
            transitionTriggerAfterBn.value.enable();
            transitionTriggerBeforeIl.value.disable();
        },
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline().add(() => dark.value = true).set("#section-group-2", { maxHeight: "100vh" }),
        fadeOut: () => $gsap.timeline()
            .add(() => dark.value = false)
            .to(['#section-group-1', '#bn'], { autoAlpha: 0, ...defaultTsArgs }),
        enterBackCallBack: () =>
        {
            pinScrollTrigger1.value.disable();
            intentObserver.value.disable();
            transitionTriggerBeforeBn.value.enable();
            transitionTriggerAfterBn.value.enable();
            transitionTriggerBeforeIl.value.disable();
        },
    },
    // 9: bn(tail)
    {
        id: "bn(tail)",
        leaveBack: () => $gsap.timeline(),
        enter: () => $gsap.timeline().add(() => dark.value = true).set("#section-group-2", { maxHeight: "100vh" }),
        enterCallBack: () =>
        {
            coolDownForDown(100);
            pinScrollTrigger1.value.disable();
            intentObserver.value.enable();
            transitionTriggerBeforeBn.value.disable();
            transitionTriggerAfterBn.value.disable();
            transitionTriggerBeforeIl.value.disable();
        },
        leave: () => $gsap.timeline()
            .add(() => dark.value = false)
            .to('#bn__grid-wrapper', { y: "-3rem", autoAlpha: 0, ...defaultTsArgs })
            .to('#bn', { autoAlpha: 0, ...defaultTsArgs })
            .set('#bn__grid-wrapper', { y: 0 })
            .set("#section-group-1", { autoAlpha: 0 }),
        enterBack: () => $gsap.timeline()
            .add(() => dark.value = true)
            .add(() => smoother.value?.scrollTo('#bn', false, "bottom bottom"))
            .add(() => $ScrollTrigger.refresh())
            .set("#section-group-2", { maxHeight: "100vh" })
            .set("#section-group-1", { autoAlpha: 1 })
            .to('#bn', { autoAlpha: 1, ...defaultTsArgs })
            .fromTo(['#bn__title', '#bn__grid-wrapper'], { y: "-3rem", autoAlpha: 0 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        fadeOut: () => $gsap.timeline()
            .add(() => dark.value = false)
            .to(['#section-group-1', '#bn'], { autoAlpha: 0, ...defaultTsArgs }),
        enterBackCallBack: () =>
        {
            pinScrollTrigger1.value.disable();
            intentObserver.value.enable();
            transitionTriggerBeforeBn.value.disable();
            transitionTriggerAfterBn.value.disable();
            transitionTriggerBeforeIl.value.disable();
        },
    },
    // 10: il(head)
    {
        id: "il(head)",
        leaveBack: () => $gsap.timeline()
            .set("#section-groups-wrapper", { clearProps: "height" })
            .fromTo(["#il__title", "#il__showcase-wrapper"], { y: 0, autoAlpha: 1 }, { y: "3rem", autoAlpha: 0, ...defaultTsArgs })
            .set(["#section-group-2", "#il"], { autoAlpha: 0 })
            .set("#section-group-2", { maxHeight: "100vh" }),
        enter: () => $gsap.timeline()
            .add(() => smoother.value?.scrollTop(0))
            .set(["#section-group-2", "#il"], { autoAlpha: 1, y: 0 })
            .set("#section-group-2", { maxHeight: "500vh" })
            .add(() => window.document.getElementById('section-groups-wrapper').style.height = window.document.getElementById('section-group-2').offsetHeight + 'px')
            .fromTo(["#il__title", "#il__showcase-wrapper"], { y: "3rem", autoAlpha: 0 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline(),
        enterBackByJump: () => $gsap.timeline()
            .set(["#section-group-2", "#il"], { autoAlpha: 1, y: 0 })
            .set("#section-group-2", { maxHeight: "500vh" })
            .add(() => window.document.getElementById('section-groups-wrapper').style.height = window.document.getElementById('section-group-2').offsetHeight + 'px')
            .fromTo(["#il__title", "#il__showcase-wrapper"], { y: "3rem", autoAlpha: 0 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        fadeOut: () => $gsap.timeline()
            .set("#section-groups-wrapper", { clearProps: "height" })
            .set("#section-group-2", { maxHeight: "100vh" })
            .to(['#section-group-2', '#il'], { autoAlpha: 0, ...defaultTsArgs }),
        enterCallBack: () =>
        {
            pinScrollTrigger1.value.disable();
            transitionTriggerBeforeBn.value.disable();
            transitionTriggerAfterBn.value.disable();
            transitionTriggerBeforeIl.value.disable();
            intentObserver.value.enable();
        },
        enterBackCallBack: () =>
        {
            pinScrollTrigger1.value.disable();
            transitionTriggerBeforeBn.value.disable();
            transitionTriggerAfterBn.value.disable();
            transitionTriggerBeforeIl.value.disable();
            intentObserver.value.enable();
        },
    },
    // 10: il(body)
    {
        id: "il(body)",
        leaveBack: () => $gsap.timeline(),
        enter: () => $gsap.timeline(),
        enterCallBack: () =>
        {
            pinScrollTrigger1.value.disable();
            intentObserver.value.disable();
            transitionTriggerBeforeBn.value.disable();
            transitionTriggerAfterBn.value.disable();
            smoother.value = smoother.value || $ScrollSmoother.create({
                smooth: 1,
                effects: true,
                normalizeScroll: true,
            })
            $ScrollTrigger.refresh();
            transitionTriggerBeforeIl.value.enable();
        },
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline(),
        enterBackCallBack: () =>
        {
            pinScrollTrigger1.value.disable();
            intentObserver.value.disable();
            transitionTriggerBeforeBn.value.disable();
            transitionTriggerAfterBn.value.disable();
            smoother.value = smoother.value || $ScrollSmoother.create({
                smooth: 1,
                effects: true,
                normalizeScroll: true,
            })
            $ScrollTrigger.refresh();
            transitionTriggerBeforeIl.value.enable();
        },
        fadeOut: () => $gsap.timeline()
            .set("#section-groups-wrapper", { clearProps: "height" })
            .set("#section-group-2", { maxHeight: "100vh" })
            .to(['#section-group-2', '#il'], { autoAlpha: 0, ...defaultTsArgs }),
    },
]

// handle the panel swipe animations
function gotoPanel(index, isScrollingDown, isJump = false)
{
    if (transitions[index]?.noEnterBack) return;
    console.log("===== gotoPanel =====")
    animating = true;

    if (isScrollingDown && index >= transitions.length)
    {
        animating = false;
        return
    }
    if (!isScrollingDown && currentIndex <= 0)
    {
        animating = false;
        return
    }

    console.log(`${transitions[currentIndex].id} -> ${transitions[index].id}`)
    // smoother.value?.paused(true);
    const tl = $gsap.timeline()
    const callBacks = []
    if (isScrollingDown)
    {
        if (currentIndex >= 0)
        {
            console.log(`leave ${transitions[currentIndex].id}`)
            if (isJump)
            {
                tl.add(transitions[currentIndex].fadeOut())
                tl.add(() => setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }), 200))
                tl.to("#section-groups-wrapper", { duration: 0.3 })
            } else
            {
                tl.add(transitions[currentIndex].leave())
            }
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
            if (isJump)
            {
                tl.add(transitions[currentIndex].fadeOut())
                tl.add(() => setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }), 200))
                tl.to("#section-groups-wrapper", { duration: 0.3 })
            } else
            {
                tl.add(transitions[currentIndex].leaveBack())
            }
        }
        if (index < transitions.length)
        {
            console.log(`enterBack ${transitions[index].id}`)
            if (isJump)
            {
                tl.add(transitions[index].enterBackByJump())
            } else
            {
                tl.add(transitions[index].enterBack())
            }
            callBacks.push(transitions[index].enterBackCallBack)
        }
    }
    tl.then(() =>
    {
        callBacks.forEach(cb => cb && cb())
        animating = false;
        currentIndex = index;
        smoother.value?.paused(false);
    })
    console.log("===== /gotoPanel =====")
}

onMounted(() =>
{

    if (process.client)
    {
        console.log("===== onMounted top =====")
        intentObserverWeb.value?.kill();
        pinBgTriggerWeb.value?.kill();
        transitionTriggerAfterWsmWeb.value?.kill();
        transitionTriggerBeforeWsdWeb.value?.kill();
        transitionTriggerAfterWsdWeb.value?.kill();
        transitionTriggerBeforeWslWeb.value?.kill();

        dark.value = false
        darkGrad.value = false
        showModal.value = false
        showProfileModal.value = false

        setTimeout(() => window.scrollTo(0, 0), 200)

        $gsap.set($gsap.utils.toArray(".swipe-section section"), { autoAlpha: 0 })
        $gsap.set($gsap.utils.toArray(".swipe-section"), { autoAlpha: 0 })

        // create an observer and disable it to start
        intentObserver.value?.kill();
        intentObserver.value = $ScrollTrigger.observe({
            id: "intentObserver",
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
        intentObserver.value.disable();

        // Bannerセクションの入口でintentObserverをON/OFFするためのトリガー
        transitionTriggerBeforeBn.value?.kill();
        transitionTriggerBeforeBn.value = $ScrollTrigger.create({
            id: "transitionTriggerBeforeBn",
            trigger: "#bn",
            start: "top top-=1",
            end: "top top+=1",
            onLeaveBack: () =>
            {
                console.log(`transitionTriggerBeforeBn: onLeaveBack`)
                // intentObserver.enable();
            },
            onEnter: () =>
            {
                console.log(`transitionTriggerBeforeBn: onEnter`)
                // intentObserver.enable();
            },
            onLeave: () =>
            {
                console.log(`transitionTriggerBeforeBn: onLeave`)
                // intentObserver.disable();
            },
            onEnterBack: () =>
            {
                console.log(`transitionTriggerBeforeBn: onEnterBack`)
                // intentObserver.enable();
                gotoPanel(currentIndex - 1, false);
            },
        })
        transitionTriggerBeforeBn.value.disable();

        // Bannerセクションの出口でintentObserverをON/OFFするためのトリガー
        transitionTriggerAfterBn.value?.kill();
        transitionTriggerAfterBn.value = $ScrollTrigger.create({
            id: "transitionTriggerAfterBn",
            trigger: "#bn",
            start: "bottom bottom+=1",
            end: "bottom bottom-=1",
            onLeaveBack: () =>
            {
                console.log(`transitionTriggerAfterBn: onLeaveBack`)
            },
            onEnter: () =>
            {
                console.log(`transitionTriggerAfterBn: onEnter`)
                gotoPanel(currentIndex + 1, true)
            },
            onLeave: () =>
            {
                console.log(`transitionTriggerAfterBn: onLeave`)
            },
            onEnterBack: () =>
            {
                console.log(`transitionTriggerAfterBn: onEnterBack`)
            },
            markers: false
        })
        transitionTriggerAfterBn.value.disable();

        // Illustrationセクションの入口でintentObserverをON/OFFするためのトリガー
        transitionTriggerBeforeIl.value?.kill();
        transitionTriggerBeforeIl.value = $ScrollTrigger.create({
            id: "transitionTriggerBeforeIl",
            trigger: "#il",
            start: "top top+=1",
            end: "top top-=1",
            onLeaveBack: () =>
            {
                console.log(`transitionTriggerBeforeIl: onLeaveBack`)
            },
            onEnter: () =>
            {
                console.log(`transitionTriggerBeforeIl: onEnter`)
            },
            onLeave: () =>
            {
                console.log(`transitionTriggerBeforeIl: onLeave`)
            },
            onEnterBack: () =>
            {
                console.log(`transitionTriggerBeforeIl: onEnterBack`)
                gotoPanel(currentIndex - 1, false)
            },
            markers: false
        })
        transitionTriggerBeforeIl.value.disable();


        // pin swipe section and initiate observer
        pinScrollTrigger1.value?.kill();
        pinScrollTrigger1.value = $ScrollTrigger.create({
            id: "pinScrollTrigger1",
            trigger: "#section-group-1",
            pin: true,
            start: "top top",
            onLeaveBack: () =>
            {
                console.log(`pinScrollTrigger1: onLeaveBack`)
                intentObserver.value.disable();
            },
            onEnter: () =>
            {
                console.log(`pinScrollTrigger1: onEnter`)
                intentObserver.value.enable();
                // gotoPanel(currentIndex + 1, true);
            },
            onLeave: () =>
            {
                console.log(`pinScrollTrigger1: onLeave`)
                intentObserver.value.disable();
            },
            onEnterBack: () =>
            {
                console.log(`pinScrollTrigger1: onEnterBack`)
                intentObserver.value.enable();
                // gotoPanel(currentIndex - 1, false);
            },
            markers: false,
        })

        if (scrollTo.value > 0)
        {
            currentIndex = 0;
            goToPanelByJump()
        } else
        {
            //gotoPanel(currentIndex + 1, true);
            gotoPanel(1, true);
        }
    }
});

onUnmounted(() =>
{
    console.log("===== onUnmounted top =====")
    isCoolDownForDown = false;
    currentIndex = 0;
    animating = false;
    scrollTo.value = -1
    competitionIdx.value = 1;
    showModal.value = false;
    showProfileModal.value = false;
    dark.value = false
    darkGrad.value = false
})

function goToPanelByJump()
{
    const isDown = currentIndex < scrollTo.value;
    smoother.value?.kill();
    smoother.value = null;
    transitionTriggerBeforeBn.value.disable();
    transitionTriggerAfterBn.value.disable();
    transitionTriggerBeforeIl.value.disable();
    gotoPanel(scrollTo.value, isDown, true);
    scrollTo.value = -1;
}

watch(scrollTo, () =>
{
    if (scrollTo.value > 0) goToPanelByJump();
})
watch(showModal, () =>
{
    if (showModal.value)
    {
        intentObserver.value.disable();
        pinScrollTrigger1.value.disable();
        transitionTriggerBeforeBn.value.disable();
        transitionTriggerAfterBn.value.disable();
        transitionTriggerBeforeIl.value.disable();
        smoother.value?.paused(true);
        document.body.style.overflow = 'hidden';
    } else
    {
        smoother.value?.paused(false);
        transitions[currentIndex].enterCallBack();
        document.body.style.overflow = 'auto';
    };
})
watch(showProfileModal, () =>
{
    if (showProfileModal.value)
    {
        intentObserver.value.disable();
        pinScrollTrigger1.value.disable();
        transitionTriggerBeforeBn.value.disable();
        transitionTriggerAfterBn.value.disable();
        transitionTriggerBeforeIl.value.disable();
        smoother.value?.paused(true);
        document.body.style.overflow = 'hidden';
    } else
    {
        dark.value = false
        darkGrad.value = false
        smoother.value?.paused(false);
        transitions[currentIndex].enterCallBack();
        document.body.style.overflow = 'auto';
    };
})

</script>

<style lang="scss" scoped>
#section-groups-wrapper {
    position: relative;
    width: 100%;
}

.swipe-section {
    position: relative;
    min-height: 100vh;
    width: 100vw;
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
    width: 100%;
    opacity: 0;
}

.swipe-section .panel {
    opacity: 0;
}
</style>
