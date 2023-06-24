<template>
    <WebsiteDetailView :text-img="textImg" :mock-img="mockImg" :captures="captures" :contents="contents" />
</template>

<script setup lang="ts">
const textImg = "/image/website/sugoyose_text_2c2c2c.svg"
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
    url: "https://sugoyose.jp/2022oshikatsu_campaign",
    period: "2022年 / 約7日",
    area: "デザイン",
    overview: "オンライン型寄せ書きサービス「スゴヨセ」の若年層顧客開拓のため",
    design: "世間での「推し活」のイメージや他社の事例を参考に、デザインを展開。初見のユーザーをターゲットにしているため、スゴヨセの紹介も含めて、主要なコンテンツ(YouTubeの動画紹介・推しカラーのブックデザイン・クーポン)を見やすく配置した。",
    awards: []
}
</script>
