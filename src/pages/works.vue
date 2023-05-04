<script setup>
import anime from "animejs";
import { GlobalFn } from "~/js/Global.js";
import { options, init_threeBG, ThreeBGAllDispose } from "~/js/three_bg.js";
useHead({
  title: "Works | LH.WA Studio",
});
const PageInfo = ref({
  text_a: "We deliver amazing experiences through innovative design",
});
// page js
// inject
let alp = inject("AlpScroll");
let AppState = inject("State");
let globalApp = {};
function IndexPreset() {
  new GlobalFn().SplitText(".split_W_words", "div", " ");
  new GlobalFn().SplitText(".split_W_words > div", "span", "");
}
function IndexLoad() {
  // Three BG
  options.position.x = 0;
  options.position.y = 1000;
  options.position2.x = 0;
  options.position2.y = -500;
  options.cam.z = 280;
  init_threeBG(".three-bg");
  // anime
  globalApp.anime_c = anime({
    targets:
      ".works-view-1 .about-h-t .s-title, .works-view-1 .about-h-t .split_W_words >div span",
    easing: "cubicBezier(0.55, 0.2, 0.25, 1)",
    translateY: ["100%", "0%"],
    opacity: [0, 1],
    duration: 1200,
    delay: anime.stagger(15, { start: 100 }),
    begin: function (anim) {
      globalApp.anime_b.play();
    },
  });
  globalApp.anime_b = anime({
    targets: ".works-view-1-list",
    easing: "easeOutSine",
    translateY: ["100px", "0px"],
    opacity: [0, 1],
    duration: 1000,
    delay: 1200,
    autoplay: false,
  });
  globalApp.anime_c = anime({
    targets: ".three-bg-wrapper3>div",
    easing: "cubicBezier(0.76, 0.13, 0.25, 1)",
    opacity: [0.1, 0.5],
    duration: 1500,
    delay: 200,
    begin: function (anim) {},
  });
}

onMounted(() => {
  IndexPreset();
  watchEffect(() => {
    if (AppState.value) {
      IndexLoad();
    }
  });
});
onUnmounted(() => {
  anime.remove("*");
  ThreeBGAllDispose();
  globalApp = {};
});
</script>

<template>
  <div class="inner-wrapper">
    <div
      class="three-bg-wrapper3 fixed left-0 right-0 top-0 bottom-0 overflow-hidden"
    >
      <div class="three-bg left-0 right-0 top-0 bottom-0 absolute"></div>
    </div>
    <div class="works-view relative z-10">
      <div class="works-view-1">
        <div class="works-view-1-innter global-inner glo-padding">
          <div class="about-h-t w-full">
            <div class="s-title">
              <div>|||<span>Latest Projects</span></div>
            </div>
            <h1 class="large-3 flex flex-wrap intro-text">
              <div class="flex w-full">
                <div class="split_W_words">
                  {{ PageInfo.text_a }}
                </div>
              </div>
            </h1>
          </div>
        </div>
        <div class="works-view-1-list global-inner">
          <ListOneC />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.split_W_words > :deep(div) {
  overflow: hidden;
  display: inline-flex;
}

.split_W_words > :deep(div span) {
  display: block;
}
.works-view-1-innter.glo-padding {
  padding-top: calc(var(--gap) * 2.75 + 25vh);
}
.about-h-t h1 {
  font-weight: 300;
  max-width: 1024px;
}
.about-intro {
  max-width: 1024px;
  margin-left: auto;
}
.intro-text {
  letter-spacing: -0.04em;
  margin-top: calc(var(--gap) * 0.5);
  margin-bottom: calc(var(--gap) * 0);
  line-height: 1.45;
}
.intro-text2 {
  letter-spacing: -0.04em;
  margin-top: calc(var(--gap) * 0.5);
  margin-bottom: calc(var(--gap) * 2);
  line-height: 1.45;
}

@media screen and (min-width: 1024px) {
}
</style>

<route lang="yaml">
  meta:
    layout: default
  </route>

