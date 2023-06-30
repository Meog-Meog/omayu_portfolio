<template>
    <WebsiteDetailView :text-img="textImg" :mock-img="mockImg" :captures="captures" :contents="contents" />
</template>

<script setup lang="ts">
const textImg = "/image/cap/07_matsushita/matsushita_text_2c2c2c.svg"
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
    period: "2020年 / 約10日間",
    area: "ワイヤーフレーム作成, デザインを担当",
    overview: "",
    design: [
        "病院のWebサイトを最も利用する顕在層のユーザーに合わせて、予約や問い合わせに必要な情報をファーストビューにまとめた。",
        "トップページを見ただけで、病院の規模や特徴が理解できるよう意識してデザインした。"
    ],
    awards: []
}
</script>
