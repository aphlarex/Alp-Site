<template>
  <div
    v-if="type === 'bg'"
    :class="className"
    :style="{ 'background-image': 'url(' + src + ')' }"
  ></div>
  <img v-else :class="className" :src="src" :alt="name" />
</template>
  
<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  src: {
    type: String,
    default: "/img/no-img.png",
  },
  className: {
    type: String,
    default: "glo-img",
  },
  type: {
    type: String,
    default: "img",
  },
});
</script>

<style scoped>
.glo-bg-img {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>