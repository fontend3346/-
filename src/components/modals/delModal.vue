<template>
  <div class="delmodal" v-show="showDel">
    <div class="card">
      <div class="header">
        <div class="title">
          <span class="text" v-show="!download"
            >确定要删除吗？<span class="tragger"></span
          ></span>
          <span class="text" v-show="download"
            >是否下载或生成回放文件？<span class="tragger"></span
          ></span>
        </div>
        <span class="iconfont icon-guanbi1" @click="cancel"></span>
      </div>
      <div class="btns">
        <span class="cancel-btn" @click="cancel">取消</span>
        <span class="confirm-btn" @click="confirm">确定</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { watchEffect, ref, reactive, computed, toRefs, onMounted } from "vue";
export default {
  props: {
    showDel: {
      type: Boolean,
      default: false,
    },
    download: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const cancel = () => {
      emit("cancel");
    };
    const confirm = () => {
      emit("confirm");
    };
    return {
      cancel,
      confirm,
    };
  },
};
</script>

<style lang="less" scoped>
.delmodal {
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
  .card {
    position: absolute;
    top: 300px;
    width: 400px;
    height: 200px;
    background: rgba(0, 0, 0);
    border: 1px solid @crad-border-color;
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
    .btns {
      display: flex;
      justify-content: space-around;
      margin-top: 80px;
      span {
        width: 96px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: @template-font-size;
        font-weight: 400;
        color: #fff;
        border-width: 2px;
        border-style: solid;
        border-color: @global-border-color;
      }
      .cancel-btn {
        cursor: pointer;
        background: #0377a8;
      }
      .confirm-btn {
        background-color: @btn-bg-color !important;
        cursor: pointer;
      }
    }
  }
}
</style>
