<template>
    <web-site-page :text-img="textImg" :text-img-dark="textImgDark" :mock-img="mockImg" :captures="captures"
        :contents="contents" :show-process="false" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "v2",
})

const textImg = "/image/cap/03_oshikaatsu/oshikatsu_text_101010.svg"
const textImgDark = "/image/cap/03_oshikaatsu/oshikatsu_text_2c2c2c.svg"
const mockImg = "/image/mock/oshikatsu_mock.webp"
const captures = [
    {
        label: "",
        cap: {
            pc: ["/image/cap/03_oshikaatsu/oshikatsu_pc.png"],
            sp: ["/image/cap/03_oshikaatsu/oshikatsu_sp.png"]
        }
    },
]
const contents = {
    title: "スゴヨセ 推し活応援キャンペーン",
    titleLetterSpacihg: "1px",
    url: "https://sugoyose.jp/2022oshikatsu_campaign",
    period: "2022年 / 約7日間",
    area: "デザインを担当",
    overview: "",
    design: [
        "世間での推し活のイメージや、他社の事例を参考にデザインを展開。",
        "ターゲットである顕在顧客に合わせて、興味を引くようなコンテンツを大きく掲載するなどしてまとめました。"
    ],
    awards: []
}
</script>
