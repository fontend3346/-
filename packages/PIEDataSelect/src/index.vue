<template>
  <div class="select-box">
    <div class="title-box">
      <div class="title-trape"></div>
      <span class="title-text">{{ titleName }}</span>
    </div>
    <div class="selected-box">
      <el-radio-group
        class="selected-inner"
        v-model="props.selectValue"
        @change="changeValue"
      >
        <template v-for="item in selectDataListInner" :key="item">
          <div class="icon-box-response selected-inner">
            <el-radio :label="item.value" size="large">{{
              item.label
            }}</el-radio>
          </div>
        </template>
      </el-radio-group>

      <!-- <el-row :gutter="20">
        <el-radio-group class="selected-inner" v-model="selectValue">
          <el-col :span="8" v-for="item in selectDataList" :key="item">
            <el-radio :label="item.value" size="large">{{ item.label }}</el-radio>
          </el-col>
        </el-radio-group>
      </el-row> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "change", e: MouseEvent): void;
  (event: "changeValue", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    selectValue: any;
    titleName: string;
    selectDataListInner: any;
    showSelect?: boolean;
  }>(),
  {
    selectValue: 1,
    titleName: "",
    selectDataListInner: [],
    showSelect: true,
  }
);

const { changeValue } = useHandler(props, emit);
</script>
