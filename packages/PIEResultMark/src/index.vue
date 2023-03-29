<template>
  <PIEModal
    :title="state.title"
    v-model:visible="props.isShow"
    width="30"
    height="50"
    @cancel="cancel"
    @confirm="modifyConfirm(modifyData)"
  ></PIEModal>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useHandler } from "./hooks";
const emit = defineEmits<{
  (event: "cancel"): void;
}>();

const props = withDefaults(
  defineProps<{
    isShow: any;
  }>(),
  {
    isShow: false,
  }
);
const modalRef = ref(null);
defineExpose({ modalRef });
const { state, cancel } = useHandler(props, emit);
</script>
<style lang="less" scoped>
@import "./PIEResultMark.less";
</style>
