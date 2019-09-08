<template>
    <el-container class="index-page">
        <el-header class="header" height="auto">
            <c-header/>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>
            <c-footer/>
        </el-footer>
    </el-container>
</template>

<script>
import CHeader from '@/components/common/header/Header.vue';
import CFooter from '@/components/common/footer/Footer.vue';

export default {
  components: {
    CHeader,
    CFooter,
  },
};
</script>

<style lang = "scss">
.index-page{
  background-color: #f8f8f8;
}
  .header{
    padding: 0;
  }
  .el-main{
    overflow: visible;
    padding: 0;
  }
</style>
