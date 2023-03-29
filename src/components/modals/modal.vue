<template>
  <div class="my-modal" v-if="showMask">
    <div
      id="my-modal-content"
      :style="{ width: width + 'vw', minHeight: height + 'vh' }"
    >
      <div class="header">
        <div class="title">
          <span class="text">{{ title }} <span class="tragger"></span></span>
        </div>

        <span class="iconfont icon-guanbi1" v-if="close" @click="cancel"></span>
      </div>
      <div class="operate-item">
        <slot age="10000" name="operateItem"></slot>
      </div>
      <div class="operate-btn" v-if="showBtn">
        <span class="layer-btn" v-if="layerBtn" @click="layer">图层展示</span>
        <span class="cancel-btn" v-if="cancelBtn" @click="cancel"
          >{{ cancelText }}
        </span>
        
        <span class="confirm-btn" v-if="confirmBtn" @click="confirm">{{
          confirmText
        }}</span>
      </div>
      <div class="reset-btn-warp" v-if="showBtn">
        <!--<span class="reset-btn" v-if="resetBtn" @click="reset">重置</span>-->
      </div>
    </div>
  </div>
</template>
<script>
import { watchEffect, ref, reactive, computed, toRefs, onMounted } from "vue";
export default {
  props: {
    title: {
      //控制查看按钮是否显示
      type: String,
      default: "新建",
    },
    value: {
      //控制是否弹出框
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "80",
    },
    height: {
      type: String,
      default: "0",
    },
    cancelBtn: {
      //取消按钮是否显示
      type: Boolean,
      default: true,
    },
    iconCancel: {
      type: Boolean,
      default: false,
    },
    resetBtn: {
      //重置按钮是否显示
      type: Boolean,
      default: false,
    },
    layerBtn: {
      //图层展示按钮是否显示
      type: Boolean,
      default: false,
    },
    confirmBtn: {
      //确认按钮是否显示
      type: Boolean,
      default: true,
    },
    //关闭按钮
    close: {
      type: Boolean,
      default: true,
    },
    //是否显示菜单
    showBtn: {
      type: Boolean,
      default: true,
    },
    //是否显示菜单
    confirmText: {
      type: String,
      default: "确定",
    },
    //是否显示菜单
    cancelText: {
      type: String,
      default: "取消",
    },
    showMask: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      showMask: props.showMask,
      value: props.value,
      title: props.title,
      width: props.width,
      fullscreen: props.fullscreen,
      height: props.height,
      cancelBtn: props.cancelBtn,
      iconCancel: props.iconCancel,
      resetBtn: props.resetBtn,
      confirmBtn: props.confirmBtn,
      close: props.close,
      showBtn: props.showBtn,
      confirmText: props.confirmText,
      cancelText: props.cancelText,
    });
    onMounted(() => {
      // let el = document.getElementById("my-modal-content");
      // el.onmousedown = function (event) {
      //   let ev = event || window.event;
      //   let x = ev.clientX- el.offsetLeft;
      //   let y =  ev.clientY-el.offsetTop;
      //   document.onmousemove = function (event) {
      //     let ev = event || window.event;
      //     let moveX = ev.clientX - x;
      //     let moveY= ev.clientY - y;
      //      if (moveX < 0) {
      //     moveX = 0;
      //   }else if(moveX>window.innerWidth-el.offsetWidth){
      //     moveX=window.innerWidth-el.offsetWidth
      //   }
      //   if (moveY < 0) {
      //     moveY = 0;
      //   }else if(moveY>window.innerHeight-el.offsetHeight){
      //     moveY=window.innerHeight-el.offsetHeight
      //   }
      //   el.style.left=moveX+'px'
      //   el.style.top=moveY+'px'
      //   };
      //   document.onmouseup = function () {
      //     document.onmousemove = null;
      //     document.onmouseup=null
      //   };
      // };
    });

    // watchEffect (() => {
    //         value(newVal, oldVal){
    //   if (newVal) {
    //     document.body.style.overflow = "hidden";
    //   } else {
    //     document.body.style.overflow = "";
    //   }
    //   this.showMask = newVal;
    // }
    // });
    const reset = () => {
      //   this.$emit("reset");
      emit("reset");
    };
    const confirm = () => {
      emit("confirm");
    };
    const cancel = () => {
      emit("cancel");
    };
    const layer = () => {
      emit("layer");
    };
    const cancels = () => {
      showMask.value = false;
      //   emit("cancels");
    };
    return {
      ...toRefs(state),
      reset,
      confirm,
      cancel,
      cancels,
      layer,
    };
  },
  //   data() {
  //     return {
  //       showMask: false,
  //     };
  //   },
};
</script>
<style lang="less" scoped>
.cancel-btn,
.layer-btn {
  background: #0377a8;
}
.my-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
  min-height: 0;
  overflow: hidden;

  #my-modal-content {
    position: relative;
    background-color: rgba(0, 0, 0, 0.85);
    box-sizing: border-box;
    border-width: 2px;
    border-style: solid;
    border-color: #0077a9;
    min-height: 200px;
    // overflow-y: scroll;
    // height: auto;
    // width: auto;
  }

  .header {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    // flex: 1;
    background-size: cover;
    height: 38px;
    // padding-left: 20px;
    padding-top: 6px;
    font-size: @template-font-size;
    font-weight: 400;
    color: @main-font-color;
    // background-color: rgb(10, 10, 105);
    .title {
      position: relative;
      height: 40px;
      .text {
        position: relative;
        padding: 10px 20px;
        background: #0c5375;
        top: 1px;
        left: 0px;
        .tragger {
          position: absolute;
          width: 0;
          height: 0;
          border-right: 44px solid transparent;
          border-top: 44px solid #0c5375;
          top: 0px;
          right: -44px;
        }
      }
    }

    span {
      height: 38px;
      line-height: 38px;
      font-size: @template-font-size;
    }
    .iconfont {
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .operate-item {
    padding: @table-padding;
    min-height: 0;
    // width: 100%;
    margin-bottom: 100px;
    overflow-y: scroll;
    max-height: 800px;
    // margin-left: 80px;
    /*margin-left: 80px;*/
    // display: flex;
    // justify-content: center;
  }
  .reset-btn-warp{
      display: flex;
      position: absolute;
      bottom: 30px;
      left: 50px;
      span {
        width: 96px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin-left: 30px;
        font-size: @template-font-size;
        font-weight: 400;
        color: #fff;
        border-width: 2px;
        border-style: solid;
        border-color: @global-border-color;
      }
      .reset-btn{
        cursor: pointer;
        background: #225e78;
      }
    }
  .operate-btn {
    display: flex;
    position: absolute;
    bottom: 30px;
    right: 50px;

    span {
      width: 96px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      margin-left: 30px;
      font-size: @template-font-size;
      font-weight: 400;
      color: #fff;
      border-width: 2px;
      border-style: solid;
      border-color: @global-border-color;
    }

    .cancel-btn {
      cursor: pointer;
      background: #225e78;
    }
   

    .confirm-btn {
      background-color: @btn-bg-color !important;
      cursor: pointer;
    }
  }
}
</style>
