<template>
    <WebsiteDetailView :text-img="textImg" :mock-img="mockImg" :captures="captures" :contents="contents" />
</template>

<script setup lang="ts">
const textImg = "/image/website/sugoyose_text_2c2c2c.svg"
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
    url: "",
    period: "2019年 / 約1ヶ月",
    area: "ワイヤーフレーム作成, デザイン",
    overview: "企業同士のマッチング 企業への登録を促す営業活動のため サービスリリース前に登録企業を増やすため",
    design: "まだ実績がないため、登録企業(仮)のロゴやサービス内容をファーストビュー直下に配置し、ブランドの信頼性を獲得することに努めた。また、カラーはクライアントの要望に応じて黒をメインに使用し、ビジネス向けのテイストで統一した。",
    awards: []
}
</script>
