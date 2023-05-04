<template>
  <div class="list-one-b">
    <div class="list-one-wrap-b flex flex-wrap">
      <div
        class="list-one-b-item"
        v-for="(item, index) in theLists"
        :key="index"
      >
        <div class="list-one-b-item-wrap relative overflow-hidden">
          <div class="list-one-b-item-img bg-black relative overflow-hidden">
            <GloImage
              :src="item.img"
              alt=""
              className="glo-bg-img absolute top-0 left-0 right-0 bottom-0 opacity-70"
              type="bg"
            />
            <GloButton
              name="explore"
              :link="item.link"
              :type="item.linkType"
              :target="item.linkTarget"
            />
          </div>
          <div
            class="lits-one-flex-b1 relative z-10 flex gap-8 justify-between"
          >
            <div class="lits-one-b-flex-2">
              <div class="list-one-item-title">
                <h3 class="large-5 leading-none">{{ item.title }}</h3>
              </div>
              <div class="list-one-item-desc">
                <div class="flex gap-2 font-extralight capitalize opacity-70">
                  <span v-for="(childItem, index) in item.desc" :key="index">{{
                    childItem.name
                  }}</span>
                </div>
              </div>
            </div>
            <div class="list-one-b-item-tag">
              <div class="s-title"><span>-</span> {{ "0" + (index + 1) }}</div>
            </div>
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
    desc: [{ name: "Web Development" }, { name: "Motion Design" }],
    img: "/img/site-img-1.jpg",
    link: "https://www.meetsocial.com/",
    linkTarget: "_blank",
    linkType: "full",
  },
  {
    tag: "Work",
    title: "Galaxy Bicycle",
    desc: [
      { name: "Design" },
      { name: "Web Development" },
      { name: "Motion Design" },
    ],
    img: "/img/site-img-2.jpg",
    link: "https://www.galaxybicycle.com/",
    linkTarget: "_blank",
    linkType: "full",
  },
  {
    tag: "Work",
    title: "Tilo Sanitary",
    desc: [
      { name: "Design" },
      { name: "Web Development" },
      { name: "Motion Design" },
    ],
    img: "/img/site-img-3.jpg",
    link: "http://www.tilo.com.cn/",
    linkTarget: "_blank",
    linkType: "full",
  },
  {
    tag: "Work",
    title: "Kr-Center",
    desc: [{ name: "Web Development" }, { name: "Motion Design" }],
    img: "/img/site-img-4.jpg",
    link: "http://www.krcenter.cn/",
    linkTarget: "_blank",
    linkType: "full",
  },
  {
    tag: "Work",
    title: "XiaoDao",
    desc: [{ name: "Web Development" }, { name: "Special Customize" }],
    img: "/img/site-img-6.jpg",
    link: "http://www.xdebike.com/",
    linkTarget: "_blank",
    linkType: "full",
  },
  {
    tag: "Work",
    title: "FuCheng",
    desc: [
      { name: "Design" },
      { name: "Web Development" },
      { name: "Motion Design" },
    ],
    img: "/img/site-img-5.jpg",
    link: "https://www.fucheng.cc/",
    linkTarget: "_blank",
    linkType: "full",
  },
]);
</script>

<style scoped>
.list-one-b-item-tag {
  padding: 0.5em;
}

.lits-one-flex-b1 {
  margin-top: calc(var(--gap) * 0.5);
  margin-bottom: calc(var(--gap) * 0.5);
}
.list-one-item-desc {
  padding-top: 0.5em;
}
.list-one-item-desc > div span {
  display: inline-block;
}

.list-one-item-desc > div :deep(span::after) {
  content: ",";
  display: inline-block;
  margin-left: 0.25rem;
}
.list-one-item-desc > div :deep(span:last-child::after) {
  opacity: 0;
}
.list-one-b-item-img {
  padding-bottom: 110%;
}
.list-one-wrap-b {
  gap: calc(var(--gap) * 1.5);
}
:deep(.glo-bg-img) {
  transition: 0.6s;
  transform: scale(1);
}
.list-one-b-item-img:hover :deep(.glo-bg-img) {
  opacity: 1;
  transform: scale(1.015);
}

@media screen and (min-width: 1024px) {
}
@media screen and (min-width: 768px) {
  .list-one-b-item {
    flex-basis: calc(50% - var(--gap) * 0.75);
  }
}
@media screen and (max-width: 768px) {
  .list-one-item-desc {
    font-size: 12px;
  }
  .list-one-wrap-b {
    column-gap: 0;
  }

  .list-one-wrap-b > div {
    width: 100%;
  }
}
</style>