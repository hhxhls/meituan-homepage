<template>
  <div class="nav-menu">
    <h3 class="title">全部分类</h3>
    <div class="menu-content" @mouseenter="showDetail = true" @mouseleave="showDetail = false">
      <ul class="menu-tab-list">
        <li class="menu-tab" v-for="(item,index) in menuList"
            :key="index" @mouseenter="activeDetail = index">
          <div class="menu-title">
            <i :class="[item.className]"></i>
            <div class="cate-list">
                <div class="cate" v-for="(i, k) in item.titles" :key="k">
                <span v-if="k > 0">&nbsp;/&nbsp;</span>
                <a href="/">{{i}}</a>
            </div>
            <span class="hot" v-if="item.hot === true">HOT</span>
            </div>
          </div>
          <span class="arrow"></span>
        </li>
      </ul>
      <div :class="{'detail-list': true,'show':showDetail}">
          <div class="detail-bar" v-for="(item,index) in detailList"
              :key="index" v-show="index === activeDetail">
            <div class="bar-content" v-for="(bar,i) in item"
              :key="i" >
              <p class="bar-title">
                <a href="/" class="title-des">{{bar.title.name}}</a>
                <a href="" class="more">更多</a>
              </p>
              <div class="tag-list">
                <a class="tag" v-for="(tag,j) in bar.tags" :key="j">{{tag.name}}</a>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { menuList, detailList } from './static-page-data';

export default {
  data() {
    return {
      menuList, // 一级标签栏内容
      detailList, // 二级标签栏内容
      showDetail: false, // 是否显示二级标签栏
      activeDetail: -1, // 激活显示的二级标签栏
    };
  },
};
</script>

<style lang = "scss">
@import "@/style/index/menu.scss";
</style>
