import {
  getProvinceList, getCityList, getCityAlphabet, getHotCity, getCitySuggestion,
} from '@/api/api';

const namespaced = true;
const changeCityState = {
  provinceList: [], // 省份列表
  cityLists: [], // 城市列表，因为美团并不是每一座城市/区域都进驻了外卖分店，而且不能拿到后台数据，所以后台固定会返回山东省的数据
  cityAlphabet: {
  }, //  按字母表顺序排列的城市列表
  hotCity: [], // 当前热门搜索城市
  citySuggestion: [], // 城市搜索框搜索提示，返回的后台数据会固定返回搜索关键字"北"的提示信息
};

const mutations = {
  // 设置省份列表
  changeProvinceList(scopeState, list) {
    const target = scopeState;
    target.provinceList = list;
  },
  // 设置和改变城市列表
  changeCityList(scopeState, list) {
    const target = scopeState;
    target.cityLists = list;
  },
  // 设置按字母排序的城市列表
  changeCityAlphabet(scopeState, alphabet) {
    const target = scopeState;
    target.cityAlphabet = alphabet;
  },
  // 设置当前热门搜索城市
  changeHotCity(scopeState, list) {
    const target = scopeState;
    target.hotCity = list;
  },
  // 改变城市搜索框的提示信息
  changeCitySuggestion(scopeState, list) {
    const target = scopeState;
    target.citySuggestion = list;
  },
};

const actions = {
  // 请求省份列表
  async dispatchProvinceList({ commit }) {
    const res = await getProvinceList();
    commit('changeProvinceList', res.data.data);
  },
  // 请求城市列表
  async dispatchCityList({ commit }, params) {
    const res = await getCityList(params);
    commit('changeCityList', res.data.data);
  },
  // 请求按字母排序的城市列表
  async dispatchCityAlphabet({ commit }) {
    const res = await getCityAlphabet();
    commit('changeCityAlphabet', res.data.data);
  },
  // 请求当前热门搜索城市
  async dispatchHotCity({ commit }) {
    const res = await getHotCity();
    commit('changeHotCity', res.data.data);
  },
  // 请求城市搜索框的提示信息
  async dispatchCitySuggestion({ commit }, params) {
    const res = await getCitySuggestion(params);
    commit('changeCitySuggestion', res.data.data);
  },
};

export default {
  namespaced,
  state: changeCityState,
  mutations,
  actions,
};
