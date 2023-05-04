<template>
  <div class="list-one">
    <div class="list-one-wrap flex flex-wrap">
      <div class="list-one-item" v-for="(item, index) in theLists" :key="index">
        <div class="list-one-item-wrap relative overflow-hidden">
          <div class="lits-one-flex-1 relative z-10">
            <div class="list-one-item-tag">
              <div class="s-title">
                {{ "0" + (index + 1) }} - {{ item.tag }}
              </div>
            </div>
            <div class="lits-one-flex-2">
              <div class="list-one-item-title">
                <h3 class="large-4 leading-none">{{ item.title }}</h3>
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
          <div
            class="list-one-item-img absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0"
          >
            <GloImage
              :src="item.img"
              alt=""
              className="glo-bg-img absolute top-0 left-0 right-0 bottom-0 opacity-50"
              type="bg"
            />
          </div>
          <div class="list-one-item-link hidden">
            <GloButton name="explore" :link="item.link" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GloButton from "./GloButton.vue";
import GloImage from "./GloImage.vue";
const theLists = ref([
  {
    tag: "Work",
    title: "Meetsocial",
    desc: [{ name: "Responsive" }, { name: "Adaptive" }, { name: "Immersive" }],
    img: "https://picsum.photos/1280/1280",
    link: "/works/",
  },

  {
    tag: "Work",
    title: "Galaxy Bicycle",
    desc: [{ name: "Responsive" }, { name: "Adaptive" }, { name: "Immersive" }],
    img: "https://picsum.photos/1280/1280",
    link: "/",
  },
  {
    tag: "Work",
    title: "Tilo Sanitary",
    desc: [{ name: "Responsive" }, { name: "Adaptive" }, { name: "Immersive" }],
    img: "https://picsum.photos/1280/1280",
    link: "/",
  },
  {
    tag: "Work",
    title: "Kr-Center",
    desc: [{ name: "Responsive" }, { name: "Adaptive" }, { name: "Immersive" }],
    img: "https://picsum.photos/1280/1280",
    link: "/",
  },
  {
    tag: "Work",
    title: "Vanjee",
    desc: [{ name: "Responsive" }, { name: "Adaptive" }, { name: "Immersive" }],
    img: "https://picsum.photos/1280/1280",
    link: "/",
  },
  {
    tag: "Work",
    title: "XiaoDao",
    desc: [{ name: "Responsive" }, { name: "Adaptive" }, { name: "Immersive" }],
    img: "https://picsum.photos/1280/1280",
    link: "/",
  },
]);
</script>

<style scoped>
.list-one-item {
  background: rgb(143 143 143 / 5%);
}

.list-one-item-wrap {
  width: 100%;
}

.lits-one-flex-1 {
  display: flex;
  flex-direction: column;
  padding: calc(var(--gap) * 1.5);
  justify-content: space-between;
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

.list-one-wrap {
  gap: calc(var(--gap) * 1);
}

.list-one-wrap .list-one-item {
  flex-basis: 100%;
}

.list-one-item-tag {
  margin-bottom: calc(var(--gap) * 4.5);
}
@media screen and (min-width: 1024px) {
  .lits-one-flex-1 {
    min-height: 75vh;
  }
}
@media screen and (min-width: 768px) {
  .list-one-wrap .list-one-item {
    flex-basis: calc(50% - var(--gap) * 0.5);
  }
}
@media screen and (max-width: 768px) {
  .list-one-item-desc {
    font-size: 12px;
    padding-top: calc(var(--gap) * 1);
  }
}
</style>