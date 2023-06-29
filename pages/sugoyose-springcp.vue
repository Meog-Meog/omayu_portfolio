<template>
    <WebsiteDetailView :text-img="textImg" :mock-img="mockImg" :captures="captures" :contents="contents" />
</template>

<script setup lang="ts">
const textImg = "/image/cap/02_springcampaign/springcp_text_2c2c2c.svg"
const mockImg = "/image/mock/springcampaign_mock.webp"
const captures = [
    {
        label: "",
        cap: {
            pc: ["/image/cap/02_springcampaign/springcampaign_pc.png"],
            sp: ["/image/cap/02_springcampaign/springcampaign_sp.png"]
        }
    },
]
const contents = {
    title: "スゴヨセ 2023年春の卒業・送別支援キャンペーン",
    url: "https://sugoyose.jp/2023wakare_campaign",
    period: "2023年 / 約4日",
    area: "デザイン",
    overview: "オンライン型寄せ書きサービス「スゴヨセ」の繁忙期の収益拡大のため",
    design: "既に10万人以上の利用者がいたため、ある程度の認知度があったことから、「スゴヨセ」のトンマナにはあまり意識を向けず、「卒業・送別」に合わせたデザインを作成。",
    awards: []
}
</script>
