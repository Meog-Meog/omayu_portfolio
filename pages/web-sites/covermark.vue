<template>
    <web-site-page :text-img="textImg" :text-img-dark="textImgDark" :mock-img="mockImg" :captures="captures"
        :contents="contents" :show-process="false" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "v2",
})

const textImg = "/image/cap/05_covermark/covermark_text_101010.svg"
const textImgDark = "/image/cap/05_covermark/covermark_text_2c2c2c.svg"
const mockImg = "/image/mock/covermark_mock.webp"
const captures = [
    {
        label: "",
        cap: {
            pc: ["/image/cap/05_covermark/covermark.png"],
            sp: []
        }
    }
]
const contents = {
    title: "COVERMARK FLAWLESS FIT",
    titleLetterSpacihg: "2px",
    url: "",
    period: "2019年 / 約10日間",
    area: "ワイヤーフレーム作成, デザインを担当",
    overview: "",
    design: [
        "提案用資料を元に構成を組み、商品に対する信頼感や品位を想起させるようなテイストにまとめました。",
        "フォントウェイトを細めに調整することで軽やかな印象を与え、商品の特徴である「厚塗り感のない仕上がり」を表現しました。"
    ],
    awards: []
}
</script>
