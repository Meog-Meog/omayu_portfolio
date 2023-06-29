<template>
    <WebsiteDetailView :text-img="textImg" :mock-img="mockImg" :captures="captures" :contents="contents" />
</template>

<script setup lang="ts">
const textImg = "/image/cap/04_hagoromo/hagoromo_text_2c2c2c.svg"
const mockImg = "/image/mock/hagoromo_mock.webp"
const captures = [
    {
        label: "トップ",
        cap: {
            pc: ["/image/cap/04_hagoromo/hagoromo_top_pc.png"],
            sp: ["/image/cap/04_hagoromo/hagoromo_top_sp.png"]
        }
    },
    {
        label: "学校紹介",
        cap: {
            pc: ["/image/cap/04_hagoromo/hagoromo_curriculum.png"],
            sp: []
        }
    },
    {
        label: "コース紹介",
        cap: {
            pc: ["/image/cap/04_hagoromo/hagoromo_introduction.png"],
            sp: []
        }
    }
]
const contents = {
    title: "羽衣学園 中学校・高等学校",
    url: "https://hagoromogakuen.ed.jp/",
    period: "2020年 / 約6ヶ月",
    area: "ワイヤーフレーム作成, デザイン (トップ, 下層18ページ)",
    overview: "資料請求やオープンキャンパスへの参加などCV率向上のため 個人情報管理やブログ更新などの手作業の効率化のため",
    design: "カリキュラムや大学進学サポートなどの強みをしっかり見せつつ、受験生・在学生・卒業生・保護者それぞれのサイト利用目的に合わせて、リンクを配置。また、中高合同サイトであるため、カラーを使って導線を分け、直感的なUIを心がけた。",
    awards: []
}
</script>
