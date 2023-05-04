<template>
  <div class="list-one-d">
    <div class="list-one-wrap-d flex flex-wrap">
      <div
        class="list-one-d-item"
        v-for="(item, index) in theLists"
        :key="index"
      >
        <div class="list-one-d-item-wrap relative overflow-hidden">
          <div class="list-one-d-item-img bg-black relative overflow-hidden">
            <GloImage
              :src="item.img"
              alt=""
              className="glo-normal-img"
              type="img"
            />
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
    img: "/img/archive/(1).jpg",
  },
  {
    img: "/img/archive/(2).jpg",
  },
  {
    img: "/img/archive/(3).jpg",
  },
  {
    img: "/img/archive/(4).jpg",
  },
  {
    img: "/img/archive/(5).jpg",
  },
  {
    img: "/img/archive/(6).jpg",
  },
  {
    img: "/img/archive/(7).jpg",
  },
  {
    img: "/img/archive/(8).jpg",
  },
  {
    img: "/img/archive/(9).jpg",
  },
  {
    img: "/img/archive/(10).jpg",
  },
  {
    img: "/img/archive/(11).jpg",
  },
  {
    img: "/img/archive/(12).jpg",
  },
  {
    img: "/img/archive/(13).jpg",
  },
  {
    img: "/img/archive/(14).jpg",
  },
  {
    img: "/img/archive/(15).jpg",
  },
  {
    img: "/img/archive/(16).jpg",
  },
  {
    img: "/img/archive/(17).jpg",
  },
  {
    img: "/img/archive/(18).jpg",
  },
]);
</script>

<style scoped>
.list-one-d-item {
  width: calc(50% - 3%);
  margin-bottom: 6%;
}
.list-one-wrap-d.flex {
  gap: 6%;
}
@media screen and (min-width: 1024px) {
  .list-one-d-item {
    width: calc(33.33% - 4%);
    margin-bottom: 6%;
  }
}
@media screen and (min-width: 768px) {
}
@media screen and (max-width: 768px) {
}
</style>