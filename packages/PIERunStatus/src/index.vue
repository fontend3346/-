
<template>
  <!-- 状态按钮 -->
  <div class="status-btn" :class="{ errStatus: props.options.status == 1 }">
    <div class="country">
      <div class="status-left">
        <img src="../../../src/assets/image/green.png" />
      </div>
      <div class="status-right">{{ props.options.name }}</div>
    </div>
    <div class="green-status" v-if="props.options.status == 0">
      <div class="run-status">
        <div class="status-left">运行状态:</div>
        <div class="status-right">执行中</div>
      </div>
      <div class="health-status">
        <div class="status-left">健康状态:</div>
        <div class="status-right">良好</div>
      </div>
    </div>
    <div class="red-status" v-else>
      <div class="run-status">
        <div class="status-left">运行状态:</div>
        <div class="status-right">空闲状态</div>
      </div>
      <div class="health-status">
        <div class="status-left">健康状态:</div>
        <div class="status-right">异常</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    options: any;
  }>(),
  {
    options: {
      name: "韩国",
      status: "运行状态",
    },
  }
);
const { state, onClick } = useHandler(props, emit);
</script>

<style scoped lang="less">
.status-btn {
  padding: 5px;
  height: 100px;
  width: 270px;
  display: flex;
  flex-direction: column;
  //background-color: rgba(35, 238, 86, 0.6);
  box-shadow: 0px 0px 20px 5px rgb(40, 197, 40) inset;
  //box-shadow:0px 0px 20px 5px rgb(236, 65, 65) inset;

  .country {
    height: 40%;
    display: flex;
    justify-content: flex-start;
    .status-left {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      //padding: 15px;
      // padding-top:10px;
      // padding-bottom: 10px;
      img {
        height: 36%;
        width: 25%;
      }
    }
    .status-right {
      width: 80%;
      color: white;
      font-size: 19px;
      font-weight: 500;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .green-status {
    height: 60%;
    display: flex;
    flex-direction: column;
    .run-status {
      height: 50%;
      display: flex;
      justify-content: space-around;
      .status-left {
        width: 40%;
        color: white;
        font-size: 18px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .status-right {
        width: 60%;
        //background-color: rgb(93, 121, 245);
        background: url("../../../src/assets/image/status-blue.png");
        background-position: center center;
        background-size: 90% 90%;

        color: white;
        font-size: 19px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .health-status {
      height: 50%;
      display: flex;
      justify-content: space-around;

      .status-left {
        width: 40%;
        color: white;
        //font-size: @auxiliary-font;
        font-size: 18px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .status-right {
        width: 60%;
        //background-color: rgb(65, 223, 65);
        background: url("../../../src/assets/image/status-green.png");
        background-position: center center;
        background-size: 90% 90%;
        color: white;
        font-size: 19px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .red-status {
    height: 60%;
    display: flex;
    flex-direction: column;
    .run-status {
      height: 50%;
      display: flex;
      justify-content: space-around;
      .status-left {
        width: 40%;
        color: white;
        font-size: 18px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .status-right {
        width: 60%;
        //background-color: rgb(93, 121, 245);
        background: url("../../../src/assets/image/status-zise.png");
        background-position: center center;
        background-size: 90% 90%;

        color: white;
        font-size: 19px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .health-status {
      height: 50%;
      display: flex;
      justify-content: space-around;

      .status-left {
        width: 40%;
        color: white;
        //font-size: @auxiliary-font;
        font-size: 18px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .status-right {
        width: 60%;
        //background-color: rgb(65, 223, 65);
        background: url("../../../src/assets/image/status-red.png");
        background-position: center center;
        background-size: 90% 90%;
        color: white;
        font-size: 19px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.errStatus {
  box-shadow: 0px 0px 20px 5px #ec1a0b inset;
}
</style>

