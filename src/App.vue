<script setup lang="ts">
import anime from "animejs";
import { AlpData, Alpscroll } from "~/js/Alpscroll.js";
import { GlobalFn } from "~/js/Global.js";

const router = useRouter();
// https://github.com/vueuse/head
useHead({
  title: "LH.WA Studio",
  meta: [
    {
      name: "description",
      content:
        "Design and Web development studio focus on digital development for brand clients.",
    },
    {
      name: "theme-color",
      content: computed(() => (isDark.value ? "#000000" : "#ffffff")),
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: computed(() =>
        preferredDark.value ? "/icon-dark.svg" : "/icon.svg"
      ),
    },
  ],
});

//
let alp = "";
let app_state = ref(false);
alp = new Alpscroll();
// 依赖注入
provide("AlpScroll", alp);
provide("State", app_state);

function AddClass() {
  document.querySelector("html").classList.add("PageInit");
  setTimeout(() => {
    document.querySelector(".point-e-none").classList.add("init");
  }, 800);
}
function RemoveClass() {
  document.querySelector(".point-e-none").classList.remove("init");
  document.querySelector("html").classList.remove("PageInit");
}

onMounted(() => {
  new GlobalFn().SetFullHeight("html");
  new GlobalFn().HeadRoom();
  // init scroll
  alp.init(0.1, 1, false, false, "body");
  alp.lenis.scrollTo(0, {
    duration: 0,
  });
  //
  AddClass();
  // set app state
  app_state.value = true;
});
// beforeEach
router.beforeEach((to, from, next) => {
  RemoveClass();
  anime.remove("*");
  setTimeout(() => {
    alp.lenis.start();
    alp.lenis.scrollTo(0, {
      duration: 0,
      onComplete: function () {
        app_state.value = false;
        alp.ClearData();
        console.log("beforeEach");
        next();
      },
    });
  }, 600);
});
// afterEach
router.afterEach((to, from) => {
  if (app_state.value == false) {
    alp.RePushData();
  }
  console.log(AlpData);
  setTimeout(() => {
    console.log("afterEach");
    AddClass();
    if (app_state.value == false) {
      app_state.value = true;
    }
  }, 200);
});
</script>

<template>
  <TopHeader />
  <div class="LayoutWrapper">
    <RouterView />
  </div>
</template> 
