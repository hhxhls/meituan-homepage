<template>
  <div class="search-wrapper">
    <el-row class="search-bar">
      <div class="logo-box">
        <a href="/" class="site-link">
          <img src="/image/site-header/logo.png" alt="美团网" title="美团网" class="site-logo">
        </a>
      </div>
      <div class="right-bar">
        <div class="search-content">
          <div class="search-block">
            <input
              type="text"
              placeholder="搜索商家或地点"
              class="search-box"
              :value="searchWord"
              @focus="onSearchFocus"
              @blur="onSearchBlur"
              @input="onSearchInput($event.target.value)"
              @keyup.enter="onSearchJump"
            >
            <button class="search-button" @click="onSearchJump">
              <span></span>
            </button>
          </div>
          <div class="search-recommend" v-show="searchActive">
            <div class="without-input" v-show="searchWord === ''">
              <div class="his-list">
                <div class="his-title">
                  <h6>最近搜索</h6>
                  <span @click="clearHistorySearch">删除搜索历史</span>
                </div>
                <dl class="his-item-list">
                  <dd class="his-item" v-for="(item,index) in historySearch" :key="index">
                    <a @click.prevent="onSearchJump(null,item)">{{item}}</a>
                  </dd>
                </dl>
              </div>
              <div class="hot-search-list">
                <h6 class="hot-title">热门搜索</h6>
                <dl class="hot-item-list">
                  <dd class="hot-item" v-for="(item,index) in hotWords" :key="index">
                    <a @click.prevent="onSearchJump(null,item)">{{item}}</a>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="with-input" v-show="searchWord !== ''">
              <ul>
                <li v-for="(item,index) in searchList" :key="index">
                  <a @click.prevent="onSearchJump(null,item.name)">{{item.name}}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="hot-keyword">
            <a
              class="hot-item"
              v-for="(item,index) in hotWords"
              :key="index"
              @click.prevent="onSearchJump(null,item)"
            >{{item}}</a>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getHotSeachWords, getSearchRecommend } from '@/api/api';

export default {
  data() {
    return {
      searchActive: false, // 控制搜索下拉框是否显示
      searchWord: '', // 搜索框关键字
      searchList: [], // 搜索框下拉条目
      timer: null, // 用于搜索防抖的计时器
    };
  },
  computed: {
    ...mapState(['hotWords', 'historySearch']),
  },
  methods: {
    ...mapMutations(['clearHistorySearch', 'updateHistorySearch', 'changeHotSearchWords']),
    // 初始化搜索热词
    initHotWord() {
      getHotSeachWords().then((res) => {
        const hotWordsArr = res.data.data;
        this.changeHotSearchWords(hotWordsArr);
      });
    },
    onSearchFocus() { // 当搜索框获得焦点时，打开下拉框
      this.searchActive = true;
    },
    onSearchBlur() { // 当搜索框失去焦点时，关闭下拉框
      window.setTimeout(() => {
        this.searchActive = false;
      }, 200);
    },
    onSearchInput(value) { // 用户键入搜索关键字时，在附加防抖的前提下请求下拉框提示关键词列表
      this.searchWord = value;
      window.clearTimeout(this.timer);
      this.timer = window.setTimeout(() => {
        getSearchRecommend({ key: this.searchWord }).then((res) => {
          this.searchList = res.data.data;
        });
      }, 200);
    },
    onSearchJump(e, keyword = this.searchWord) { // 下拉框关键字选中时控制页面跳转
      if (keyword !== '') {
        this.updateHistorySearch(keyword);
        this.searchWord = keyword;
        this.$router.push({
          path: '/search',
          query: { key: keyword },
        });
      }
    },
  },

  created() {
    this.initHotWord();
  },
};
</script>

<style lang = "scss">
@import "@/style/header/search.scss";
</style>
