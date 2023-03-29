<template>
  <div class="card-box">
    <div class="title-box">
      <span>{{ titleName }}</span>
    </div>
    <div class="process-box">
      <div class="process-case" v-for="(item, index) in processList" :key="item">
        <div class="my-process" @click="processClick(item)">
          <div class="process-inner">{{ item.name }}</div>
        </div>
        <div class="process-stash" v-if="processList.length !== (index + 1)">
          <div class="process-dotted"></div>
          <div class="process-row"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "processClick", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    processList: any,
    titleName: string
  }>(),
  {
    processList: [],
    titleName: 'xx信息速报1'
  }
);
const { processClick } = useHandler(props, emit);
</script>
