import {
  getSearchInfo,
  getSearchFilter,
} from '@/api/api';

const namespaced = true;
const searchState = {
  searchPageList: {}, // 页面搜索结果列表数据，后台会固定的返回搜索"火锅"结果的一些数据
  searchFilters: {}, // 后台根据关键词返回的筛选tag列表
};

const mutations = {
  // 设置页面搜索结果列表
  changePageList(scopeState, pageList) {
    const target = scopeState;
    target.searchPageList = pageList;
  },
  // 设置页面过滤tag列表
  changeSearchFilter(scopeState, filters) {
    const target = scopeState;
    target.searchFilters = filters;
  },
};

const actions = {
  // 请求页面搜索结果列表
  async dispatchPageList({ commit }, params) {
    const res = await getSearchInfo(params);
    commit('changePageList', res.data.data);
  },
  // 请求页面过滤tag列表
  async dispatchSearchFilter({ commit }, keyword) {
    const res = await getSearchFilter({ keyword });
    commit('changeSearchFilter', res.data.data);
  },
};

export default {
  namespaced,
  state: searchState,
  mutations,
  actions,
};
