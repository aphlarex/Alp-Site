<script setup>
useHead({
  title: "YOU SEE THIS | LH.WA Studio",
});
const scroll = useWindowScroll();
onMounted(() => {
  watchEffect(() => {
    // console.log(`useWindowScroll:x${scroll.x.value}`);
    // console.log(`useWindowScroll:y${scroll.y.value}`);
  });
});

useEventListener("scroll", () => {});
</script>

<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center"
  >
    <div class="consoleLog1"></div>
  </div>
</template>

<style scoped>
.consoleLog1 {
  width: 300px;
  height: 200px;
  background-image: url(https://pic.imgdb.cn/item/643915160d2dde5777cdb1f8.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>

<route lang="yaml">
  meta:
    layout: empty
  </route>

