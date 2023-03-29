import { reactive, ref, watch, computed } from "vue";
import { Emits, Props } from "./interfaces";
export const useHandler = (props: Props, emit: Emits) => {
  let lookTreen = ref(false); // 是否显示模态框
  // 显示模态框
  const showMask = () => {
    lookTreen.value = true;
  };
  // 隐藏模态框
  const hideMask = () => {
    setTimeout(() => {
      lookTreen.value = false;
      // emit('update:visible', false)
    }, 0);
  };
  watch(
    () => props.visible,
    (value) => {
      value ? showMask() : hideMask();
    },
    {
      immediate: true,
    }
  );
  const cancel = (e: MouseEvent) => {
    emit("cancel", e);
  };
  interface Tree {
    label: string;
    children?: Tree[];
  }
  const handleNodeClick = (data: Tree) => {
    console.log(data);
  };

  const data: Tree[] = [
    {
      label: "Level one 1",
      children: [
        {
          label: "Level two 1-1",
          children: [
            {
              label: "Level three 1-1-1",
            },
          ],
        },
      ],
    },
    {
      label: "Level one 2",
      children: [
        {
          label: "Level two 2-1",
          children: [
            {
              label: "Level three 2-1-1",
            },
          ],
        },
        {
          label: "Level two 2-2",
          children: [
            {
              label: "Level three 2-2-1",
            },
          ],
        },
      ],
    },
    {
      label: "Level one 3",
      children: [
        {
          label: "Level two 3-1",
          children: [
            {
              label: "Level three 3-1-1",
            },
          ],
        },
        {
          label: "Level two 3-2",
          children: [
            {
              label: "Level three 3-2-1",
            },
          ],
        },
      ],
    },
  ];

  const defaultProps = {
    children: "children",
    label: "label",
  };
  return {
    defaultProps,
    data, //树形结构数据
    handleNodeClick,
    lookTreen, //显示树形弹框
    showMask,
    hideMask,
    cancel, //箭头按钮
  };
};
