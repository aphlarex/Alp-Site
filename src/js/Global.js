// 依赖vue,vueuse

export const GlobalFn = class Global {
  constructor() {
    this.data = {};
  }
  // SplitText
  SplitText(elm, wrapper, tag) {
    let elms = document.querySelectorAll(elm);
    elms.forEach((elm) => {
      let text = elm.innerText;
      let split = text.split(tag ? tag : "");
      elm.innerHTML = "";
      split.forEach((char) => {
        let span = document.createElement(wrapper ? wrapper : "span");
        span.innerHTML = char;
        if (char !== "") {
          elm.appendChild(span);
        }
      });
    });
  }
  // Set Full Height
  SetFullHeight(elm) {
    let elms = document.querySelectorAll(elm);
    function update() {
      elms.forEach((elm) => {
        elm.style.setProperty("--vh", window.innerHeight + "px");
      });
    }
    update();
    useEventListener(window, "resize", () => {
      update();
      console.log("resize");
    });
  }
  // headroom
  HeadRoom() {
    // 记录上一次滚动位置
    let lastScrollPosition = window.scrollY;
    let $el = document.querySelector("html");
    // 监听窗口滚动事件
    useEventListener(window, "scroll", () => {
      // 获取当前滚动位置
      const currentScrollPosition = window.scrollY;
      // 判断滚动方向
      if (currentScrollPosition > lastScrollPosition && $el.dataset.direction !== "down") {
        $el.dataset.direction = "down";
      } else if (currentScrollPosition < lastScrollPosition && $el.dataset.direction !== "up") {
        $el.dataset.direction = "up";
      }
      // 更新上一次滚动位置
      lastScrollPosition = currentScrollPosition;
      // 检查是否到达顶部
      if (currentScrollPosition == 0 && $el.dataset.scroll !== "top") {
        $el.dataset.scroll = "top";
      } else if (currentScrollPosition !== 0 && $el.dataset.scroll !== "not-top") {
        $el.dataset.scroll = "not-top";
      }
    });
  }
  // LoadShow
  HtmlAddClass(ClassName) {
    tryOnMounted(() => {
      document.querySelector("html").classList.add(ClassName ? ClassName : "load");
    });
    tryOnUnmounted(() => {
      document.querySelector("html").classList.remove(ClassName ? ClassName : "load");
    });
  }
  // Clamp Number
  ClampNumber(num, min, max) {
    return Math.max(min, Math.min(num, max));
  }
  SetRatioImg(el) {
    let $ratio = window.innerWidth / window.innerHeight;
    let $img = document.querySelectorAll(el);
    $img.forEach(function (item) {
      let $img_width = item.clientWidth;
      item.style.height = $img_width / $ratio + "px";
      let $offsetLeft = item.offsetLeft + $img_width / 2;
      let $offsetTop = item.offsetTop + item.clientHeight / 2;
      item.dataset.offset_left = $offsetLeft;
      item.dataset.offset_top = $offsetTop;
    });
  }
};
