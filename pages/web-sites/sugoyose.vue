<template>
    <web-site-page :text-img="textImg" :text-img-dark="textImgDark" :mock-img="mockImg" :captures="captures"
        :contents="contents" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "v2",
})

const textImg = "/image/cap/01_sugoyose/sugoyose_text_101010.svg"
const textImgDark = "/image/cap/01_sugoyose/sugoyose_text_2c2c2c.svg"
const mockImg = "/image/mock/sugoyose_mock.webp"
const captures = [
    {
        label: "マイページ",
        cap: {
            pc: ["/image/cap/01_sugoyose/sugoyose_mypage_pc.png"],
            sp: ["/image/cap/01_sugoyose/sugoyose_mypage_sp.png"]
        }
    },
    {
        label: "配送説明",
        cap: {
            pc: ["/image/cap/01_sugoyose/sugoyose_delivery_pc.png"],
            sp: ["/image/cap/01_sugoyose/sugoyose_delivery_sp.png"]

        }
    },
    {
        label: "デザイン一覧",
        cap: {
            pc: [],
            sp: ["/image/cap/01_sugoyose/sugoyose_designlist01.png", "/image/cap/01_sugoyose/sugoyose_designlist02.png"]
        }
    },
    {
        label: "スゴヨセ編集トップ",
        cap: {
            pc: ["/image/cap/01_sugoyose/sugoyose_edit.png"],
            sp: []
        }
    },
]
const contents = {
    title: "スゴヨセ",
    titleLetterSpacihg: "1px",
    url: "https://sugoyose.jp/",
    period: "2021~2023年",
    area: "UIデザイン, 仕様提案などを担当",
    overview: "Web上で寄せ書きブックの作成・注文ができるサービスサイト",
    design: [
        "全ての画面において「無駄のない直感的なUI」を意識して設計。",
        "競合との差別化を図るため、ブックのビジュアルデザインにも力を入れた。"
    ],
    awards: [
        {
            name: "2022年度グッドデザイン賞 受賞",
            url: "https://www.g-mark.org/award/describe/54423"
        },
        {
            name: "Webデザインギャラリー・リンク集「SANKOU!」掲載",
            url: "https://sankoudesign.com/web/sugoyose/"
        }
    ]
}
</script>

<style lang="scss" scoped></style>
