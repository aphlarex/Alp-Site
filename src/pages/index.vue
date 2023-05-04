<script setup>
import $ from "jquery";
import anime from "animejs";
import gsap from "gsap";
import { options, init_threeBG, ThreeBGAllDispose } from "~/js/three_bg.js";
import { GlobalFn } from "~/js/Global.js";
const router = useRouter();
// ref
const HomeInfo = ref({
  text_a: [`Into`, `Reality`],
  text_b: [`Design`, `&`, `Development`],
  text_c: [`Digital`, `Creative`, `Design`, `&`, `Web`, `Development`],
  text_d: [
    `We are a design and web development studio focus on digital development for brand clients. We are dedicated to creating highly personalized and user-friendly digital products for clients to achieve their digital transformation.`,
  ],
  text_6: `We are committed to making the interaction between brands and users more convenient, efficient and enjoyable`,
});
// page js
// inject
let alp = inject("AlpScroll");
let AppState = inject("State");
// page var
let globalApp = {};

function IndexPreset() {
  new GlobalFn().SplitText(".split_text", "span", "");
  new GlobalFn().SplitText(".h-tt-2 h2", "span", "");
  new GlobalFn().SplitText(".split_words", "span", " ");
  new GlobalFn().SplitText(".h-tt-2 h3", "span", " ");
  new GlobalFn().SplitText(".split_W_words", "div", " ");
  new GlobalFn().SplitText(".split_W_words > div", "span", "");
}

function IndexLoad() {
  alp.lenis.scrollTo(0, {
    duration: 0,
    onComplete: function () {
      alp.lenis.stop();
      document.querySelector("html").classList.add("PageInit");
      initPage();
      setTimeout(() => {
        document.querySelector(".point-e-none").classList.add("init");
      }, 800);
    },
  });
  var can_scroll = false;
  function start_scroll() {
    alp.lenis.start();
    document.querySelector(".point-e-none").classList.add("init");
  }

  // Three BG
  init_threeBG(".three-bg");

  // Scroll Function
  // Scroll Animation Function
  // Only In Desktop
  if (window.innerWidth > 768) {
    // scroll animation pre init
    // home-view-1
    globalApp.anime_sc1 = anime({
      targets: ".home-view-1 .h-tt-1 svg path",
      strokeDashoffset: [0, anime.setDashoffset],
      opacity: [1, 0],
      easing: "easeInOutSine",
      duration: 500,
      delay: anime.stagger(100, { from: "first" }),
      autoplay: false,
    });
    globalApp.anime_sc2 = anime({
      targets: ".home-view-1 .h-tt-2 span ",
      easing: "easeInOutSine",
      opacity: [1, 0],
      duration: 500,
      delay: anime.stagger(100, { from: "last" }),
      autoplay: false,
    });
    globalApp.anime_sc3 = anime({
      targets: ".ltss-title > div >*",
      easing: "easeInOutSine",
      translateY: ["0%", "-100%"],
      opacity: [1, 0],
      duration: 1000,
      delay: function (el, i) {
        return i * 250;
      },
      autoplay: false,
    });
    // home-view-2
    globalApp.anime_sc4 = anime({
      targets:
        ".home-view-2 .aNsc4-a .split_text span , .home-view-2 .aNsc4-a span.large-ss",
      easing: "easeInOutSine",
      translateY: ["100px", "0px"],
      rotate: ["5deg", "0deg"],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(150, { from: "first" }),
      autoplay: false,
    });
    globalApp.anime_sc5 = anime({
      targets:
        ".home-view-2 .aNsc4-b .split_text span , .home-view-2 .aNsc4-b span.large-ss",
      easing: "easeInOutSine",
      translateY: ["100px", "0px"],
      rotate: ["-5deg", "0deg"],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(150, { from: "last" }),
      autoplay: false,
    });
    globalApp.anime_sc6 = anime({
      targets:
        ".home-view-2 .aNsc4-c .split_text span , .home-view-2 .aNsc4-c span.large-ss",
      easing: "easeInOutSine",
      translateY: ["100px", "0px"],
      rotate: ["5deg", "0deg"],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(150, { from: "first" }),
      autoplay: false,
    });
    globalApp.anime_sc7 = anime({
      targets: ".home-view-2 .h-view-2-text",
      easing: "easeInOutSine",
      translateY: ["120px", "0px"],
      duration: 1000,
      delay: 0,
      autoplay: false,
    });
    // home-view-3
    globalApp.anime_sc8 = anime({
      targets:
        ".home-view-3 .home-view-3-inner .s-title, .home-view-3 .home-view-3-inner .intro-text span",
      easing: "easeInOutSine",
      translateY: ["60%", "0%"],
      rotate: ["5deg", "0deg"],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(60, { from: "first" }),
      autoplay: false,
    });
    // home-view-6-inner
    globalApp.anime_sc9 = anime({
      targets: ".home-view-6-inner .b-text-2a span",
      easing: "easeInOutSine",
      opacity: [0.15, 1],
      duration: 800,
      delay: anime.stagger(60, { from: "first" }),
      autoplay: false,
    });
    // Scroll-tip
    globalApp.anime_scrollTip = anime({
      targets: ".scroll-tip .scroll-tip-round",
      easing: "easeInOutSine",
      translateY: ["0px", "-200px"],
      rotateX: ["0deg", "90deg"],
      opacity: [1, 0],
      duration: 800,
      autoplay: false,
    });
    globalApp.anime_scrollTip2 = anime({
      targets: ".scroll-tip .scroll-tip-arrow",
      easing: "easeInOutSine",
      translateY: ["0px", "-280px"],
      opacity: [1, 0],
      duration: 800,
      autoplay: false,
    });
  }
  // threeBG animation
  globalApp.anime_scThree1 = anime({
    targets: options.rotate3,
    y: [0, 180],
    easing: "linear",
    duration: 3000,
    delay: 0,
    autoplay: false,
  });
  globalApp.anime_scThree1a = anime({
    targets: options.rotate3,
    x: [0, -180],
    easing: "linear",
    duration: 3000,
    delay: 0,
    autoplay: false,
  });
  globalApp.anime_scThree1b = anime({
    targets: options.rotate3,
    z: [0, 360],
    easing: "linear",
    duration: 3000,
    delay: 0,
    autoplay: false,
  });
  globalApp.anime_scThree2 = anime({
    targets: options.perlin,
    waves: [20, 0],
    easing: "linear",
    duration: 3000,
    delay: 0,
    autoplay: false,
  });
  globalApp.anime_scThree2a = anime({
    targets: options.blur,
    h: [0, 1],
    easing: "linear",
    duration: 3000,
    delay: 0,
    autoplay: false,
  });

  // AFTER LOAD Function

  function initPage() {
    setTimeout(function () {
      globalApp.anime_a.play();
    }, 400);
  }

  globalApp.anime_a = anime({
    targets: ".h-tt-1 svg path",
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutSine",
    duration: 1200,
    delay: function (el, i) {
      return i * 50;
    },
    autoplay: false,
    begin: function (anim) {
      globalApp.anime_f1.play();
    },
    complete: function (anim) {
      globalApp.anime_b.play();
      globalApp.anime_c.play();
      globalApp.anime_d.play();
    },
  });

  globalApp.anime_f1 = anime({
    targets: ".three-bg-wrapper",
    easing: "easeInOutSine",
    opacity: [0, 1],
    duration: 1850,
    autoplay: false,
  });

  globalApp.anime_b = anime({
    targets: ".home-view-1 .s-title > div , .home-view-1 .h-tt-2 span ",
    easing: "cubicBezier(0.55, 0.2, 0.25, 1)",
    translateY: ["100%", "0%"],
    duration: 1200,
    delay: anime.stagger(80, { from: "first" }),
    autoplay: false,
    begin: function (anim) {
      globalApp.anime_b1.play();
    },
  });
  globalApp.anime_b1 = anime({
    targets: ".ltss-title > div >*",
    easing: "easeInOutSine",
    translateY: ["100%", "0%"],
    opacity: [0, 1],
    duration: 1200,
    delay: function (el, i) {
      return i * 250;
    },
    autoplay: false,
  });

  let $height_c = document.querySelector(".h-tt-2").offsetHeight;
  globalApp.anime_c = anime({
    targets: ".h-view-1-text > div ",
    easing: "cubicBezier(0.76, 0.13, 0.25, 1)",
    translateY: [$height_c, 0],
    duration: 1200,
    autoplay: false,
  });

  globalApp.anime_d = anime({
    targets: ".three-bg-wrapper>div",
    easing: "cubicBezier(0.76, 0.13, 0.25, 1)",
    opacity: [0.3, 0.6],
    duration: 1500,
    autoplay: false,
    begin: function (anim) {
      globalApp.anime_g.play();
      globalApp.anime_h.play();
      globalApp.anime_i.play();
    },
    complete: function (anim) {
      can_scroll = true;
      start_scroll();
    },
  });
  globalApp.anime_g = anime({
    targets: options.position,
    x: [0, 50],
    y: [0, -80],
    easing: "cubicBezier(0.55, 0.2, 0.25, 1)",
    duration: 3000,
    delay: 0,
    autoplay: false,
  });
  globalApp.anime_h = anime({
    targets: options.position2,
    x: [0, -100],
    y: [0, 90],
    easing: "cubicBezier(0.55, 0.2, 0.25, 1)",
    duration: 3000,
    delay: 0,
    autoplay: false,
  });
  globalApp.anime_i = anime({
    targets: options.cam,
    z: [220, 300],
    easing: "cubicBezier(0.55, 0.2, 0.25, 1)",
    duration: 3000,
    delay: 0,
    autoplay: false,
  });

  // alp监听
  alp.parallax(".parallax-el", 1, 0.05, 0.05);
  alp.parallax(".parallax-el2", 0, 0.05, 0.05);
  alp.parallax(".list-one-wrap-b", 0, 0.08, 0.08);
  alp.mouse(".mouse-point", 0, 0.02, 0.02, 1);
  alp.sticky(".sticky-el", 1, 0.05, 0.05, ".sticky-el-wrapper");
  alp.reach(".reach_el", 0, 0);

  //
  globalApp.raf = "";
  function runAnimation() {
    globalApp.raf = requestAnimationFrame(runAnimation);
    rafAnimation();
  }

  function rafAnimation() {
    if (window.innerWidth < 768) {
      return;
    }
    $(".three-bg-wrapper.mouse-point").each(function () {
      let $this = $(this);
      options.cam.x = $this.attr("data-mxx") * 0.02;
      options.cam.y = $this.attr("data-myy") * 0.02;
    });
    $(".home-view-1.sticky-element").each(function () {
      let $this = $(this);
      let $Progress = $this.attr("data-st_pgm");
      $this
        .find(".h-tt-1")
        .css(
          "transform",
          `translate3d(${$Progress * 50}px, ${$Progress * -100}px, 0px)`
        );
      $this
        .find(".h-tt-2")
        .css(
          "transform",
          `translate3d(${$Progress * -50}px, ${$Progress * -80}px, 0px)`
        );
      $this
        .find(".ltss-title")
        .css("transform", `translate3d(0px, ${$Progress * -60}px, 0px)`);
    });
    if (!can_scroll) {
      return;
    }

    $(".home-view-1.sticky-element").each(function () {
      let $this = $(this);
      let $Progress = $this.attr("data-st_pgm");
      globalApp.anime_sc1.seek(globalApp.anime_sc1.duration * $Progress);
      globalApp.anime_sc2.seek(globalApp.anime_sc2.duration * $Progress);
      globalApp.anime_sc3.seek(globalApp.anime_sc3.duration * $Progress);
    });
    $(".home-view-2.sticky-element").each(function () {
      let $this = $(this);
      // preProgress
      let $preProgress = $this.attr("data-pre_progress");
      globalApp.anime_scrollTip.seek(
        globalApp.anime_scrollTip.duration * $preProgress
      );
      globalApp.anime_scrollTip2.seek(
        globalApp.anime_scrollTip2.duration * $preProgress
      );
      // inProgress
      let $Progress = $this.attr("data-st_pgm");
      globalApp.anime_sc4.seek(globalApp.anime_sc4.duration * ($Progress * 3));
      globalApp.anime_sc5.seek(
        globalApp.anime_sc5.duration * ($Progress * 3 - 0.85)
      );
      globalApp.anime_sc6.seek(
        globalApp.anime_sc6.duration * ($Progress * 3 - 1.9)
      );
      globalApp.anime_sc7.seek(globalApp.anime_sc7.duration * $Progress);
    });
    $(".home-view-3-inner.parallax-el").each(function () {
      let $this = $(this);
      // Progress
      let $Progress = $this.attr("data-pl_pg_ym");
      globalApp.anime_sc8.seek(
        globalApp.anime_sc8.duration * $Progress * 1 + 0.3
      );
    });

    $(".home-view-6-inner.parallax-el2").each(function () {
      let $this = $(this);
      // Progress
      let $Progress = $this.attr("data-pl_pg_ym");
      globalApp.anime_sc9.seek(
        globalApp.anime_sc9.duration * $Progress * 0.65 + 0.4
      );
    });

    $(".view-cc-alo.parallax-el2").each(function () {
      let $this = $(this);
      $this.css(
        "transform",
        `translate3d(0px, ${$this.attr("data-pl_y") * 0.2}px, 0px)`
      );
    });

    $(".list-one-wrap-b").each(function () {
      let $this = $(this);
      $this
        .find(".list-one-b-item:nth-child(even)")
        .css(
          "transform",
          `translate3d(0px, ${$this.attr("data-pl_y") * 0.2}px, 0px)`
        );
      $this
        .find(
          ".list-one-b-item:nth-child(even) .Full-link .button-bg-cri2 > div"
        )
        .css(
          "transform",
          `translate3d(0px, ${$this.attr("data-pl_y") * -0.2}px, 0px)`
        );
    });

    // anime_scThree1 anime_scThree2
    $(".rec1.reach_el").each(function () {
      let $this = $(this);
      let $top = parseFloat($this.attr("data-of_top")) - window.innerHeight;
      let $Progress = (alp.data.scroll_y - $top) / $top + 1;
      // console.log($Progress);
      globalApp.anime_scThree1.seek(
        globalApp.anime_scThree1.duration * $Progress
      );
      globalApp.anime_scThree2.seek(
        globalApp.anime_scThree2.duration * $Progress
      );
    });

    // anime_scThree1a
    $(".home-view-4.reach_el").each(function () {
      let $this = $(this);
      let $pre_top =
        parseFloat($(".rec1.reach_el").attr("data-of_top")) -
        window.innerHeight;
      let $top = parseFloat($this.attr("data-of_top")) - $pre_top;
      let $Progress = (alp.data.scroll_y - $pre_top - $top) / $top + 1;
      // console.log($Progress);
      globalApp.anime_scThree1a.seek(
        globalApp.anime_scThree1.duration * $Progress
      );
    });

    // anime_scThree1b
    $(".rec2.reach_el").each(function () {
      let $this = $(this);
      let $top = parseFloat($this.attr("data-of_top"));
      let $Progress = (alp.data.scroll_y - $top) / $top + 1;
      globalApp.anime_scThree1b.seek(
        globalApp.anime_scThree1.duration * $Progress
      );
    });

    // anime_scThree2a
    $(".home-view-6.reach_el").each(function () {
      let $this = $(this);
      let $pre_top = parseFloat($this.attr("data-of_top"));
      let $top = parseFloat($(".rec2.reach_el").attr("data-of_top")) - $pre_top;
      let $Progress = (alp.data.scroll_y - $pre_top - $top) / $top + 1;
      // console.log($Progress);
      globalApp.anime_scThree2a.seek(
        globalApp.anime_scThree2.duration * $Progress
      );
    });
  }
  runAnimation();
}

onMounted(() => {
  IndexPreset();
  watchEffect(() => {
    if (AppState.value) {
      IndexLoad();
    }
  });
});
// onUnmounted
onUnmounted(() => {
  anime.remove("*");
  anime.remove(options.position);
  anime.remove(options.position2);
  anime.remove(options.cam);
  cancelAnimationFrame(globalApp.raf);
  ThreeBGAllDispose();
  globalApp = {};
});
</script>

<template>
  <ScrollTipsA />
  <div class="home-view">
    <div
      class="three-bg-wrapper fixed left-0 right-0 top-0 bottom-0 overflow-hidden mouse-point"
    >
      <div class="three-bg left-0 right-0 top-0 bottom-0 absolute"></div>
    </div>
    <div class="home-view-1-wrapper sticky-el-wrapper relative z-10">
      <div
        class="home-view-1 full-height flex flex-col justify-between sticky top-0 sticky-el"
      >
        <div></div>
        <div class="h-view-1-text global-inner relative z-10">
          <div>
            <div class="h-tt-1">
              <div><SVGTextOne /></div>
            </div>
            <div class="h-tt-2">
              <div class="flex">
                <h3 class="large-4">{{ HomeInfo.text_a[0] }}</h3>
                <h2 class="large-1">{{ HomeInfo.text_a[1] }}</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="global-inner relative z-10">
          <div class="ltss-title">
            <div class="flex items-baseline gap-2 overflow-hidden">
              <div>{{ HomeInfo.text_b[0] }}</div>
            </div>
            <div class="flex items-baseline gap-2 overflow-hidden">
              <span class="large-ss">{{ HomeInfo.text_b[1] }}</span>
              <div>{{ HomeInfo.text_b[2] }}</div>
            </div>
          </div>
        </div>
        <div
          class="view-bg-wrapper absolute top-0 left-0 right-0 bottom-0 overflow-hidden hidden"
        >
          <GloImage
            src="/img/un-image-1.jpg"
            alt=""
            className="glo-bg-img absolute top-0 left-0 right-0 bottom-0 "
            type="bg"
          />
        </div>
      </div>
    </div>
    <div class="home-view-2-wrapper sticky-el-wrapper relative z-10">
      <div class="home-view-2 full-height flex sticky top-0 sticky-el">
        <div class="h-view-2-text global-inner glo-padding">
          <div class="large-0 serif-text font-400">
            <div class="hv2line justify-start aNsc4-a">
              <div class="split_text">{{ HomeInfo.text_c[0] }}</div>
            </div>
            <div class="hv2line justify-end aNsc4-b">
              <span class="large-ss">{{ HomeInfo.text_c[1] }}</span>
              <div class="split_text">{{ HomeInfo.text_c[2] }}</div>
            </div>
            <div class="hv2line justify-evenly aNsc4-c">
              <div class="flex items-baseline justify-evenly">
                <span class="large-ss">{{ HomeInfo.text_c[3] }}</span>
                <div class="split_text">{{ HomeInfo.text_c[4] }}</div>
                <span class="large-ss">{{ HomeInfo.text_c[5] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="theline global-inner opacity-25 relative z-10 reach_el rec1"
    ></div>
    <div class="home-view-3-wrapper sticky-el-wrapper relative z-10">
      <div
        class="home-view-3 full-height flex items-center sticky top-0 sticky-el"
      >
        <div class="global-inner glo-padding">
          <div class="home-view-3-inner flex flex-wrap parallax-el">
            <div class="home-view-3-inner-1">
              <div>
                <div class="s-title">
                  <div>[ / ]<span>Stay Passion</span></div>
                </div>
                <div class="large-4 intro-text font-light split_words">
                  {{ HomeInfo.text_d[0] }}
                </div>
                <div class="intro-list flex items-center">
                  <router-link to="/">Design</router-link>
                  <span>/</span>
                  <router-link to="/">Development</router-link>
                  <GloButton name="explore" link="/about" />
                </div>
              </div>
            </div>
          </div>
          <div class="home-view-3-inner-b flex flex-wrap flex-row-reverse">
            <div class="home-view-3-inner-b1 basis-1/2 reach_el">
              <div class="view-cc-alo parallax-el2">
                <div>
                  <h3 class="large-5 font-light">
                    Bring Your<br />
                    Ideas To Life
                  </h3>
                  <p>
                    We delve into our clients' business and user requirements,
                    and utilize the latest technology and design concepts to
                    provide comprehensive digital solutions.
                  </p>
                </div>
              </div>
            </div>
            <div class="home-view-3-inner-b2 basis-1/2 reach_el">
              <div class="view-cc-alo">
                <div>
                  <h3 class="large-5 font-light">
                    Fusion of art<br />
                    and technology
                  </h3>
                  <p>
                    We committed to providing the best digital solutions for
                    clients, making the interaction between brands and users
                    more convenient, efficient, and enjoyable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-view-4 flex items-center relative z-10 reach_el">
      <div class="glo-padding">
        <div class="home-view-4-inner">
          <div class="big-text-wrap b-text-1">
            <div
              class="large-3 serif-text flex justify-center items-baseline b-text-1b global-inner"
            >
              <div class="text-center">
                We provide professional services at every stage of the project
              </div>
              <!-- <div>Work</div> -->
            </div>
            <div class="large-0 serif-text flex b-text-1c">
              <div class="outline-text opacity-50 flex anim-text-loop">
                <div>Experience</div>
                <div>Experience</div>
                <div>Experience</div>
                <div>Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-view-5 relative z-10">
      <div class="global-inner glo-padding">
        <div class="home-view-5-inner">
          <div class="flex items-center justify-center w-full hv5-title">
            <div class="s-title">
              <div>Featured Works</div>
            </div>
          </div>
          <ListOneB />
          <div class="home-view-5-button flex justify-center">
            <GloButton name="all works" link="/works" type="router round" />
          </div>
        </div>
      </div>
    </div>
    <div class="home-view-6 relative z-10 reach_el">
      <div class="global-inner glo-padding">
        <div class="home-view-6-inner parallax-el2">
          <div class="large-2 serif-text b-text-2a">
            <div class="opacity-80 split_W_words">
              {{ HomeInfo.text_6 }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-view-7 relative z-10 reach_el">
      <div class="global-inner glo-padding">
        <div class="home-view-7-inner">
          <div class="home-view-7-text-1 mx-auto">
            <div class="s-title">
              <div>///<span>Expertise</span></div>
            </div>
            <div class="large-5 intro-text max-w-screen-md">
              We are able to provide customers with professional services at
              every stage of the project, from conceptual design to development,
              testing and deployment, to escort customers' digital development
            </div>
          </div>
          <div class="home-view-7-list">
            <ListTwo />
          </div>
        </div>
      </div>
    </div>
    <div class="reach_el rec2"></div>
  </div>
</template>

<style scoped>
.home-view-1 {
  padding: calc(var(--gap) * 2) 0;
}

.h-tt-2 .flex {
  align-items: baseline;
}

.h-tt-2 .flex > h3 {
  margin-right: 0.5em;
}
.h-tt-2 h2 {
  padding-right: 0.04em;
}
.s-title {
  overflow: hidden;
}

.h-tt-2 .large-1 {
  padding-bottom: 0.035em;
  padding-right: 0.035em;
}
.h-tt-2 :deep(span) {
  display: inline-block;
  text-transform: none;
}

.h-tt-2 h2,
.h-tt-2 h3 {
  overflow: hidden;
}

.h-view-2-text.glo-padding {
  padding-top: calc(var(--gap) * 2);
  padding-bottom: calc(var(--gap) * 2.75);
}
.hv2line {
  display: flex;
  align-items: center;
  line-height: 1;
}

.hv2line .large-ss {
  font-size: max(1rem, 0.25em);
  letter-spacing: -0.065em;
}

.hv2line span {
  display: inline-block;
}

.hv2line {
  gap: 0.25em;
}
.hv2line > .flex {
  gap: 0.25em;
  margin-left: -0.06em;
}
.home-view-2.flex {
  align-items: center;
}
.intro-text {
  /* text-transform: capitalize; */
  letter-spacing: -0.04em;
  margin-top: calc(var(--gap) * 0.5);
  margin-bottom: calc(var(--gap) * 2);
  line-height: 1.45;
}
.intro-list.flex {
  gap: calc(var(--gap) * 0.5);
}

.view-3-image {
  width: 100%;
  /* max-width: 420px; */
}
.image-wrapper-1 {
  width: 100%;
  padding-bottom: 77%;
}

.b-text-1c {
  overflow: hidden;
  width: 100vw;
  padding-bottom: 0.25em;
}
.b-text-1c {
  mix-blend-mode: color-dodge;
  color: var(--text-200);
  line-height: 1;
}
.b-text-1b {
  gap: 0.25em;
}
.b-text-1b > div {
  width: 50%;
  min-width: 420px;
  text-transform: none;
  font-weight: 300;
}
.large-0.serif-text.b-text-1c > div {
  font-size: 200%;
}
.home-view-5-button :deep(.gloButton a) {
  border: 0;
}

.home-view-5-button {
  padding-top: calc(var(--gap) * 3);
}

.home-view-7-text-1 {
  padding-bottom: calc(var(--gap) * 2);
}
.home-view-5 > .global-inner.glo-padding {
  padding-top: 0;
}

.hv5-title {
  padding-bottom: calc(var(--gap) * 1.5);
}

.view-cc-alo {
  max-width: 640px;
}

.view-cc-alo > div {
  display: flex;
  flex-direction: column;
  min-height: 250px;
  justify-content: space-between;
  gap: calc(var(--gap) * 6.5);
  padding: calc(var(--gap) * 1);
  border: 1px solid var(--border-color);
}

.home-view-3-inner-b {
  padding-top: calc(var(--gap) * 2);
}
.large-ss svg {
  width: max(12px, 0.8em);
  height: auto;
  opacity: 1;
}
.b-text-1b {
  margin-bottom: calc(var(--gap) * 1);
}

/* animation text loop */
@keyframes text-loop {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-25%, 0, 0);
  }
}
.anim-text-loop {
  animation: text-loop 8s linear infinite;
}

@media screen and (min-width: 1024px) {
  .h-view-1-text {
    max-width: 66.666%;
  }
}

@media screen and (min-width: 768px) {
  .home-view-3-inner-1 {
    flex-basis: 61%;
  }

  .home-view-3-inner-2 {
    flex-basis: 36%;
  }
  .intro-list.flex .gloButton {
    margin-left: calc(var(--gap) * 0.5);
  }
  .home-view-7-inner {
    margin-right: 0;
    margin-left: auto;
    max-width: 1344px;
  }
  .home-view-1-wrapper {
    height: 200vh;
  }
  .home-view-2-wrapper {
    height: 300vh;
  }
  /* .home-view-3-wrapper {
    height: 300vh;
  } */
  .home-view-3-inner-b1 > div {
    width: 88%;
  }
  .home-view-3-inner-b2 > div {
    width: 88%;
  }
  .home-view-3-inner-b2 {
    margin-top: calc(var(--gap) * 6.5);
  }
}

@media screen and (max-width: 768px) {
  .h-tt-2 h2.large-2 {
    font-size: 18vw;
  }
  .home-view-1.full-height.flex.relative.flex-col.justify-between {
    justify-content: flex-end;
    gap: calc(var(--gap) * 10);
  }
  .home-view-2.full-height.flex {
    height: auto;
    min-height: 100vw;
  }

  .home-view-3.full-height {
    height: auto;
  }

  .home-view-3-inner-1 {
    margin-bottom: calc(var(--gap) * 3);
  }

  .intro-list.flex {
    flex-wrap: wrap;
  }

  .intro-list.flex .gloButton {
    width: 100%;
    margin-top: calc(var(--gap) * 2);
  }
  .h-view-1-text.global-inner {
    margin-top: 20vh;
  }

  .h-view-2-text.glo-padding {
    padding: 15vh 0;
    border-top: 1px solid var(--border-color);
  }
  .home-view-3-inner-b.flex.flex-wrap > .basis-1\/2 {
    flex-basis: 100%;
    margin-bottom: 2em;
  }

  .b-text-1b > div {
    min-width: 0px;
    width: 100%;
  }
  .three-bg-wrapper.fixed.left-0.right-0.top-0.bottom-0 {
    height: 120%;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
