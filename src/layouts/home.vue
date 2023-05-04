<script setup>
import anime from "animejs";
import { GlobalFn } from "~/js/Global.js";
import { Alpscroll } from "~/js/Alpscroll.js";
const router = useRouter();

// AlpScroll由APP.vue provide()
let alp = inject("AlpScroll");
let AppState = inject("State");

// onMounted
onMounted(() => {});

// use router afterEach
router.afterEach((to, from) => {});

// onBeforeRouteLeave
// onBeforeRouteLeave((to, from, next) => {
// });
</script>

<template>
  <RouterView />
  <BottomFooter />
</template>
