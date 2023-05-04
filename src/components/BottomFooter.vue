<template>
  <div class="footer-view relative">
    <div
      class="view-bg2-wrapper absolute top-0 left-0 right-0 bottom-0 overflow-hidden opacity-80 hidden"
    ></div>
    <div class="global-inner relative z-10">
      <div
        class="footer-view-inner full-height glo-padding flex flex-col justify-between"
      >
        <div></div>
        <div class="footer-view-text-1">
          <div class="">
            <div class="large-1 leading-none flex GetInTouch flex-wrap">
              <div class="split_text">Get</div>
              <div class="split_text">In</div>
              <div class="split_text">Touch</div>
            </div>
          </div>
        </div>

        <div class="footer-view-text-3 flex justify-between items-end">
          <div>
            <div class="contact-list">
              <div class="ct-links font-extralight">
                <a href="mailto:aphlarex@live.com">
                  <div class="button-bg-cri absolute"><div></div></div>
                  <span>aphlarex@live.com</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 12 12"
                  >
                    <path
                      fill="#fff"
                      d="M6 0 4.9425 1.0575 9.1275 5.25H0v1.5h9.1275L4.935 10.935 6 12l6-6-6-6Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div class="copy-right opacity-30 font-extralight">
            <p>LH.WA All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script setup>
import $ from "jquery";
import { GlobalFn } from "~/js/Global.js";
// AlpScroll由APP.vue provide()
let alp = inject("AlpScroll");
onMounted(() => {
  new GlobalFn().SplitText(".split_text", "span", "");
});
</script>

<style scoped>
.GetInTouch {
  gap: 0.25em;
}
.footer-view-text-1 {
  padding: calc(var(--gap) * 1) 0;
}
.ct-links a {
  display: inline-flex;
  align-items: center;
  gap: 1em;
  font-size: 1.35em;
}

.ct-links a svg {
  display: inline-block;
  transform: rotate(-45deg);
}
.footer-view-text-3 {
  padding-right: calc(var(--gap) * 2);
}

.view-bg2-wrapper {
  background: var(--bg-100);
}
.footer-view-inner.glo-padding {
  padding-bottom: calc(var(--gap) * 2);
}
.footer-view-text-1 .contact-list {
  margin-top: calc(var(--gap) * 2);
}
.ct-links a {
  padding: 1.5em 2.25em;
  border: 1px solid var(--border-color);
  border-radius: 1000px;
  position: relative;
  overflow: hidden;
  z-index: 5;
  transition: 0.4s;
}

.footer-view-text-1 .large-1 {
  margin-left: -0.04em;
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
.button-bg-cri > div {
  background-color: var(--text-100);
  width: 100%;
  padding-bottom: 100%;
  border-radius: 1000px;
  transition: 0.4s;
  transform: scale(0);
}

.ct-links a:hover .button-bg-cri > div {
  transform: scale(1);
}

.ct-links a span,
.ct-links a svg {
  position: relative;
  z-index: 4;
}

.ct-links > a svg path,
.ct-links a svg path {
  transition: 0.4s;
}

.ct-links > a:hover,
.ct-links a:hover {
  color: var(--bg-100);
}

.ct-links > a:hover svg path,
.ct-links a:hover svg path {
  fill: var(--bg-100);
}

@media screen and (max-width: 768px) {
  .footer-view-inner.full-height {
    height: auto;
  }

  .footer-view-text-2.flex {
    flex-wrap: wrap;
    gap: calc(var(--gap) * 3);
  }

  .footer-view-inner.flex {
    gap: calc(var(--gap) * 3);
  }

  .copy-right {
    font-size: 12px;
  }
  .footer-view-inner.glo-padding {
    padding-bottom: calc(var(--gap) * 3);
  }

  .ct-links a {
    font-size: 1em;
  }

  .footer-view-text-3.flex.justify-between.items-end {
    justify-content: center;
    flex-wrap: wrap;
    padding-right: 0;
  }

  .footer-view-text-1 {
    text-align: center;
  }

  .copy-right {
    margin-top: 2em;
  }
  .footer-view-text-1 .large-1 {
    justify-content: center;
  }
}
</style>