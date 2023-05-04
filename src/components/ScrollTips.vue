<template>
  <div class="scroll-tip">
    <div class="scroll-tip-wrapper">
      <svg
        viewBox="-55 -55 110 110"
        fill="none"
        width="160"
        height="160"
        class="scroll-on-dis"
      >
        <circle
          cx="0"
          cy="0"
          r="50"
          fill="none"
          stroke="var(--text-100)"
          stroke-width="2"
        />
      </svg>
      <svg
        viewBox="-55 -55 110 110"
        fill="none"
        width="160"
        height="160"
        class="scroll-on-top"
      >
        <circle
          cx="0"
          cy="0"
          r="50"
          fill="none"
          stroke="var(--text-100)"
          stroke-width="1"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        fill="none"
        viewBox="0 0 36 36"
        class="scroll-on-dis-arrow"
      >
        <path
          stroke="var(--text-100)"
          stroke-width="1"
          fill="none"
          d="m35.5 18-3.0844-3.0844-12.2281 12.2063V.5h-4.375v26.6219L3.60625 14.8937.5 18 18 35.5 35.5 18Z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import $ from "jquery";
onMounted(() => {
  function scrollDis() {
    let scroll = window.scrollY;
    let windowHeight = window.innerHeight;
    let scrollHeight = document.body.scrollHeight;
    let $dis_cri = $(".scroll-on-dis circle");
    $dis_cri.css(
      "stroke-dashoffset",
      316 - (scroll / (scrollHeight - windowHeight)) * 316
    );
    requestAnimationFrame(scrollDis);
  }
  requestAnimationFrame(scrollDis);
});
</script>
<style scoped>
.scroll-tip {
  position: fixed;
  z-index: 20;
  right: calc(var(--gap) * 2);
  bottom: calc(var(--gap) * 2);
}
.scroll-tip {
  transition: 1s;
}
/* [data-scroll="not-top"] .scroll-tip {
  right: calc(var(--gap) * 1);
  bottom: calc(var(--gap) * 1);
} */

svg.scroll-on-dis {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  top: 0;
}
svg.scroll-on-top {
  opacity: 0.45;
}
svg.scroll-on-dis circle,
svg.scroll-on-top circle {
  stroke-dashoffset: 316;
  stroke-dasharray: 316;
}
svg.scroll-on-top circle {
  opacity: 0;
  transition: 1.5s cubic-bezier(0.66, 0.13, 0.25, 1), opacity 0.5s;
}

html.anim-in svg.scroll-on-top circle {
  opacity: 1;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 3s cubic-bezier(0.66, 0.13, 0.25, 1),
    opacity 0.35s, width 0.8s;
}
svg.scroll-on-top {
  height: auto;
  width: calc(var(--gap) * 2.5);
  max-width: 160px;
  transition: opacity 1s, width 1s;
}
html[data-scroll="not-top"] svg.scroll-on-top {
  width: 32px;
  opacity: 0.2;
}
/* html.anim-in[data-scroll="not-top"] svg.scroll-on-top circle {
  stroke-dashoffset: 316;
  transition: stroke-dashoffset 1.5s cubic-bezier(0.66, 0.13, 0.25, 1);
} */

svg.scroll-on-dis-arrow {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 22%;
}

svg.scroll-on-dis-arrow path {
  stroke-dashoffset: 152;
  stroke-dasharray: 152;
  opacity: 0;
  transition: 1.5s cubic-bezier(0.66, 0.13, 0.25, 1), opacity 0.5s;
}

html.anim-in svg.scroll-on-dis-arrow path {
  opacity: 1;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 3s cubic-bezier(0.66, 0.13, 0.25, 1),
    opacity 0.35s;
}

svg.scroll-on-dis-arrow {
  height: auto;
  opacity: 0.8;
  transition: opacity 1.5s, width 0.8s;
}
html[data-scroll="not-top"] svg.scroll-on-dis-arrow {
  opacity: 0;
}
html[data-scroll="not-top"] svg.scroll-on-dis-arrow path {
  stroke-dashoffset: 152;
  transition: stroke-dashoffset 2s;
}

@media screen and (max-width: 768px) {
  svg.scroll-on-top {
    width: calc(var(--gap) * 5.5);
  }
  html[data-scroll="not-top"] svg.scroll-on-top {
    opacity: 0;
  }
}
</style>