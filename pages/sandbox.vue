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
const scrollTo = useState('scrollTo', "")
smoother.value?.kill();

let currentIndex = 0;
let animating;
let intentObserver;
let pinScrollTrigger1;
let transitionTriggerBeforeBn;
let transitionTriggerAfterBn;
let transitionTriggerBeforeIl;

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
const transitions = [
    // 0: white-screen
    {
        id: "init",
        noEnterBack: true,
        enter: () => $gsap.timeline(),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline(),
        leaveByJump: () => $gsap.timeline(),
    },
    // 1: kv
    {
        id: "kv",
        enter: () => $gsap.timeline()
            .set('#section-group-1', { autoAlpha: 1 })
            .set('#kv', { y: 0, autoAlpha: 1 })
            .to('#kv-fullname', {
                duration: 1,
                autoAlpha: 1,
                ease: 'power2.inOut',
            })
            .to('#kv-scrolling-hint', {
                duration: 1,
                autoAlpha: 1,
                ease: 'power2.inOut',
            }),
        enterCallBack: () =>
        {
            pinScrollTrigger1.enable();
            intentObserver.enable();
            transitionTriggerBeforeBn.disable();
            transitionTriggerAfterBn.disable();
            transitionTriggerBeforeIl.disable();
        },
        leave: () => $gsap.timeline()
            .to('#kv', { y: -100, autoAlpha: 0, ...defaultTsArgs }),
        enterBack: () => $gsap.timeline()
            .set(['#section-group-1', '#kv-fullname', '#kv-scrolling-hint'], { autoAlpha: 1 })
            .fromTo('#kv', { y: -100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ...defaultTsArgs })
    },
    // 2: ws(title)
    {
        id: "ws(title)",
        leaveBack: () => $gsap.timeline()
            .to('#ws', { y: 100, autoAlpha: 0, ...defaultTsArgs }),
        enter: () => $gsap.timeline()
            .set('#ws-thumbnails1', { autoAlpha: 0 })
            .set('#ws-thumbnails2', { autoAlpha: 0 })
            .set('#section-group-1', { autoAlpha: 1 })
            .set(['#ws-thumbnails1', '#ws-thumbnails2'], { autoAlpha: 0 })
            .fromTo('#ws', { y: 100, autoAlpha: 0 }, { autoAlpha: 1, y: 0, ...defaultTsArgs }),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline()
            .set('#ws-thumbnails1', { autoAlpha: 0 })
            .set('#ws-thumbnails2', { autoAlpha: 0 })
            .set('#section-group-1', { autoAlpha: 1 }),
        enterBackByJump: () => $gsap.timeline()
            .add(() => setTimeout(() => window.scrollTo(0, 0), 200))
            .set('#ws-thumbnails1', { autoAlpha: 0, zIndex: -1 })
            .set('#section-group-1', { autoAlpha: 1 })
            .set('#ws-thumbnails2', { autoAlpha: 0, zIndex: 1 })
            .fromTo('#ws', { y: -100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        enterCallBack: () =>
        {
            intentObserver.enable();
            pinScrollTrigger1.enable();
        },
        enterBackCallBack: () =>
        {
            intentObserver.enable();
            pinScrollTrigger1.enable();
        }
    },
    // 3: ws(1,2)
    {
        id: "ws(1,2)",
        leaveBack: () => $gsap.timeline()
            .to('#ws-thumbnails1', { y: 100, autoAlpha: 0, ...defaultTsArgs }),
        enter: () => $gsap.timeline()
            .set('#ws-thumbnails2', { autoAlpha: 0, zIndex: -1 })
            .fromTo('#ws-thumbnails1', { y: 100, autoAlpha: 0, zIndex: 1 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        leave: () => $gsap.timeline()
            .to('#ws-thumbnails1', { y: -100, autoAlpha: 0, ...defaultTsArgs }),
        enterBack: () => $gsap.timeline()
            .set('#ws-thumbnails2', { autoAlpha: 0, zIndex: -1 })
            .fromTo('#ws-thumbnails1', { y: -100, autoAlpha: 0, zIndex: 1 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
    },
    // 4: ws(3,4)
    {
        id: "ws(3,4)",
        leaveBack: () => $gsap.timeline()
            .to('#ws-thumbnails2', { y: 100, autoAlpha: 0, ...defaultTsArgs }),
        enter: () => $gsap.timeline()
            .set('#ws-thumbnails1', { autoAlpha: 0, zIndex: -1 })
            .set('#section-group-1', { autoAlpha: 1 })
            .fromTo('#ws-thumbnails2', { y: 100, autoAlpha: 0, zIndex: 1 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        leave: () => $gsap.timeline()
            .to('#ws', { y: -100, autoAlpha: 0, ...defaultTsArgs }),
        enterBack: () => $gsap.timeline()
            .set('#ws-thumbnails1', { autoAlpha: 0, zIndex: -1 })
            .set('#section-group-1', { autoAlpha: 1 })
            .set('#ws-thumbnails2', { autoAlpha: 1, zIndex: 1 })
            .fromTo('#ws', { y: -100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
    },
    // 4: cp(title)
    {
        id: "cp(title)",
        leaveBack: () => $gsap.timeline()
            .fromTo("#cp-title", { y: 0, autoAlpha: 1 }, { y: 100, autoAlpha: 0, ...defaultTsArgs })
            .set('#cp', { autoAlpha: 0 }),
        enter: () => $gsap.timeline()
            .set('#cp', { autoAlpha: 1 })
            .fromTo("#cp-title", { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline(),
    },
    // 4: cp(1)
    {
        id: "cp(1)",
        leaveBack: () => $gsap.timeline()
            .fromTo("#cp-thumbnails-wrapper", { y: 0, autoAlpha: 1 }, { y: 100, autoAlpha: 0, ...defaultTsArgs }),
        enter: () => $gsap.timeline()
            .fromTo("#cp-thumbnails-wrapper", { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline(),
    },
    // 4: cp(2)
    {
        id: "cp(2)",
        leaveBack: () => $gsap.timeline()
            .fromTo("#cp-thumbnails", { x: -(window.innerWidth - 300) / 2 }, { x: 0, ...defaultTsArgs },),
        enter: () => $gsap.timeline()
            .fromTo("#cp-thumbnails", { x: 0 }, { x: -(window.innerWidth - 300) / 2, ...defaultTsArgs }),
        leave: () => $gsap.timeline()
            .set('#cp', { autoAlpha: 0 }),
        enterBack: () => $gsap.timeline()
            .set('#cp', { autoAlpha: 1 }),
        enterBackCallBack: () =>
        {
            intentObserver.enable();
            pinScrollTrigger1.enable();
        }
    },
    // 7: bn(head)
    {
        id: "bn(head)",
        leaveBack: () => $gsap.timeline()
            .to('#bn', { autoAlpha: 0, ...defaultTsArgs })
            .to(['#bn__title', '#bn__grid-wrapper'], { y: 100, autoAlpha: 0, ...defaultTsArgs }, "<"),
        enter: () => $gsap.timeline()
            .set('#section-group-1', { autoAlpha: 1 })
            .set('#bn', { y: 0, autoAlpha: 0 })
            .set(['#bn__title', '#bn__grid-wrapper'], { y: 100, autoAlpha: 0 })
            .to('#bn', { autoAlpha: 1, ...defaultTsArgs })
            .to('#bn__title', { y: 0, autoAlpha: 1, ...defaultTsArgs })
            .to('#bn__grid-wrapper', { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        enterCallBack: () =>
        {
            pinScrollTrigger1.disable();
            intentObserver.enable();
            transitionTriggerBeforeBn.disable();
            transitionTriggerAfterBn.disable();
            transitionTriggerBeforeIl.disable();
        },
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline()
            .set('#section-group-1', { autoAlpha: 1 }),
        enterBackCallBack: () =>
        {
            smoother.value?.kill();
            $ScrollTrigger.refresh();
            pinScrollTrigger1.disable();
            intentObserver.enable();
            transitionTriggerBeforeBn.disable();
            transitionTriggerAfterBn.disable();
            transitionTriggerBeforeIl.disable();
        },
    },
    // 8: bn(body)
    {
        id: "bn(body)",
        leaveBack: () => $gsap.timeline(),
        enter: () => $gsap.timeline(),
        enterCallBack: () =>
        {
            smoother.value = $ScrollSmoother.create({
                smooth: 1,
                effects: true,
                normalizeScroll: true,
            })
            $ScrollTrigger.refresh();
            pinScrollTrigger1.disable();
            intentObserver.disable();
            transitionTriggerBeforeBn.enable();
            transitionTriggerAfterBn.enable();
            transitionTriggerBeforeIl.disable();
        },
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline(),
        enterBackCallBack: () =>
        {
            $ScrollTrigger.refresh();
            pinScrollTrigger1.disable();
            intentObserver.disable();
            transitionTriggerBeforeBn.enable();
            transitionTriggerAfterBn.enable();
            transitionTriggerBeforeIl.disable();
        },
    },
    // 9: bn(tail)
    {
        id: "bn(tail)",
        leaveBack: () => $gsap.timeline(),
        enter: () => $gsap.timeline(),
        enterCallBack: () =>
        {
            coolDownForDown(500);
            pinScrollTrigger1.disable();
            intentObserver.enable();
            transitionTriggerBeforeBn.disable();
            transitionTriggerAfterBn.disable();
            transitionTriggerBeforeIl.disable();
        },
        leave: () => $gsap.timeline()
            .to('#bn__grid-wrapper', { y: -100, autoAlpha: 0, ...defaultTsArgs })
            .to('#bn', { autoAlpha: 0, ...defaultTsArgs })
            .set("#section-group-1", { autoAlpha: 0 }),
        enterBack: () => $gsap.timeline()
            .set("#section-group-1", { autoAlpha: 1 })
            .to('#bn', { autoAlpha: 1, ...defaultTsArgs })
            .fromTo(['#bn__title', '#bn__grid-wrapper'], { y: -100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        enterBackCallBack: () =>
        {
            pinScrollTrigger1.disable();
            intentObserver.enable();
            transitionTriggerBeforeBn.disable();
            transitionTriggerAfterBn.disable();
            transitionTriggerBeforeIl.disable();
        },
    },
    // 10: il(head)
    {
        id: "il(head)",
        leaveBack: () => $gsap.timeline()
            .fromTo(["#il__title", "#il__showcase-wrapper"], { y: 0, autoAlpha: 1 }, { y: 100, autoAlpha: 0, ...defaultTsArgs })
            .set(["#section-group-2", "#il"], { autoAlpha: 0 })
            .set("#section-group-2", { maxHeight: "100vh" })
        ,
        enter: () => $gsap.timeline()
            .set("#section-group-2", { maxHeight: "500vh" })
            .set(["#section-group-2", "#il"], { autoAlpha: 1 })
            .fromTo(["#il__title", "#il__showcase-wrapper"], { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        enterCallBack: () =>
        {
            transitionTriggerBeforeBn.disable();
            transitionTriggerAfterBn.disable();
            transitionTriggerBeforeIl.disable();
            intentObserver.enable();
        },
        leave: () => $gsap.timeline(),
        enterBack: () => $gsap.timeline(),
        enterBackByJump: () => $gsap.timeline()
            .set("#section-group-2", { maxHeight: "500vh" })
            .set(["#section-group-2", "#il"], { autoAlpha: 1 })
            .fromTo(["#il__title", "#il__showcase-wrapper"], { y: -100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ...defaultTsArgs }),
        enterBackCallBack: () =>
        {
            transitionTriggerBeforeBn.disable();
            transitionTriggerAfterBn.disable();
            transitionTriggerBeforeIl.disable();
            intentObserver.enable();
        },
    },
    // 10: il(body)
    {
        id: "il(body)",
        leaveBack: () => $gsap.timeline(),
        leaveBackCallBack: () => { },
        enter: () => $gsap.timeline(),
        enterCallBack: () =>
        {
            intentObserver.disable();
            transitionTriggerBeforeBn.disable();
            transitionTriggerAfterBn.disable();
            transitionTriggerBeforeIl.enable();
        },
        leave: () => $gsap.timeline(),
        leaveCallBack: () => { },
        enterBack: () => $gsap.timeline(),
        enterBackCallBack: () =>
        {
            intentObserver.disable();
            transitionTriggerBeforeBn.disable();
            transitionTriggerAfterBn.disable();
            transitionTriggerBeforeIl.enable();
        },
        leaveBackByJump: () => $gsap.timeline()
            .fromTo(["#il"], { y: 0, autoAlpha: 1 }, { y: 100, autoAlpha: 0, ...defaultTsArgs })
            .set(["#section-group-2", "#il"], { autoAlpha: 0, y: 0 })
            .set("#section-group-2", { maxHeight: "100vh" })
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
    const tl = $gsap.timeline()
    const callBacks = []
    if (isScrollingDown)
    {
        if (currentIndex >= 0)
        {
            console.log(`leave ${transitions[currentIndex].id}`)
            if (isJump)
            {
                tl.add(transitions[currentIndex].leaveByJump())
            } else
            {
                tl.add(transitions[currentIndex].leave())
            }
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
            if (isJump)
            {
                tl.add(transitions[currentIndex].leaveBackByJump())
            } else
            {
                tl.add(transitions[currentIndex].leaveBack())
            }
            callBacks.push(transitions[currentIndex].leaveBackCallBack)
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
    })
    currentIndex = index;
    console.log("===== /gotoPanel =====")
}

onMounted(() =>
{
    if (process.client)
    {
        setTimeout(() => window.scrollTo(0, 0), 200)

        $gsap.set($gsap.utils.toArray(".swipe-section section"), { autoAlpha: 0 })
        $gsap.set($gsap.utils.toArray(".swipe-section"), { autoAlpha: 0 })

        // create an observer and disable it to start
        intentObserver = $ScrollTrigger.observe({
            type: "wheel,touch",
            onUp: () =>
            {
                if (!isCoolDownForDown)
                {
                    console.log('onUp - intentObserver');
                    !animating && gotoPanel(currentIndex + 1, true);
                }
            },
            onDown: () =>
            {
                console.log('onDown - intentObserver');
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
        intentObserver.disable();

        // Bannerセクションの入口でintentObserverをON/OFFするためのトリガー
        transitionTriggerBeforeBn = $ScrollTrigger.create({
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
        transitionTriggerBeforeBn.disable();

        // Bannerセクションの出口でintentObserverをON/OFFするためのトリガー
        transitionTriggerAfterBn = $ScrollTrigger.create({
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
        transitionTriggerAfterBn.disable();

        // Illustrationセクションの入口でintentObserverをON/OFFするためのトリガー
        transitionTriggerBeforeIl = $ScrollTrigger.create({
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
        transitionTriggerBeforeIl.disable();


        // pin swipe section and initiate observer
        pinScrollTrigger1 = $ScrollTrigger.create({
            id: "pinScrollTrigger1",
            trigger: "#section-group-1",
            pin: true,
            start: "top top",
            onLeaveBack: () =>
            {
                console.log(`pinScrollTrigger1: onLeaveBack`)
                intentObserver.disable();
            },
            onEnter: () =>
            {
                console.log(`pinScrollTrigger1: onEnter`)
                intentObserver.enable();
                // gotoPanel(currentIndex + 1, true);
            },
            onLeave: () =>
            {
                console.log(`pinScrollTrigger1: onLeave`)
                intentObserver.disable();
            },
            onEnterBack: () =>
            {
                console.log(`pinScrollTrigger1: onEnterBack`)
                intentObserver.enable();
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
            gotoPanel(currentIndex + 1, true);
        }
    }
});

function goToPanelByJump()
{
    const isDown = currentIndex < scrollTo.value;
    smoother.value?.kill();
    pinScrollTrigger1.disable();
    intentObserver.disable();
    transitionTriggerBeforeBn.disable();
    transitionTriggerAfterBn.disable();
    transitionTriggerBeforeIl.disable();
    gotoPanel(scrollTo.value, isDown, true);
    scrollTo.value = -1;
}

watch(scrollTo, () =>
{
    if (scrollTo.value > 0) goToPanelByJump();
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
    overflow: visible;
    background-color: #fff;
}

#section-group-2 {
    opacity: 0;
    margin-top: -100vh;
    max-height: 100vh;
    overflow: hidden;
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
