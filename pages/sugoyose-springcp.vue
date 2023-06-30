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
    title: "スゴヨセ 2023年春の卒業・送別キャンペーン",
    url: "https://sugoyose.jp/2023wakare_campaign",
    period: "2023年 / 約4日間",
    area: "デザインを担当",
    overview: "",
    design: [
        "「スゴヨセ」の利用者数が10万人を超えており、ある程度認知されていたことから、「スゴヨセ」のトンマナよりも卒業や送別のイメージに合わせたデザインを作成。",
    ],
    awards: []
}
</script>
