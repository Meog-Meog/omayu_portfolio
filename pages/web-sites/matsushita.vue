<template>
    <web-site-page :text-img="textImg" :text-img-dark="textImgDark" :mock-img="mockImg" :captures="captures"
        :contents="contents" :show-process="false" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "v2",
})

const textImg = "/image/cap/07_matsushita/matsushita_text_101010.svg"
const textImgDark = "/image/cap/07_matsushita/matsushita_text_2c2c2c.svg"
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
    titleLetterSpacihg: "1px",
    url: "",
    period: "2020年 / 約10日間",
    area: "ワイヤーフレーム作成, デザインを担当",
    overview: "",
    design: [
        "病院のWebサイトを最も利用する顕在層のユーザーに合わせて、予約や問い合わせに必要な情報をファーストビューにまとめました。",
        "トップページを見ただけで、病院の規模や特徴が理解できるよう意識してデザインしました。"
    ],
    awards: []
}
</script>
