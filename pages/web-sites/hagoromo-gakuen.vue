<template>
    <web-site-page :text-img="textImg" :text-img-dark="textImgDark" :mock-img="mockImg" :captures="captures"
        :contents="contents" :show-process="false" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "v2",
})

const textImg = "/image/cap/04_hagoromo/hagoromo_text_101010.svg"
const textImgDark = "/image/cap/04_hagoromo/hagoromo_text_2c2c2c.svg"
const mockImg = "/image/mock/hagoromo_mock.webp"
const captures = [
    {
        label: "トップ",
        cap: {
            pc: ["/image/cap/04_hagoromo/hagoromo_top_pc.png"],
            sp: ["/image/cap/04_hagoromo/hagoromo_top_sp.png"]
        }
    },
    {
        label: "学校紹介",
        cap: {
            pc: ["/image/cap/04_hagoromo/hagoromo_curriculum.png"],
            sp: []
        }
    },
    {
        label: "コース紹介",
        cap: {
            pc: ["/image/cap/04_hagoromo/hagoromo_introduction.png"],
            sp: []
        }
    }
]
const contents = {
    title: "羽衣学園 中学校・高等学校",
    titleLetterSpacihg: "1px",
    url: "https://hagoromogakuen.ed.jp/",
    period: "2020年 / 約6ヶ月間",
    area: "ワイヤーフレーム作成, トップ・下層ページデザインを担当",
    overview: "",
    design: [
        "Webサイトの利用者である中高それぞれの受験生・在学生・卒業生・保護者が直感的な操作を行えるよう、ファーストビューのリンク整理を徹底しました。",
        "デザインテイストは、学園の教育制度で生まれた「国際社会で活躍できるひと」の品位や力強さをイメージしてまとめました。"
    ],
    awards: []
}
</script>
