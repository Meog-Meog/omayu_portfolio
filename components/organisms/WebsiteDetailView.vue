<template>
    <div>
        <img class="web-site__text" src="~/assets/image/website/sugoyose_text_2c2c2c.svg?url" />
        <img class="web-site__mock slide-in" src="~/assets/image/website/sugoyose_mock.webp" />
        <div class="web-site__body">
            <div class="web-site__design">
                <img src="https://placehold.jp/683x821.png" />
            </div>
            <div>
                <h1>
                    スゴヨセ
                </h1>
                <div>
                    <h2>
                        制作期間
                    </h2>
                    <p>
                        2021~2023年
                    </p>
                </div>
                <div>
                    <h2>
                        担当領域
                    </h2>
                    <p>
                        UIデザイン(ほぼ全ての下層ページ), 仕様提案など
                    </p>
                </div>
                <div>
                    <h2>
                        サービス概要
                    </h2>
                    <p>
                        オンライン上で寄せ書きブックの作成・注文ができる
                    </p>
                </div>
                <div>
                    <h2>
                        施策・デザイン説明
                    </h2>
                    <p>
                        全ての画面において「無駄のない直感的なUI」を意識して設計。<br />
                        また、競合との差別化を図るため、ブックのビジュアルデザインにも力を入れている。
                    </p>
                </div>
                <div>
                    <h2>
                        受賞歴・掲載歴
                    </h2>
                    <p>
                        2022年度グッドデザイン賞 受賞<br />
                        Webデザインギャラリー・リンク集「SANKOU!」掲載
                    </p>
                </div>
                <hr />
                <div>
                    <p>
                        ページ切り替え
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp();
const dark = useState('dark', () => false)

onMounted(() =>
{
    if (process.client)
    {
        const body = document.querySelector('.web-site__body');
        $gsap.to(body, {
            scrollTrigger: {
                trigger: body,
                start: 'top bottom',
                onEnter: self => dark.value = true,
                onEnterBack: self => dark.value = true,
                onLeave: self => dark.value = false,
                onLeaveBack: self => dark.value = false,
                //once: true,
                markers: true
            }
        });

        const text = document.querySelector('.web-site__text');
        $gsap.to(text, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: text,
                scrub: true
            },
        });
    }
})
</script>

<style lang="scss" scoped>
.web-site {
    &__container {
        padding: 50vh 100px 0 100px;
        margin-bottom: 150vh;
        position: relative;
        text-align: center;
    }

    &__text {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;

        &.fade-in {
            opacity: 0;
            animation: 2s cubic-bezier(0.4, 0, 0, 1) 0.5s forwards fade-in;
        }
    }

    &__mock {
        width: 100%;
        margin-bottom: 100vh;

        &.slide-in {
            opacity: 0;
            transform: translateY(3rem);
            animation: 1s cubic-bezier(0.4, 0, 0, 1) forwards fade-in;
        }
    }

    &__body {
        display: flex;
        padding: 0 100px;
    }

    &__design {
        margin-right: 60px;
        z-index: 1;
    }
}

* {
    margin: 0;
}

h1 {
    font: normal normal bold 22px/36px ZenKakuGothicNew;
    letter-spacing: 0.88px;
    color: #EEEEEE;
    margin-bottom: 30px;
}

h2 {
    font: normal normal bold 13px/26px ZenKakuGothicNew;
    letter-spacing: 0px;
    color: #EEEEEE;
    margin-bottom: 7px;
}

p {
    font: normal normal normal 13px/26px ZenKakuGothicNew;
    letter-spacing: 0px;
    color: #EEEEEE;
    margin-bottom: 24px;
}

hr {
    margin: 90px 0;
    background-color: #2c2c2c;
    height: 1px;
    border: none;
    margin-top: 6px;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>