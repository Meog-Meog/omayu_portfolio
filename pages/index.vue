<template>
    <div>
        <div id="smooth-wrapper" :class="{ dark: dark, light: !dark }" class="body">
            <div id="smooth-content" :class="{ hide: showModal || showProfileModal }">
                <first-view />
                <web-sites-view />
                <competitions-view />
                <banners-view />
                <illustrations-view />
                <footer-view />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
const showProfileModal = useState('showProfileModal', () => false)
const showModal = useState('showModal', () => false)

useHead({
    title: 'MAYU TERAMOTO\'s Portfolio',
})

const dark = useState('dark', () => false)
const mouseStalkerText = useState('mouseStalkerText', () => '')
const smoother = useState('smoother')

onMounted(() =>
{
    if (process.client)
    {
        // 慣性スクロールの設定
        smoother.value = ScrollSmoother.create({
            smooth: 2,
            effects: true
        })

        // ダークモード切り替えの設定
        document.querySelectorAll('.js-target-darken').forEach((el, idx) =>
        {
            ScrollTrigger.create({
                trigger: el,
                id: idx.toString(),
                start: 'top 80%',
                end: 'bottom 50%',
                onEnter: self => dark.value = true,
                onEnterBack: self => dark.value = true,
                onLeave: self => dark.value = false,
                onLeaveBack: self => dark.value = false
            })
        })
        const resizeObserver = new ResizeObserver(entries =>
        {
            for (const entry of entries)
            {
                if (entry.target.classList.contains('js-target-darken'))
                {
                    ScrollTrigger.refresh();
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
            ScrollTrigger.create({
                trigger: el,
                id: idx.toString(),
                start: 'top 80%',
                toggleClass: { targets: el, className: 'is-in-view' },
                once: true
            })
        })
        document.querySelectorAll('.js-is-in-view-target--lazy').forEach((el, idx) =>
        {
            ScrollTrigger.create({
                trigger: el,
                id: idx.toString(),
                start: 'top 80%',
                toggleClass: { targets: el, className: 'is-in-view--lazy' },
                once: true
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
    }
})
</script>

<style scoped>
* {
    cursor: none;
}

.body {
    transition-timing-function: ease-out;
    transition-duration: 0.3s;
}

.light {
    background-color: #fff;
    color: #000;
}

.dark {
    position: relative;
    background-color: #0F0F0F;
    color: #5A5A5A;
}

.body::after {
    content: "";
    background: url('~/assets/image/banner/bgimg.png') 0% 0% no-repeat padding-box;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    opacity: 0;
    mix-blend-mode: overlay;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
    transition: opacity 0.5s ease-in;
}

.dark.body::after {
    opacity: 1;
}

.hide {
    opacity: 0;
    animation: 2.25s cubic-bezier(0.4, 0, 0, 1) 1s forwards fade-out;
}
</style>
