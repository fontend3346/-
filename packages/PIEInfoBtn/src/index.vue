<template>
  <!-- 信息图标 -->
  <div class="param-style">
    <div class="param-info" v-for="(item, index) in paramsList" :key="index">
      <div class="img">
        <img :src="item.src" alt="" />
      </div>
      <div class="title" @click="clickFont(item.title)">{{ item.title }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "clickFont", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    paramsList: any;
  }>(),
  {
    paramsList: [],
  }
);
const { state, clickFont } = useHandler(props, emit);
</script>
