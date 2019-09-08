<template>
    <div class="scroll_section" ref="scroll_section">
        <p class="scroll_title" v-if="title!== ''">{{title}}</p>
        <div class="cotent-wrap">
            <slot class="scroll-content"></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: { // 滚动切换导航栏目的对应主体标题
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss">
    @import '@/style/groupbuy/scoll-section.scss';
</style>
