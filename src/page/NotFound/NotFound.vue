<template>
    <div class="not-found">
      <img src="/image/not-found/not-found.png" alt="" class="not-found-img">
      <p class="title">抱歉，页面暂时无法访问...</p>
      <p class="msg">错误信息:服务器找不到请求的网页</p>
      <router-link :to="{name:'index'}" class="back-to-index">返回美团首页
      </router-link>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
  @import "@/style/not-found/not-found.scss";
</style>
