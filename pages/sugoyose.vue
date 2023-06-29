<template>
    <WebsiteDetailView :text-img="textImg" :mock-img="mockImg" :captures="captures" :contents="contents" />
</template>

<script setup lang="ts">
const textImg = "/image/cap/01_sugoyose/sugoyose_text_2c2c2c.svg"
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
    url: "https://sugoyose.jp/",
    period: "2021~2023年",
    area: "UIデザイン(ほぼ全ての下層ページ), 仕様提案など",
    overview: "オンライン上で寄せ書きブックの作成・注文ができる",
    design: "全ての画面において「無駄のない直感的なUI」を意識して設計。\n また、競合との差別化を図るため、ブックのビジュアルデザインにも力を入れている。",
    awards: [
        {
            name: "2022年度グッドデザイン賞 受賞",
            url: "https://www.g-mark.org/award/describe/52580?token=8Z3X6Q1Q"
        },
        {
            name: "Webデザインギャラリー・リンク集「SANKOU!」掲載",
            url: "https://sankoudesign.com/web/sugoyose/"
        }
    ]
}
</script>
