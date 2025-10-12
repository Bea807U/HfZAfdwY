// 代码生成时间: 2025-10-13 00:00:34
import { defineComponent, ref, computed } from 'vue';

// ColorPickerComponent 组件定义
export default defineComponent({
  name: 'ColorPickerComponent',
  props: {
    // 颜色值，支持 hex 和 rgba 格式
    value: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    // 内部状态，存储当前选择的颜色值
    const selectedColor = ref(props.value);
    
    // 计算属性，确保颜色格式正确
    const isValidColor = computed(() => /(^#[0-9A-F]{6}$)|(^rgb\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*\)$)/i.test(selectedColor.value));
    
    // 颜色选择事件处理函数
    const onColorSelected = (color: string) => {
      if (!isValidColor.value) {
        // 如果颜色格式不正确，抛出错误
        console.error('Invalid color format');
        return;
      }
      // 更新内部状态
      selectedColor.value = color;
      // 触发事件，通知父组件颜色变化
      emit('update:value', color);
    };
    
    return {
      selectedColor,
      onColorSelected,
      isValidColor
    };
  }
});
</script>

<template>
  <!-- 颜色选择器组件模板 -->
  <div class="color-picker">
    <!-- 颜色显示区域 -->
    <div class="color-display" :style="{ backgroundColor: selectedColor }"></div>
    <!-- 颜色选择器控件，可以是任何颜色选择器组件，如第三方库 -->
    <color-picker-control @color-selected="onColorSelected" :color="selectedColor"></color-picker-control>
  </div>
</template>

<style>
/* 组件样式 */
.color-picker {
  display: flex;
  align-items: center;
}
.color-display {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
</style>

<!-- 组件文档 -->
<docs>
# ColorPickerComponent
颜色选择器组件，允许用户选择颜色并通过事件传递所选颜色。

## Props
- `value`: 字符串，当前颜色值，支持 hex 和 rgba 格式。

## Events
- `update:value`: 当选择的颜色发生变化时触发，传递新的颜色值。

## Slots
- 无

## Methods
- 无
</docs>