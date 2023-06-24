<template>
    <WebsiteDetailView :text-img="textImg" :mock-img="mockImg" :captures="captures" :contents="contents" />
</template>

<script setup lang="ts">
const textImg = "/image/website/sugoyose_text_2c2c2c.svg"
const mockImg = "/image/mock/mastushita_mock.webp"
const captures = [
    {
        label: "",
        cap: {
            pc: ["/image/cap/07_matsushita/matsushitahospital_pc.png"],
            sp: ["/image/cap/07_matsushita/matsushitahospital_sp.png"]
        }
    }
]
const contents = {
    title: "松下記念病院",
    url: "",
    period: "2020年 / 約10日",
    area: "ワイヤーフレーム作成, デザイン",
    overview: "検索システムなど新規機能の追加のため",
    design: "この病院をある程度知っているユーザーが利用することが多いというデータから、予約や問い合わせに必要な電話番号や診察時間をファーストビューにまとめた。それ以下のエリアには、医療関係者に向けたコンテンツを配置。また、初見のユーザーであっても検索機能を利用すれば、病院の規模や特徴が理解できる構成を意識した。",
    awards: []
}
</script>
