<script setup>
import anime from "animejs";
import { options, init_threeBG, ThreeBGAllDispose } from "~/js/three_bg.js";
useHead({
  title: "About | LH.WA Studio",
});
// page js
// inject
let alp = inject("AlpScroll");
let AppState = inject("State");
let globalApp = {};
function IndexPreset() {}
function IndexLoad() {
  // Three BG
  options.position.x = 0;
  options.position.y = 1000;
  options.position2.x = 0;
  options.position2.y = -500;
  options.cam.z = 280;
  init_threeBG(".three-bg");
  // anime
  globalApp.anime_a = anime({
    targets: ".about-view-1 .anm_text ",
    easing: "cubicBezier(0.55, 0.2, 0.25, 1)",
    translateY: ["100%", "0%"],
    duration: 1200,
    delay: anime.stagger(180, { start: 100 }),
    begin: function (anim) {},
  });
  globalApp.anime_b = anime({
    targets: ".three-bg-wrapper2>div",
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
      class="three-bg-wrapper2 fixed left-0 right-0 top-0 bottom-0 overflow-hidden"
    >
      <div class="three-bg left-0 right-0 top-0 bottom-0 absolute"></div>
    </div>
    <div class="about-view relative z-10">
      <div class="about-view-1">
        <div
          class="about-view-1-innter global-inner glo-padding full-height flex items-end justify-center"
        >
          <div class="about-h-t w-full">
            <h1 class="large-2 flex flex-wrap">
              <div class="flex w-full overflow-hidden">
                <div class="anm_text">Creative</div>
              </div>
              <div class="flex w-full justify-end overflow-hidden">
                <div class="anm_text">
                  UI <span class="large-ss">/</span> Web Design
                </div>
              </div>
              <div class="flex w-full overflow-hidden">
                <div class="anm_text">
                  <span class="large-ss">&</span> Development
                </div>
              </div>
            </h1>
          </div>
        </div>
      </div>
      <div class="about-view-2">
        <div class="about-view-2-innter global-inner glo-padding">
          <div class="">
            <div class="large-4 intro-text font-light about-intro">
              We Push the design to the forefront and explore more
              possibilities. Focus on digital development for brand clients. We
              are dedicated to creating highly personalized and user-friendly
              digital products for clients to achieve their digital
              transformation.
            </div>
          </div>
        </div>
      </div>
      <div class="about-view-3">
        <div class="about-view-2-innter global-inner glo-padding">
          <div class="about-view-2-innter-i">
            <div>
              <div class="s-title">
                <div>+<span>Expertise</span></div>
              </div>
              <div class="large-5 intro-text2 max-w-screen-md">
                We are able to provide customers with professional services at
                every stage of the project, from conceptual design to
                development, testing and deployment, to escort customers'
                digital development
              </div>
            </div>
            <div>
              <ListTwo />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-h-t h1 {
  font-weight: 300;
  max-width: 1280px;
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
.about-view-2-innter-i {
  max-width: 1280px;
  margin: auto;
}
@media screen and (min-width: 1024px) {
  .about-intro {
    width: 66.666%;
  }
  .about-view-2-innter.global-inner.glo-padding {
    padding-bottom: calc(var(--gap) * 1);
  }
}
</style>

<route lang="yaml">
  meta:
    layout: default
  </route>

