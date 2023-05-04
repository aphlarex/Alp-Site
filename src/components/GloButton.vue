<template>
  <div class="gloButton" v-if="type === 'router'">
    <router-link :to="link" class="relative">
      <span>{{ name }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="none"
        viewBox="0 0 12 12"
      >
        <path
          fill="#fff"
          d="M6 0 4.9425 1.0575 9.1275 5.25H0v1.5h9.1275L4.935 10.935 6 12l6-6-6-6Z"
        />
      </svg>
      <div class="button-bg-cri absolute"><div></div></div>
    </router-link>
  </div>
  <div class="CriButton" v-else-if="type === 'router round'">
    <router-link :to="link" class="relative">
      <div>
        <span>{{ name }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="none"
          viewBox="0 0 12 12"
        >
          <path
            fill="#fff"
            d="M6 0 4.9425 1.0575 9.1275 5.25H0v1.5h9.1275L4.935 10.935 6 12l6-6-6-6Z"
          />
        </svg>
      </div>
      <div class="button-bg-cri absolute"><div></div></div>
    </router-link>
  </div>
  <div class="CriButton" v-else-if="type === 'round'">
    <a :href="link" :target="target" class="relative">
      <div>
        <span>{{ name }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="none"
          viewBox="0 0 12 12"
        >
          <path
            fill="#fff"
            d="M6 0 4.9425 1.0575 9.1275 5.25H0v1.5h9.1275L4.935 10.935 6 12l6-6-6-6Z"
          />
        </svg>
      </div>
      <div class="button-bg-cri absolute"><div></div></div>
    </a>
  </div>
  <div
    class="Full-link absolute top-0 left-0 right-0 bottom-0 z-10"
    v-else-if="type === 'full'"
  >
    <a
      :href="link"
      :target="target"
      class="absolute top-0 left-0 right-0 bottom-0 z-10"
    >
      <div class="button-bg-cri2 absolute">
        <div>
          <div>
            <span>{{ name }}</span>
          </div>
        </div>
      </div>
    </a>
  </div>
  <div
    class="Full-link absolute top-0 left-0 right-0 bottom-0 z-10"
    v-else-if="type === 'full-router'"
  >
    <router-link :to="link" class="absolute top-0 left-0 right-0 bottom-0 z-10">
      <div class="button-bg-cri2 absolute">
        <div>
          <div>
            <span>{{ name }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
  <div class="gloButton" v-else>
    <a :href="link" :target="target" class="relative">
      <span>{{ name }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="none"
        viewBox="0 0 12 12"
      >
        <path
          fill="#fff"
          d="M6 0 4.9425 1.0575 9.1275 5.25H0v1.5h9.1275L4.935 10.935 6 12l6-6-6-6Z"
        />
      </svg>
      <div class="button-bg-cri absolute"><div></div></div>
    </a>
  </div>
</template>
  
<script setup>
import $ from "jquery";
import { GlobalFn } from "~/js/Global.js";
// AlpScroll由APP.vue provide()
let alp = inject("AlpScroll");

const props = defineProps({
  name: {
    type: String,
    default: "explore",
  },
  link: {
    type: String,
    default: "/",
  },
  target: {
    type: String,
    default: "_self",
  },
  type: {
    type: String,
    default: "router",
  },
});

onMounted(() => {
  alp.mouse(".button-bg-cri", 1, 0.05, 0.05, 0);
  alp.mouse(".button-bg-cri2", 0, 0.05, 0.05, 0);

  function raf() {
    // button-bg-cri effect
    $(".button-bg-cri,.button-bg-cri2").each(function () {
      let $this = $(this);
      $this.css(
        "transform",
        `translate3d(${$this.attr("data-mxx") * 1}px, ${
          $this.attr("data-myy") * 1
        }px, 0px)`
      );
    });
  }
  useRafFn(() => {
    raf();
  });
});
</script>

<style scoped>
.gloButton a {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 30px;
  gap: 16px;
  border: 1px solid var(--border-color);
  border-radius: 1000px;
  position: relative;
  z-index: 5;
}
.CriButton > a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 1000px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 5;
}
.CriButton > a > div {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25em;
}

.CriButton {
  display: inline-flex;
  width: max(100px, calc(100vw / 8));
  height: max(100px, calc(100vw / 8));
  border: 1px solid var(--border-color);
  align-items: center;
  justify-content: center;
  border-radius: 1000px;
  overflow: hidden;
}

.CriButton > a,
.gloButton a {
  transition: 0.4s;
}

.CriButton > a svg path,
.gloButton a svg path {
  transition: 0.4s;
}

.CriButton a:hover,
.gloButton a:hover {
  color: var(--bg-100);
}

.CriButton > a:hover svg path,
.gloButton a:hover svg path {
  fill: var(--bg-100);
}

.button-bg-cri {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Full-link .button-bg-cri2 {
  width: 160px;
  height: 160px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Full-link .button-bg-cri2 > div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: 0;
  border-radius: 1000px;
}
.Full-link .button-bg-cri2 > div > div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: 0;
  border-radius: 1000px;
  color: var(--bg-100);
  background-color: var(--text-100);
  opacity: 0.85;
  transition: 0.4s;
  transform: scale(0);
}

.Full-link a:hover .button-bg-cri2 > div > div {
  transform: scale(1);
}

.button-bg-cri > div {
  background-color: var(--text-100);
  width: 100%;
  padding-bottom: 100%;
  border-radius: 1000px;
  transition: 0.4s;
  transform: scale(0);
}

.CriButton > a:hover .button-bg-cri > div,
.gloButton a:hover .button-bg-cri > div {
  transform: scale(1);
}

.gloButton a,
.CriButton > a {
  overflow: hidden;
}

.gloButton a span,
.gloButton a svg,
.CriButton > a span,
.CriButton > a svg {
  position: relative;
  z-index: 4;
}

@media screen and (max-width: 768px) {
  .CriButton {
    width: max(160px, calc(100vw / 8));
    height: max(160px, calc(100vw / 8));
  }
}
</style>