<template>
  <div class="capacity-box">11111</div>
</template>

<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "selectActive", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    legendList: any;
    legendTitle: string;
    columns: any;
    tableHeight: any;
  }>(),
  {
    legendList: {},
    labelList: [],
    legendTitle: "台站列表",
    iconName: "",
    tableHeight: "",
  }
);

const { activeIndex, selectActive, time1 } = useHandler(props, emit);
</script>
