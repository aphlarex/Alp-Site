<template>
  <div class="list-one">
    <div class="list-one-wrap">
      <div class="list-one-item" v-for="(item, index) in theLists" :key="index">
        <div class="list-one-item-wrap flex justify-between items-center">
          <div class="lits-one-flex-1 flex items-start">
            <div class="list-one-item-tag">
              <div class="s-title">{{ "0" + (index + 1) }}</div>
            </div>
            <div class="lits-one-flex-2">
              <div class="list-one-item-title">
                <h3 class="large-3 leading-none">{{ item.title }}</h3>
              </div>
              <div class="list-one-item-desc">
                <div class="flex gap-2 font-extralight capitalize opacity-70">
                  <span v-for="(childItem, index) in item.desc" :key="index">{{
                    childItem.name
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="list-one-item-img hidden">
            <img :src="item.img" alt="" />
          </div>
          <div class="list-one-item-link">
            <GloButton name="explore" :link="item.link" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GloButton from "./GloButton.vue";
const theLists = ref([
  {
    tag: "Work",
    title: "Meetsocial",
    desc: [{ name: "Responsive" }, { name: "Adaptive" }, { name: "Immersive" }],
    img: "https://picsum.photos/600/360",
    link: "/works/",
  },
  {
    tag: "Work",
    title: "Kr-Center",
    desc: [{ name: "Responsive" }, { name: "Adaptive" }, { name: "Immersive" }],
    img: "https://picsum.photos/600/360",
    link: "/",
  },
  {
    tag: "Work",
    title: "Galaxy Bicycle",
    desc: [{ name: "Responsive" }, { name: "Adaptive" }, { name: "Immersive" }],
    img: "https://picsum.photos/600/360",
    link: "/",
  },
  {
    tag: "Work",
    title: "Tilo Sanitary",
    desc: [{ name: "Responsive" }, { name: "Adaptive" }, { name: "Immersive" }],
    img: "https://picsum.photos/600/360",
    link: "/",
  },
  {
    tag: "Work",
    title: "Vanjee",
    desc: [{ name: "Responsive" }, { name: "Adaptive" }, { name: "Immersive" }],
    img: "https://picsum.photos/600/360",
    link: "/",
  },
]);
</script>

<style scoped>
.list-one-item {
  border-top: 1px solid var(--border-color);
}

.list-one-item:last-child {
  border-bottom: 1px solid var(--border-color);
}
.list-one-item-wrap {
  width: 100%;
}

.list-one-item {
  padding: calc(var(--gap) * 1.5) 0;
  padding-right: calc(var(--gap) * 0.5);
}

.lits-one-flex-1 {
  gap: calc(var(--gap) * 2);
}

.list-one-item-tag .s-title {
  padding: 0.5em 0;
}
.list-one-item-desc {
  padding-top: calc(var(--gap) * 0.5);
}
.list-one-item-desc > div span {
  display: inline-block;
}

.list-one-item-desc > div :deep(span::after) {
  content: ".";
  display: inline-block;
  margin-left: 0.5rem;
}
.list-one-item-desc > div :deep(span:last-child::after) {
  opacity: 0;
}
.large-3.leading-none {
  line-height: 1;
}
</style>