<template>
    <div :class="{'select-wrap': true, 'disable':disabled}"
         @click.stop="onSelecting()"
         v-selectblur ="onSelectBlur">
        <span class="current-selection">{{curSelect}}</span>
        <i class="select-arrow"></i>
        <div :class="{'select-list':true,'on-drop':dropDown}">
            <dt>{{placeholder}}</dt>
            <dl class="tag-list" >
                <dd v-for="(item,index) in list"
                    :key="index"
                    :class="{'select-tag':true,'selected':item.selected}"
                    @click.stop="onTagSelected(item.location,index)">{{item.location}}</dd>
            </dl>
        </div>
    </div>
</template>

<script>
export default {
  props: { // 选择器是否禁止选取
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: { // z选择器占位符
      type: String,
      required: true,
    },
    selectName: { // 选择器名称，作为自定义事件的参数作为选择器标识
      type: String,
      required: true,
    },
    dropDown: { // 控制选择器下拉
      type: Boolean,
      required: true,
    },
    optionList: { // 选择项目列表原始数据
      type: Array,
    },
  },
  data() {
    return {
      curSelect: '', // 选择器当前内容
      list: [], // 添加选中控制后的选择项目列表
    };
  },
  methods: {
    onSelecting() { // 用户点击选择器，触发menudrop事件，用于关闭其他下拉框，保证页面中只有一个激活的下拉框
      if (this.disabled) {
        return;
      }
      this.$emit('menudrop', this.selectName);
    },
    onSelectBlur() { // 取消选择
      this.$emit('menublur', this.selectName);
    },
    onTagSelected(value, index) { // 用户选中选项，触发selected事件
      this.curSelect = value;
      this.onSelectBlur();
      this.selectChange(index);
      this.$emit('selected', value);
    },
    mapSelect() { // 为选项列表添加控制选项
      this.list = this.optionList.map((ele) => {
        const temp = Object.assign({}, ele);
        temp.selected = false;
        return temp;
      });
    },
    selectChange(index) { // 当选项选中时，添加选项被选中的效果
      const temp = this.list;
      temp.forEach((ele, i) => {
        const obj = ele;
        obj.selected = i === index;
      });
      this.list = temp;
    },
  },

  watch: {
    optionList() { // 观测optionList，当数据请求optionList发生改变时，重新map选择列表
      this.mapSelect();
    },
  },

  created() {
    this.curSelect = this.placeholder;
  },
};
</script>

<style lang="scss">
    @import '@/style/common/select.scss';
</style>
