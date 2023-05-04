<template>
  <div class="list-two">
    <div class="list-two-wrap">
      <div class="list-two-item" v-for="(item, index) in theLists" :key="index">
        <div class="list-two-item-wrap flex justify-between">
          <div class="list-two-item-aa">
            <div>
              <div class="large-5">{{ item.title }}</div>
              <div class="large-5 opacity-50">{{ item.tag }}</div>
            </div>
          </div>
          <div class="list-two-item-bb">
            <div>
              <p>{{ item.content }}</p>
              <div class="list-two-item-desc">
                <div class="flex gap-2 font-extralight capitalize opacity-70">
                  <span v-for="(childItem, index) in item.desc" :key="index">{{
                    childItem.name
                  }}</span>
                </div>
              </div>
            </div>
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
    title: "Web",
    tag: "Design",
    desc: [{ name: "Responsive" }, { name: "Adaptive" }, { name: "Animation" }],
    img: "https://picsum.photos/600/360",
    content:
      "We have extensive design experience and skills to create excellent websites and digital products for our clients, creating intuitive, easy-to-navigate and user-friendly designs.",
  },
  {
    title: "UX&UI",
    tag: "Design",
    desc: [
      { name: "Responsive" },
      { name: "Usability" },
      { name: "Systematize" },
    ],
    img: "https://picsum.photos/600/360",
    content:
      "We can flexibly use creative thinking, provide creative design solutions, provide customers with unique visual experience, and create highly personalized and user-friendly digital products.",
  },
  {
    title: "Front-End",
    tag: "Development",
    desc: [
      { name: "Javascript" },
      { name: "Vue & React" },
      { name: "Wordpress" },
    ],
    img: "https://picsum.photos/600/360",
    content:
      "We can design amazing responsive pages and applications to ensure that users can experience seamlessly on different devices, using mainstream front-end frameworks, and using them to develop complex web applications.",
  },
]);
</script>

<style scoped>
.list-two-item {
  border-top: 1px solid var(--border-color);
}

.list-two-item:last-child {
  border-bottom: 1px solid var(--border-color);
}
.list-two-item-wrap {
  width: 100%;
}

.list-two-item {
  padding: calc(var(--gap) * 1.5) 0;
  padding-right: calc(var(--gap) * 0.5);
}

.list-two-item-desc {
  padding-top: calc(var(--gap) * 0.5);
}
.list-two-item-desc > div span {
  display: inline-block;
}

.list-two-item-desc > div :deep(span::after) {
  content: ".";
  display: inline-block;
  margin-left: 0.5rem;
}
.list-two-item-desc > div :deep(span:last-child::after) {
  opacity: 0;
}
.large-4.outline-text {
  margin-left: 0;
  opacity: 0.7;
}

.list-two-item-aa .large-4 {
  line-height: 1;
}
.list-two-item-bb {
  max-width: 480px;
}
@media screen and (max-width: 768px) {
  .list-two-item-wrap.flex {
    flex-wrap: wrap;
    gap: calc(var(--gap) * 2);
  }

  .list-two-item {
    padding: calc(var(--gap) * 2.5) 0;
  }
  .list-two-item-desc {
    font-size: 12px;
    padding-top: calc(var(--gap) * 1.5);
  }
}
</style>