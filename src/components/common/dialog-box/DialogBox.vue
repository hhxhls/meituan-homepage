<template>
    <div class="dialog-box">
        <div class="dialog-head">
            <span class="title">{{title}}</span>
            <span class="close" @click="dialogClose"></span>
        </div>
         <div class="dialog-body">
             <slot></slot>
         </div>
          <div class="btn-chooses">
             <button class="confirm" @click="dialogConfirm">{{confirmText}}</button>
             <button class="cancel" @click="dialogCancel">{{cancelText}}</button>
          </div>
    </div>
</template>

<script>
export default {
  props: {
    title: { // 会话窗口标题
      type: String,
    },
    confirmText: { // 确认按钮文字
      type: String,
      default: '确认',
    },
    cancelText: { // 取消按钮文字
      type: String,
      default: '取消',
    },
  },

  methods: {
    // 会话窗关闭事件
    dialogClose() {
      this.$emit('dialogclose');
    },
    // 会话窗确认事件
    dialogConfirm() {
      this.$emit('dialogconfirm');
    },
    // 会话窗取消事件
    dialogCancel() {
      this.$emit('dialogcancel');
    },
  },
};
</script>

<style lang="scss">
  @import '@/style/common/dialog-box.scss';
</style>
