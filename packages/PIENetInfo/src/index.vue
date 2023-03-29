<template>
  <div class="equipment-list">
    <div
      class="item-info"
      v-for="(item, index) in props.equipmentList"
      :key="index"
      :class="(index+1)%3 == 0  ? 'ismargin' : ''"
      @click="clickSubjectbox(item.id)"
    >
      <div>
        <span class="num">{{ item.num }} / </span>
        <span>{{ item.total }} </span>
      </div>
      <div>{{ item.station }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";
import { ref } from "vue";
const emit = defineEmits<{
  (event: "cancel"): void;
  (event: "update:visible", e: boolean): void;
  (event: "clickSubjectbox", item: any): void;
}>();
const props = withDefaults(
  defineProps<{
    equipmentList: any;
  }>(),
  {
    equipmentList: [
      {
        num: 20,
        total: 100,
        station: "测震台站",
      },
      {
        num: 20,
        total: 90,
        station: "强震台站",
      },
      {
        num: 10,
        total: 100,
        station: "GNSS",
      },
      {
        num: 20,
        total: 100,
        station: "次声台站",
      },
      {
        num: 20,
        total: 100,
        station: "重力台站",
      },
      {
        num: 15,
        total: 100,
        station: "地磁台站",
      },
    ],
  }
);

const { state, closeInfo, clickSubjectbox } = useHandler(props, emit);
</script>
<style scoped lang="less">
.equipment-list {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid rgb(6, 83, 160);
  padding: 10px;

  .item-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 32%;
    height: 70px;
    // background-color: #1f6c94;
    background-color: rgba(0, 35, 63, 0.9);
    border-radius: 4px;
    // margin-right: 2%;
    // margin-top: 10px;
    margin: 5px 2% 5px 0;
    font-size: 16px;
    color: #fff;

    .num {
      color: red;
      font-weight: bold;
    }
  }

  .ismargin {
    margin-right: 0;
  }
}
</style>
