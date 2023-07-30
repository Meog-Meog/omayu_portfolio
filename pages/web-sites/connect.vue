<template>
    <web-site-page :text-img="textImg" :text-img-dark="textImgDark" :mock-img="mockImg" :captures="captures"
        :contents="contents" :show-process="false" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "v2",
})

const textImg = "/image/cap/06_connect/connect_text_101010.svg"
const textImgDark = "/image/cap/06_connect/connect_text_2c2c2c.svg"
const mockImg = "/image/mock/connect_mock.webp"
const captures = [
    {
        label: "デザイン1",
        cap: {
            pc: ["/image/cap/06_connect/connect01.png"],
            sp: []
        }
    },
    {
        label: "デザイン2",
        cap: {
            pc: ["/image/cap/06_connect/connect02.png"],
            sp: []
        }
    }
]
const contents = {
    title: "CO.nnect",
    titleLetterSpacihg: "1px",
    url: "",
    period: "2019年 / 約1ヶ月間",
    area: "ワイヤーフレーム作成, デザインを担当",
    overview: "企業同士のマッチングサービスサイト",
    design: [
        "ファーストビューでブランドの信頼感を獲得するため、契約(したと想定)した企業のロゴを並べた構成にしました。",
        "クライアントの要望に応じて黒をメインカラーとして使用。暗い印象にならないようアクセントカラーを入れつつ、ビジネス向けのテイストにまとめました。"
    ],
    awards: []
}
</script>
