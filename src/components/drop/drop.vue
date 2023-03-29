<template>
  <div class="box">
    <div id="item1" class="item"></div>
    <div id="item2" class="item"></div>
    <div id="item3" class="item"></div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, onBeforeUnmount } from "vue";
export default {
  setup() {
    onMounted(() => {
      // destroyTime()
      box();
      boxActive();
    });
    onBeforeUnmount(() => {
     destroyTime()
    });
    const state = reactive({
      time1: null,
      time2: null,
      tiem3: null,
      timer: null
    });
    const boxActive = () => {
      state.timer = setInterval(() => {
        box();
      }, 2400);
    };
    const box = () => {
      state.time1 = setTimeout(() => {
        document.getElementById("item1").className = "itemHover";
        document.getElementById("item2").className = "item";
        document.getElementById("item3").className = "item";
      }, 800);

      state.time2 = setTimeout(() => {
        document.getElementById("item2").className = "itemHover";
        document.getElementById("item1").className = "item";
        document.getElementById("item3").className = "item";
      }, 1600);
      state.time3 = setTimeout(() => {
        document.getElementById("item3").className = "itemHover";
        document.getElementById("item1").className = "item";
        document.getElementById("item2").className = "item";
      }, 2400);
    };
    // 销毁定时器
    const destroyTime = () => {

      if(state.time1) {
        clearTimeout(state.time1);
        state.time1 = null
      }
      if(state.time2) {
        clearTimeout(state.time2);
        state.time2=null
      }
      if(state.time3) {
        clearTimeout(state.time3);
        state.tiem3 = null
      }
      if(state.timer) {
        clearInterval(state.timer)
        state.timer = null
      }
    };
    return {
      ...toRefs(state),
      box,
      boxActive,
      destroyTime,
    };
  },
};
</script>

<style lang="less" scoped>
* {
  color: #fff;
  font-size: 30px;
}

.el-timeline {
  display: flex;
  align-items: center;
}

.el-timeline li {
  border-top: 1px solid #fff;
}

:deep(.el-timeline-item__tail) {
  border-left: none;
  border-top: 1px solid #fff;
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;

  .item {
    width: 6px;
    height: 6px;
    // background-color: #fff;
    border-radius: 3px;
    margin-left: 2px;
    opacity: 0.5;
  }

  #item1 {
    background-color: rgb(18, 150, 219);
  }

  #item2 {
    background-color: rgb(23, 80, 203);
  }

  #item3 {
    background-color: rgb(8, 53, 151);
  }
}

.itemHover {
  width: 8px;
  height: 8px;
  // background-color: skyblue;
  border-radius: 4px;
  margin-left: 2px;
}
</style>