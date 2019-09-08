<template>
    <div class="category-wrap">
        <div :class="['top-tags',className]">
            <dl class="tag-list">
                <dt class="bar-item tag-title">{{title}}</dt>
                <dd :class="{'bar-item':true, 'bar-tag':true,'active':activeTag === index}"
                    v-for="(item,index) in tags"
                    :key="index"
                    @mouseenter="tagActive(index)"
                    >{{item.tab}}</dd>
            </dl>
        </div>
        <div class="bottom-container">
            <slot name="cardlist">empty</slot>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: { // 推荐栏目标题
      type: String,
      required: true,
    },
    tags: { // 推荐栏目分类标签
      type: Array,
      required: true,
    },
    className: { // 推荐栏目样式类名
      type: String,
    },
  },
  data() {
    return {
      activeTag: 0, // 当前分类标签
    };
  },
  methods: {
    tagActive(index) { // 改变当前分类标签
      this.activeTag = index;
    },
  },
};
</script>

<style lang = "scss">
  @import "@/style/common/category-bar.scss";
</style>
