<template>
    <WebsiteDetailView :text-img="textImg" :mock-img="mockImg" :captures="captures" :contents="contents" />
</template>

<script setup lang="ts">
const textImg = "/image/cap/05_covermark/covermark_text_2c2c2c.svg"
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
    url: "",
    period: "2019年 / 約10日",
    area: "デザイン",
    overview: "新規顧客のCV率向上のため",
    design: "悩み解決型の構成に合わせて、商品の信頼感や品位を想起させるようなテイストにまとめた。また、フォントのウェイトは細めに調整することで、軽やかな印象を与え、商品の特徴である「厚塗り感のない仕上がり」を表現した。",
    awards: []
}
</script>
