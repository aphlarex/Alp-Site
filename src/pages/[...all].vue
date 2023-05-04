<script setup lang="ts">
// const { t } = useI18n();
useHead({
  title: "Oops 404 | LH.WA Studio",
});
onMounted(() => {
  document.querySelector(".fourZerofour").classList.add("loaded");
});
</script>

<template>
  <div>
    <div class="fourZerofour">
      <h1 class="large-0">404</h1>
      <h3 class="large-4">This page does not seem to exist</h3>
    </div>
  </div>
</template>

<style scoped>
.fourZerofour {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2em;
  flex-wrap: wrap;
  flex-direction: column;
  opacity: 0;
  transition: 1s 0.2s;
}
.fourZerofour.loaded {
  opacity: 1;
}
</style>

<route lang="yaml">
meta:
  layout: empty
</route>
