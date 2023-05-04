<template>
  <header class="top-header point-e-none">
    <div class="header-wrapper">
      <div class="header-left">
        <div class="header-logo">
          <router-link to="/">
            <div class="logo-text">
              <span class="logo-text-1">LH.WA </span>
              <span class="logo-text-2">Studio</span>
            </div>
          </router-link>
        </div>
      </div>
      <div class="header-right">
        <div class="nav-wrapper">
          <div class="nav-item">
            <router-link to="/about"><span>About</span></router-link>
          </div>
          <div class="nav-item">
            <router-link to="/works"><span>Works</span></router-link>
          </div>
          <div class="nav-item">
            <router-link to="/archive"><span>Archive</span></router-link>
          </div>
          <div class="nav-item">
            <a href="mailto:aphlarex@live.com"><span>Contact</span></a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template> 

<script setup>
import anime from "animejs";
const router = useRouter();
const route = useRoute();
onMounted(() => {
  let $load_time = 500;
  if (route.path == "/") {
    $load_time = 1500;
  }
  let anime_a = anime({
    targets: ".header-left , .header-right .nav-item",
    translateY: ["-20px", "0px"],
    rotateX: ["-90deg", "0deg"],
    opacity: [0, 1],
    easing: "easeInOutSine",
    duration: 1600,
    delay: anime.stagger(100, { start: $load_time }),
    autoplay: false,
    complete: function (anim) {},
  });
  anime_a.play();
});
// onBeforeRouteLeave
// onBeforeRouteLeave((to, from, next) => {
//   anime({
//     targets: ".header-left , .header-right .nav-item",
//     translateY: ["0px", "-20px"],
//     rotateX: ["0deg", "-90deg"],
//     opacity: [1, 0],
//     easing: "easeInOutSine",
//     duration: 600,
//     delay: 0,
//     complete: function (anim) {
//       next();
//     },
//   });
// });
</script>

<style scoped>
.header-left,
.header-right .nav-item {
  opacity: 0;
}
span.logo-text-1 {
  font-weight: 500;
}

.logo-text {
  font-size: 24px;
  font-family: "Poppins";
}

span.logo-text-2 {
  font-weight: 200;
}

header.top-header {
  position: fixed;
  left: calc(var(--gap) * 2);
  right: calc(var(--gap) * 2);
  top: calc(var(--gap) * 1);
  z-index: 200;
}
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-wrapper {
  display: flex;
  align-items: center;
  gap: calc(var(--gap) * 1);
}
@media (max-width: 768px) {
  .header-right {
    display: none;
  }
}
</style>