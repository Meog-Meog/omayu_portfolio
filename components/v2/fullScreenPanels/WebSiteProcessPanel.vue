<template>
  <div class="bg">
    <div id="wsp-container" class="container">
      <div
        style="width: fit-content; display: flex; flex: 1; flex-direction: column; justify-content: space-between; height: 437px; margin-right: 100px;">
        <div id="wsp-title">
          <img src="~/assets/image/process.svg?url" alt="Process" />
        </div>
        <div style="z-index: 100;">
          <div id="wsp-contents" style="position: relative;">
            <div v-if="contentIdx === 0">
              <div style="margin-bottom: 45px;">
                <h5 style="margin-bottom: 25px;">
                  チーム構成・役割
                </h5>
                <p>
                  私たちのチームは、ディレクター1名、アートディレクター1名、デザイナー2名、エンジニア4名で構成されていました。デザイナーは各自が異なる案件を担当して業務を進行します。<br>
                  デザインルールの決定においては、アートディレクターとデザイナーが主導し、協議を通じて行います。
                </p>
              </div>
            </div>
            <div v-if="contentIdx === 1">
              <div>
                <h5 style="margin-bottom: 25px;">
                  デザイン作成から共有まで
                </h5>
                <p>
                  ワイヤーフレームが与えられた場合は、その通りのデザインと提案要素を含む2つの案を作成。なければ、設計からデザインまでを行い、各案に対してデザイン案を準備します。<br>
                  アートディレクターの確認を経て全体に共有し、その際はプロトタイプを用いて動きを示しながら説明します。
                </p>
              </div>
              <hr style="margin: 28px 0 25px 0" />
              <div style="margin-bottom: 45px;">
                <p style="display: flex; align-self: center;">
                  スゴヨセ全体のプロトタイプ
                  <button class="icon-btn"
                    @click="externalLink('https://xd.adobe.com/view/82222005-0011-4021-a4df-4c9238396f71-d771/')"
                    style="margin-left: 25px; display: flex; align-self: center;">
                    <img src="~/assets/image/icon/icon_desktop_eee.svg?url" />
                  </button>
                  <button class="icon-btn"
                    @click="externalLink('https://xd.adobe.com/view/65d783b7-b18a-4d3b-9521-2478c361bb7b-3084/')"
                    style="margin-left: 30px; display: flex; align-self: center;">
                    <img src="~/assets/image/icon/icon_phone_eee.svg?url" />
                  </button>
                </p>
              </div>
            </div>
            <div v-if="contentIdx === 2">
              <div style="margin-bottom: 45px;">
                <h5 style="margin-bottom: 25px;">
                  デザイン修正から公開まで
                </h5>
                <p>
                  ディレクターやエンジニアからのフィードバックを元に懸念や修正点を解消し、デザインを更新。<br>
                  チーム全体の承認が得られたら、実装用の仕様書を作成し共有。複雑な仕様では、オンライン通話を通じて何度も説明します。<br>
                  実装後はデバッグを行い、業務を完了します。
                </p>
              </div>
            </div>
          </div>
          <div class="number-container">
            <div>0{{ idx + 1 }}</div>
            <div class="number-separator" />
            <div>03</div>
          </div>
        </div>
      </div>
      <div id="wsp-images-wrapper">
        <div v-show="idx > 0" id="wsp-images-back" class="clickable-back" @click="back" />
        <div v-show="idx < 3" id="wsp-images-next" class="clickable-next" @click="next" />
        <ul id="wsp-images">
          <li style="display: flex; align-self: center;">
            <img src="~/assets/image/process/process_01.webp" />
          </li>
          <li>
            <img src="~/assets/image/process/process_02.webp" />
          </li>
          <li>
            <img src="~/assets/image/process/process_03.webp" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const idx = ref(0)
const contentIdx = ref(0)

const mouseStalkerText = useState('mouseStalkerText')
const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp();

function setEventListener()
{
  for (const clickable of document.getElementsByClassName('clickable-back'))
  {
    clickable.addEventListener('mouseover', () =>
    {
      mouseStalkerText.value = 'Back'
    }, false)
    clickable.addEventListener('mouseout', () =>
    {
      mouseStalkerText.value = ''
    }, false)
  }
  for (const clickable of document.getElementsByClassName('clickable-next'))
  {
    clickable.addEventListener('mouseover', () =>
    {
      mouseStalkerText.value = 'Next'
    }, false)
    clickable.addEventListener('mouseout', () =>
    {
      mouseStalkerText.value = ''
    }, false)
  }
}

function externalLink(url)
{
  window.open(url, '_blank')
}

onMounted(() =>
{
  if (process.client)
  {
    setEventListener();
  }
})

let animating = false
const imageWidth = 583
const gap = 50
const xDelta = imageWidth + gap
function back()
{
  if (!animating && idx.value > 0)
  {
    animating = true
    $gsap.timeline()
      .fromTo("#wsp-images", { x: -xDelta * idx.value }, { x: -xDelta * (idx.value - 1), duration: 0.5, ease: "power3" })
      .fromTo(`#wsp-images > li:nth-of-type(${idx.value})`, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power3" }, "<")
      .fromTo(`#wsp-contents`, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 0, duration: 0.5, ease: "power3" }, "<")
      .add(() => contentIdx.value--)
      .add(() => idx.value--)
      .add(() => animating = false)
      .fromTo(`#wsp-contents`, { autoAlpha: 0, y: 0 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3" })
  }
}

function next()
{
  if (!animating && idx.value < 2)
  {
    animating = true
    $gsap.timeline()
      .fromTo("#wsp-images", { x: -xDelta * idx.value }, { x: -xDelta * (idx.value + 1), duration: 0.5, ease: "power3" })
      .fromTo(`#wsp-images > li:nth-of-type(${idx.value + 1})`, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.5, ease: "power3" }, "<")
      .fromTo(`#wsp-contents`, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, duration: 0.5, y: 0, ease: "power3" }, "<")
      .add(() => contentIdx.value++)
      .add(() => idx.value++)
      .add(() => animating = false)
      .fromTo(`#wsp-contents`, { autoAlpha: 0, y: 0 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3" })
  }
}

</script>

<style lang="scss" scoped>
#wsp-container {
  opacity: 0;
  visibility: hidden;
}

#wsp-images-back {
  position: absolute;
  left: -10%;
  height: 437px;
  width: 50%;
  z-index: 100;
}

#wsp-images-next {
  position: absolute;
  right: -10%;
  height: 437px;
  width: 50%;
  z-index: 100;
}

h5 {
  font: bold normal normal 13px/28px ZenKakuGothicNew;
  @include xd-line-spacing(13px, 28px, 4px, 3px);
  letter-spacing: 0px;
}

p {
  font: normal normal normal 13px/28px ZenKakuGothicNew;
  @include xd-line-spacing(13px, 28px, 4px, 3px);
  letter-spacing: 0px;
}

.bg {
  background-image: url('~/assets/image/bg02.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.container {
  height: 100vh;
  padding: 0 0 0 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #EEEEEE;
}

.wrapper {
  width: 100%;
}

#wsp-title {
  margin-bottom: 35px;
  margin-right: 78px;
}

#wsp-images-wrapper {
  position: relative;
  width: 683px;
  // height: calc((100vw - 300px)/2 * 640 / 1066);
  height: 437px;
}

#wsp-images {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  gap: 0 50px;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    justify-content: center;

    /*
    &:first-of-type {
      margin-left: 150px;
    }

    &:last-of-type {
       margin-right: 170px;
    }
    */

    img {
      width: 583px;
      // width: calc((100vw - 300px)/2);
    }
  }
}

.number-container {
  display: flex;
  align-items: center;
  font: normal normal 300 14px/14px Roboto;
  letter-spacing: 0.8px;
  opacity: 1;
  margin-left: auto;

  div:nth-of-type(1) {
    color: #ccc;
  }

  div:nth-of-type(3) {
    color: #ccc;
  }
}

.number-separator {
  width: 0.5px;
  height: 10px;
  background: #ccc 0% 0% no-repeat padding-box;
  margin: 0 15px;
}

hr {
  background-color: #2c2c2c;
  height: 1px;
  border: none;
  margin: 30px 0;
}
</style>