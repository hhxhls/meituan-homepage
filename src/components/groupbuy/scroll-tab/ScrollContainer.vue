<template>
    <div class="scroll-container">
        <div class="scroll-tab-list" ref="tagList" v-affixtab="'.scroll_section'">
            <div class="tab-container">
                <a class="tab-item"
                   ref="tab"
                   v-for="(item,index) in tabList"
                  :key="index"
                  :href="`#section_${index}`"
                >{{ item }}</a>
            </div>
        </div>
        <div class="scroll-content">
          <slot></slot>
        </div>

    </div>
</template>

<script>
export default {
  props: {
    tabList: { // 导航标签数据数组
      required: true,
      type: Array,
      default: () => [],
    },
    activeIndex: { // 当前激活的标签
      type: Number,
      default: 0,
    },
  },

  mounted() {
    const children = this.$children;
    children.forEach((section, index) => {
      const temp = section;
      temp.$el.id = `section_${index}`;
    });
  },
};
</script>

<style lang="scss">
    @import '@/style/groupbuy/scroll-container.scss';
</style>
