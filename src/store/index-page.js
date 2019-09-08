import {
  getIndexElegant, getIndexDiscount, getIndexMovie, getIndexZhenguo,
} from '@/api/api';

const namespaced = true;
const indexState = {
  elegant: null, // “有格调” 商铺推荐数据
  discount: null, // “狠优惠” 商铺推荐数据
  movie: null, // "猫眼电影" 商铺推荐数据
  zhenguo: null, // 推荐民宿" 商铺推荐数据
};

const mutations = {
  // 设置”有格调“ 数据
  changeElegant(scopeState, elegant) {
    const target = scopeState;
    target.elegant = elegant;
  },
  // 设置 “狠优惠” 数据
  changeDiscount(scopeState, discount) {
    const target = scopeState;
    target.discount = discount;
  },
  // 设置 “猫眼电影” 数据
  changeMovie(scopeState, movie) {
    const target = scopeState;
    target.movie = movie;
  },
  // 设置 “推荐民宿” 数据
  changeZhenguo(scopeState, zhenguo) {
    const target = scopeState;
    target.zhenguo = zhenguo;
  },

};

const actions = {
  // 请求 “有格调” 数据
  async dispatchElegant({ commit }) {
    const res = await getIndexElegant();
    commit('changeElegant', res.data.data);
  },
  // 请求 “狠优惠” 数据
  async dispatchDiscount({ commit }) {
    const res = await getIndexDiscount();
    commit('changeDiscount', res.data.data);
  },
  // 请求 “猫眼电影” 数据
  async dispatchMovie({ commit }) {
    const res = await getIndexMovie();
    commit('changeMovie', res.data.data);
  },
  // 请求 “推荐民宿” 数据
  async dispatchZhenguo({ commit }) {
    const res = await getIndexZhenguo();
    commit('changeZhenguo', res.data.data);
  },

};

export default {
  namespaced,
  state: indexState,
  mutations,
  actions,
};
