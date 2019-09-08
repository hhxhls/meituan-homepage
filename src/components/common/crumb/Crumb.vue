<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
        {{location}}美团
        </el-breadcrumb-item>
        <el-breadcrumb-item
        v-for="(item,index) in crumbList"
        :key="index"
        :to="{path: item.path}"
        >{{location}}{{item.text}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    crumbList: { // 页头crumb列表
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    ...mapState(['location']),
  },
};
</script>

<style lang="scss">
    @import '@/style/common/crumb.scss';
</style>
