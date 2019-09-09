import Vue from 'vue';
import Vuex from 'vuex';
import { setDataStorage, getDataStorage } from '@/utils/util';
import { getHotNav, getUserLike, getUserBrief } from '@/api/api';
import index from './index-page';
import changeCity from './change-city';
import search from './search-page';
import product from './product-page';
import groupbuy from './groupbuy-page';
import account from './account-page';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    location: '', // 当前城市
    nearby: [], //  当前附近城市信息，此样例中会固定的返回三个附近地点作为示例
    username: null, // 用户名
    userBrief: null, // 用户简要信息
    hotWords: [], // 搜索热词
    historySearch: [], // 搜索历史记录
    historyCity: [], // 切换城市历史记录
    hotNav: { // 热门导航栏目
      title: '',
      tags: [
      ],
      details: [],
    },
    userLike: { // 用户偏好推荐门店信息
      title: '',
      tags: [
      ],
      details: [],
    },
  },
  mutations: {
    // 改变当前城市
    changeLocation(state, city) {
      this.state.location = city;
    },
    // 改变附近城市信息
    changeNearby(state, nearby) {
      this.state.nearby = nearby;
    },
    // 设置用户名信息
    changeUsername(state, username) {
      this.state.username = username;
    },
    // 设置用户简要信息
    changeUserBrief(state, userBrief) {
      this.state.userBrief = userBrief;
    },
    // 修改
    changeHotSearchWords(state, hotWords) {
      this.state.hotWords = hotWords;
    },
    // 清空搜索历史记录
    clearHistorySearch() {
      this.state.historySearch = [];
      setDataStorage('historySearch', []);
    },
    setHistorySearch(state, arr) {
      this.state.historySearch = arr;
      setDataStorage('historySearch', arr);
    },
    updateHistorySearch(state, keyword) {
      // 更新缓存中的历史搜索记录
      const currentHistory = Array.from(getDataStorage('historySearch'));
      if (!currentHistory.includes(keyword)) {
        if (currentHistory.length >= 10) {
          currentHistory.splice(currentHistory.length - 9, currentHistory.length);
        } // 如果现有记录大于10条截取后9条,然后更新现有的那一条
        currentHistory.push(keyword);
        this.commit('setHistorySearch', currentHistory);
      }
    },
    // 设置历史切换城市记录
    setHistoryCity(state, arr) {
      this.state.historyCity = arr;
      setDataStorage('historyCity', arr);
    },

    // 更新历史切换城市记录
    updateHistoryCity(state, keyword) {
      const currentHistory = Array.from(getDataStorage('historyCity'));
      if (!currentHistory.includes(keyword)) {
        if (currentHistory.length >= 10) {
          currentHistory.splice(currentHistory.length - 9, currentHistory.length);
        }
        currentHistory.push(keyword);
        this.commit('setHistoryCity', currentHistory);
      }
    },
    // 设置热词导航栏
    changeHotNav(state, hotNav) {
      this.state.hotNav = hotNav;
    },
    // 设置“猜你喜欢”用户推荐栏目
    changeUserLike(state, userLike) {
      this.state.userLike = userLike;
    },
  },
  actions: {
    // 请求用户概要信息
    async dispatchUserBrief({ commit }) {
      const res = await getUserBrief();
      commit('changeUserBrief', res.data.data);
    },

    // 请求热点导航信息
    async dispatchHotNav({ commit }) {
      const res = await getHotNav();
      commit('changeHotNav', res.data.data);
    },
    // 请求“猜你喜欢”用户推荐栏目
    async dispatchUserLike({ commit }) {
      const res = await getUserLike();
      commit('changeUserLike', res.data.data);
    },
  },
  modules: {
    index,
    changeCity,
    search,
    product,
    groupbuy,
    account,
  },
});

export default store;
