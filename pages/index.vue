<template>
    <div>
        <first-view />
        <web-sites-view />
        <competitions-view />
        <banners-view />
        <illustrations-view />
    </div>
</template>

<script setup lang="ts">
const { $gsap, $ScrollTrigger } = useNuxtApp();
const showProfileModal = useState('showProfileModal')
const showModal = useState('showModal')
const dark = useState('dark')
const darkGrad = useState('darkGrad')
const mouseStalkerText = useState('mouseStalkerText')
const route = useRoute()
const smoother = useState<ScrollSmoother>('smoother')
const scrollTo = useState<string>('scrollTo', () => '')

useHead({
    title: 'MAYU TERAMOTO\'s Portfolio'
})

onMounted(async () =>
{
    if (process.client)
    {
        // ダークモード切り替えの設定
        document.querySelectorAll('.js-target-darken').forEach((el, idx) =>
        {
            $gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    id: idx.toString(),
                    start: 'top 80%',
                    end: 'bottom 50%',
                    onEnter: self => dark.value = true,
                    onEnterBack: self => dark.value = true,
                    onLeave: self => dark.value = false,
                    onLeaveBack: self => dark.value = false
                }
            })
        })
        const resizeObserver = new ResizeObserver(entries =>
        {
            for (const entry of entries)
            {
                if (entry.target.classList.contains('js-target-darken'))
                {
                    $ScrollTrigger.refresh();
                }
            }
        });
        document.querySelectorAll('.js-target-darken').forEach(el =>
        {
            resizeObserver.observe(el);
        });
        onUnmounted(() =>
        {
            document.querySelectorAll('.js-target-darken').forEach(el =>
            {
                resizeObserver.unobserve(el);
            });
        });

        // 画面に映ったら要素をフワッと表示させるアニメーションの設定
        document.querySelectorAll('.js-is-in-view-target').forEach((el, idx) =>
        {
            $gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    id: idx.toString(),
                    start: 'top 80%',
                    toggleClass: { targets: el, className: 'is-in-view' },
                    once: true
                }
            })
        })
        document.querySelectorAll('.js-is-in-view-target--lazy').forEach((el, idx) =>
        {
            $gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    id: idx.toString(),
                    start: 'top 80%',
                    toggleClass: { targets: el, className: 'is-in-view--lazy' },
                    once: true
                }
            })
        })

        // クリック可能要素上にホバーした際の処理を設定
        for (const clickable of document.getElementsByClassName('clickable'))
        {
            clickable.addEventListener('mouseover', () =>
            {
                mouseStalkerText.value = 'Click'
            }, false)
            clickable.addEventListener('mouseout', () =>
            {
                mouseStalkerText.value = ''
            }, false)
        }
        for (const clickable of document.getElementsByClassName('clickable-view'))
        {
            clickable.addEventListener('mouseover', () =>
            {
                mouseStalkerText.value = 'View'
            }, false)
            clickable.addEventListener('mouseout', () =>
            {
                mouseStalkerText.value = ''
            }, false)
        }
        for (const clickable of document.getElementsByClassName('clickable-next'))
        {
            clickable.addEventListener('mouseover', () =>
            {
                mouseStalkerText.value = 'Next'
            }, false)
            clickable.addEventListener('mouseout', () =>
            {
                mouseStalkerText.value = ''
            }, false)
        }
        for (const clickable of document.getElementsByClassName('clickable-back'))
        {
            clickable.addEventListener('mouseover', () =>
            {
                mouseStalkerText.value = 'Back'
            }, false)
            clickable.addEventListener('mouseout', () =>
            {
                mouseStalkerText.value = ''
            }, false)
        }

        // クリック可能要素上にホバーした際の処理を設定（darkテーマ固定版）
        for (const clickable of document.getElementsByClassName('clickable--dark'))
        {
            clickable.addEventListener('mouseover', () =>
            {
                mouseStalkerText.value = 'Click--dark'
            }, false)
            clickable.addEventListener('mouseout', () =>
            {
                mouseStalkerText.value = ''
            }, false)
        }


        if (scrollTo.value === 'web-site')
        {
            await new Promise(res => setTimeout(res, 100));
            smoother.value?.scrollTo('.web-sites__title', false, "top top");
        }
        if (scrollTo.value === 'competition')
        {
            await new Promise(res => setTimeout(res, 100));
            smoother.value?.scrollTo('#competition', false, "center center");
        }
        if (scrollTo.value === 'banner')
        {
            dark.value = true
            await new Promise(res => setTimeout(res, 100));
            smoother.value?.scrollTo('.banners__title-container', false, "top top");
        }
        if (scrollTo.value === 'illustration')
        {
            dark.value = true
            await new Promise(res => setTimeout(res, 100));
            smoother.value?.scrollTo('#illustration', false, "top top");
        }
    }
})
</script>
