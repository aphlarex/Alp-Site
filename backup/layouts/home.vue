<script setup>
import $ from "jquery";
import anime from "animejs";
import { alp, GlobalFn } from "~/index.js";
import { options, init_threeBG, ThreeBGAllDispose } from "~/js/three_bg.js";

let globalApp = {};
onMounted(() => {
  // Stop Scroll Before Animation End
  alp.lenis.scrollTo(0, {
    duration: 0,
    onComplete: function () {
      alp.lenis.stop();
    },
  });
  var can_scroll = false;
  function start_scroll() {
    alp.lenis.start();
  }
  //

  new GlobalFn().HeadRoom();
  new GlobalFn().SplitText(".split_text", "span", "");
  new GlobalFn().SplitText(".h-tt-2 h2", "span", "");
  new GlobalFn().SplitText(".split_words", "span", " ");
  new GlobalFn().SplitText(".h-tt-2 h3", "span", " ");
  new GlobalFn().SplitText(".split_W_words", "div", " ");
  new GlobalFn().SplitText(".split_W_words > div", "span", "");
  new GlobalFn().SetFullHeight("html");

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
  globalApp.anime_preload = anime({
    targets: ".LayoutWrapper",
    opacity: [0, 1],
    duration: 500,
    autoplay: false,
    complete: function (anim) {
      globalApp.anime_a.play();
    },
  });

  globalApp.anime_preload.play();

  globalApp.anime_a = anime({
    targets: ".h-tt-1 svg path",
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutSine",
    duration: 1800,
    delay: function (el, i) {
      return i * 50 + 500;
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
    // translateX: ["250px", "0px"],
    // opacity: [0, 1],
    // rotate: ["0deg", "0deg"],
    duration: 1500,
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
    duration: 1000,
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
    duration: 1500,
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

  globalApp.updateRafAnim = "";
  function updateAnim() {
    rafAnimation();
    globalApp.updateRafAnim = requestAnimationFrame(updateAnim);
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
  updateAnim();
});

// onUnmounted
onUnmounted(() => {
  ThreeBGAllDispose();
  window.cancelAnimationFrame(globalApp.updateRafAnim);
  globalApp = {};
});
</script>

<template>
  <TopHeader />
  <div class="LayoutWrapper">
    <RouterView />
  </div>
  <BottomFooter />
</template>
