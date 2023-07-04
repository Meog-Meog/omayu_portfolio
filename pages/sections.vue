<template>
    <div id="section-group-1" class="swipe-section">
        <section id="kv" class="fullscreen-panel">
            <key-visual-panel />
        </section>
        <section id="ws" class="fullscreen-panel">
            <web-site-panel />
        </section>
        <section id="bn" class="panel">
            <banner-panel />
        </section>
    </div>
    <div id="section-group-2" class="swipe-section">
        <section id="il" class="fullscreen-panel">
            <illustration-panel />
        </section>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "v2",
})

const { $gsap, $ScrollTrigger } = useNuxtApp();

onMounted(() =>
{
    if (process.client)
    {
        let currentIndex = 0;
        let animating;
        let pinScrollTrigger1;
        let pinScrollTrigger2;
        let pinControllerBeforeBn;
        let pinControllerAfterBn;

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
            },
            // 1: kv
            {
                id: "kv",
                enter: () => $gsap.timeline()
                    .to('#kv', { y: 0, opacity: 1, duration: 0 })
                    .to('#kv-fullname', {
                        duration: 1,
                        opacity: 1,
                        ease: 'power2.inOut',
                    })
                    .to('#kv-scrolling-hint', {
                        duration: 1,
                        opacity: 1,
                        ease: 'power2.inOut',
                    }),
                leave: () => $gsap.timeline()
                    .to('#kv', { y: -100, opacity: 0, ...defaultTsArgs }),
                enterBack: () => $gsap.timeline()
                    .fromTo('#kv', { y: -100, opacity: 0 }, { y: 0, opacity: 1, ...defaultTsArgs })
            },
            // 2: ws(title)
            {
                id: "ws(title)",
                leaveBack: () => $gsap.timeline()
                    .to('#ws', { y: 100, opacity: 0, ...defaultTsArgs }),
                enter: () => $gsap.timeline()
                    .to(['#ws-thumbnails1', '#ws-thumbnails2'], { opacity: 0, duration: 0 })
                    .fromTo('#ws', { y: 100, opacity: 0 }, { opacity: 1, y: 0, ...defaultTsArgs }),
                leave: () => $gsap.timeline(),
                enterBack: () => $gsap.timeline(),
            },
            // 3: ws(1,2)
            {
                id: "ws(1,2)",
                leaveBack: () => $gsap.timeline()
                    .to('#ws-thumbnails1', { y: 100, opacity: 0, ...defaultTsArgs }),
                enter: () => $gsap.timeline()
                    .to('#ws-thumbnails1', { y: 100, opacity: 0, duration: 0 })
                    .to('#ws-thumbnails1', { y: 0, opacity: 1, ...defaultTsArgs }),
                leave: () => $gsap.timeline()
                    .to('#ws-thumbnails1', { y: -100, opacity: 0, ...defaultTsArgs }),
                enterBack: () => $gsap.timeline()
                    .to('#ws-thumbnails1', { y: -100, opacity: 0, duration: 0 })
                    .to('#ws-thumbnails1', { y: 0, opacity: 1, ...defaultTsArgs }),
            },
            // 4: ws(3,4)
            {
                id: "ws(3,4)",
                leaveBack: () => $gsap.timeline()
                    .to('#ws-thumbnails2', { y: 100, opacity: 0, ...defaultTsArgs }),
                enter: () => $gsap.timeline()
                    .fromTo('#ws-thumbnails2', { y: 100, opacity: 0 }, { y: 0, opacity: 1, ...defaultTsArgs }),
                leave: () => $gsap.timeline()
                    .to('#ws', { y: -100, opacity: 0, ...defaultTsArgs }),
                //.to('.swipe-section', { y: -100, opacity: 0, ...defaultTsArgs }),
                enterBack: () => $gsap.timeline()
                    .to('#ws-thumbnails2', { opacity: 1, duration: 0 })
                    .fromTo('#ws', { y: -100, opacity: 0 }, { y: 0, opacity: 1, ...defaultTsArgs })
            },
            /*
            // 5: cmp(title)
            {
                leaveBack: () => $gsap.timeline()
                    .to('#cmp', { y: 100, opacity: 0, ...defaultTsArgs }),
                enter: () => $gsap.timeline()
                    .to('#cmp', { y: 100, opacity: 0, duration: 0 })
                    .to('#cmp-thumbnails', { y: 100, opacity: 0, duration: 0 })
                    .to('#cmp', {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power3',
                    }),
                leave: () => $gsap.timeline(),
                enterBack: () => $gsap.timeline(),
            },
            // 6: cmp(horizontal scroll)
            {
                leaveBack: () => $gsap.timeline()
                    .to('#cmp-thumbnails', { y: 100, opacity: 0, ...defaultTsArgs }),
                enter: () => $gsap.timeline()
                    .to('#cmp-thumbnails', { y: 100, opacity: 0, duration: 0 })
                    .to('#cmp-thumbnails', {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power3',
                    }),
                leave: () => $gsap.timeline(),
                enterBack: () => $gsap.timeline(),
            },
            */
            // 7: bn(top)
            {
                id: "bn(top)",
                leaveBack: () =>
                {
                    const tl = $gsap.timeline()
                        .to('#bn', { opacity: 0, ...defaultTsArgs });
                    tl.add(
                        $gsap.to('#bn__title', { y: 100, opacity: 0, ...defaultTsArgs }), 0
                    )
                    tl.add(
                        $gsap.to('#bn__grid-wrapper', { y: 100, opacity: 0, ...defaultTsArgs }), 0
                    )
                    return tl
                },
                leaveBackCallBack: () => { },
                enter: () => $gsap.timeline()
                    .to('#bn', { y: 0, opacity: 0, duration: 0 })
                    .to('#bn__title', { y: 100, opacity: 0, duration: 0 })
                    .to('#bn__grid-wrapper', { y: 100, opacity: 0, duration: 0 })
                    .to('#bn', {
                        opacity: 1,
                        ...defaultTsArgs,
                    })
                    .to('#bn__title', {
                        y: 0,
                        opacity: 1,
                        ...defaultTsArgs,
                    })
                    .to('#bn__grid-wrapper', {
                        y: 0,
                        opacity: 1,
                        ...defaultTsArgs,
                    }),
                enterCallBack: () => { },
                leave: () => $gsap.timeline(),
                leaveCallBack: () => { },
                enterBack: () => $gsap.timeline(),
                enterBackCallBack: () => { },
            },
            // 8: bn(body)
            {
                id: "bn(body)",
                leaveBack: () => $gsap.timeline(),
                leaveBackCallBack: () =>
                {
                    pinScrollTrigger1.enable();
                    intentObserver.enable();
                    pinControllerBeforeBn.disable();
                    pinControllerAfterBn.disable();
                },
                enter: () => $gsap.timeline(),
                enterCallBack: () =>
                {
                    pinScrollTrigger1.disable();
                    intentObserver.disable();
                    pinControllerBeforeBn.enable();
                    pinControllerAfterBn.enable();
                },
                leave: () =>
                {
                    pinControllerBeforeBn.disable();
                    pinControllerAfterBn.disable();
                    return $gsap.timeline()
                        .to('#bn__grid-wrapper', { y: -100, opacity: 0, ...defaultTsArgs })
                        .to('#bn', { opacity: 0, ...defaultTsArgs }, "<")
                        .to("#section-group-1", { opacity: 0, ...defaultTsArgs }, "<")
                },
                leaveCallBack: () =>
                {
                    pinScrollTrigger1.disable();
                },
                enterBack: () =>
                {
                    const tl = $gsap.timeline()
                        .to("#section-group-1", { opacity: 1, duration: 0 })
                        .to('#bn', { opacity: 1, ...defaultTsArgs });
                    tl.add($gsap.fromTo('#bn__title', { y: -100, opacity: 0 }, { y: 0, opacity: 1, ...defaultTsArgs }), 0)
                    tl.add($gsap.fromTo('#bn__grid-wrapper', { y: -100, opacity: 0 }, { y: 0, opacity: 1, ...defaultTsArgs }), 0)
                    return tl
                },
                enterBackCallBack: () =>
                {
                    intentObserver.disable();
                    pinControllerBeforeBn.enable();
                    pinControllerAfterBn.enable();
                },
            },
            // 9: illustraiton
            {
                id: "il",
                leaveBack: () => $gsap.timeline()
                    .fromTo("#il__title", { y: 0, opacity: 1 }, { y: 100, opacity: 0, ...defaultTsArgs })
                    .fromTo("#il__showcase-wrapper", { y: 0, opacity: 1 }, { y: 100, opacity: 0, ...defaultTsArgs }, "<")
                    .to("#section-group-2", { opacity: 0, duration: 0 }, ">")
                    .to("#il", { opacity: 0, duration: 0 }, "<"),
                leaveBackCallBack: () =>
                {
                    intentObserver.disable();
                    pinScrollTrigger2.disable();
                },
                enter: () => $gsap.timeline()
                    .to("#section-group-2", { opacity: 1, duration: 0 })
                    .to("#il", { opacity: 1, duration: 0 }, ">")
                    .fromTo("#il__title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, ...defaultTsArgs }, ">")
                    .fromTo("#il__showcase-wrapper", { y: 100, opacity: 0 }, { y: 0, opacity: 1, ...defaultTsArgs }, ">"),
                enterCallBack: () =>
                {
                    // pinScrollTrigger2.enable();
                    intentObserver.enable();
                },
                leave: () => $gsap.timeline(),
                leaveCallBack: () => { },
                enterBack: () => $gsap.timeline(),
                enterBackCallBack: () => { },
            },
        ]

        // create an observer and disable it to start
        let intentObserver = $ScrollTrigger.observe({
            type: "wheel,touch",
            onUp: () =>
            {
                console.log('onUp - intentObserver')
                !animating && gotoPanel(currentIndex + 1, true)
            },
            onDown: () =>
            {
                console.log('onDown - intentObserver')
                !animating && gotoPanel(currentIndex - 1, false)
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

        // handle the panel swipe animations
        function gotoPanel(index, isScrollingDown)
        {
            console.log("===== gotoPanel =====")
            animating = true;
            // return to normal scroll if we're at the end or back up to the start
            /*
            if ((index === transitions.length && isScrollingDown) || (index === -1 && !isScrollingDown))
            {
                console.log(`end`)
                animating = false;
                if (isScrollingDown)
                {
                    console.log(`disable`)
                    intentObserver.disable();
                }
                return
            }
            */

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

        // Bannerセクションの入口でpinScrollTrigger1をON/OFFするためのトリガー
        pinControllerBeforeBn = $ScrollTrigger.create({
            id: "pinControllerBeforeBn",
            trigger: "#bn",
            start: "top top-=1",
            end: "top top+=1",
            onLeaveBack: () =>
            {
                console.log(`pinControllerBeforeBn: onLeaveBack`)
                intentObserver.enable();
            },
            onEnter: () =>
            {
                console.log(`pinControllerBeforeBn: onEnter`)
                intentObserver.enable();
            },
            onLeave: () =>
            {
                console.log(`pinControllerBeforeBn: onLeave`)
                intentObserver.disable();
            },
            onEnterBack: () =>
            {
                console.log(`pinControllerBeforeBn: onEnterBack`)
                intentObserver.enable();
                gotoPanel(currentIndex - 1, false);
            },
        })
        pinControllerBeforeBn.disable();

        // Bannerセクションの出口でpinScrollTrigger1をON/OFFするためのトリガー
        pinControllerAfterBn = $ScrollTrigger.create({
            id: "pinControllerAfterBn",
            trigger: "#bn",
            start: "bottom bottom-=1",
            end: "bottom bottom+=1",
            onLeaveBack: () =>
            {
                console.log(`pinControllerAfterBn: onLeaveBack`)
                intentObserver.disable();
            },
            onEnter: () =>
            {
                console.log(`pinControllerAfterBn: onEnter`)
                intentObserver.enable();
            },
            onLeave: () =>
            {
                console.log(`pinControllerAfterBn: onLeave`)
                intentObserver.enable();
                gotoPanel(currentIndex + 1, true)
            },
            onEnterBack: () =>
            {
                console.log(`pinControllerAfterBn: onEnterBack`)
                intentObserver.disable();
            },
            markers: true,
        })
        pinControllerAfterBn.disable();


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
        pinScrollTrigger2 = $ScrollTrigger.create({
            id: "pinScrollTrigger2",
            trigger: "#section-group-2",
            pin: true,
            start: "top top",
            onLeaveBack: () =>
            {
                console.log(`pinScrollTrigger2: onLeaveBack`)
                intentObserver.disable();
            },
            onEnter: () =>
            {
                console.log(`pinScrollTrigger2: onEnter`)
                intentObserver.enable();
                // gotoPanel(currentIndex + 1, true);
            },
            onLeave: () =>
            {
                console.log(`pinScrollTrigger2: onLeave`)
                intentObserver.disable();
            },
            onEnterBack: () =>
            {
                console.log(`pinScrollTrigger2: onEnterBack`)
                intentObserver.enable();
                // gotoPanel(currentIndex - 1, false);
            },
            markers: true,
        })
        pinScrollTrigger2.disable();

        gotoPanel(currentIndex + 1, true);
    }

});

</script>

<style lang="scss" scoped>
.swipe-section {
    position: relative;
    min-height: 100vh;
    width: 100vw;
    overflow: visible;
    background-color: #fff;

    &:not(:first-of-type) {
        opacity: 0;
        margin-top: -100vh;
    }
}

.swipe-section .fullscreen-panel {
    position: absolute;
    opacity: 0;
}

.swipe-section .panel {
    opacity: 0;
}
</style>
