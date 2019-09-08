import {
  getGroupbuyInfo,
  getGroupbuyComment,
} from '@/api/api';

const namespaced = true;
const searchState = {
  groupbuyInfo: null, // 团购套餐详细信息
  groupbuyComment: null, // 团购客户评论信息
};

const mutations = {
  // 设置团购套餐详细信息
  changeGroupbuyInfo(scopeState, groupbuyInfo) {
    const target = scopeState;
    target.groupbuyInfo = groupbuyInfo;
  },
  // 设置团购客户评论信息
  changeGroupbuyComment(scopeState, comment) {
    const target = scopeState;
    target.groupbuyComment = comment;
  },
};

const actions = {
  // 请求团购套餐详细信息
  async dispatchGroupbuyInfo({ commit }) {
    const res = await getGroupbuyInfo();
    console.log(res);
    commit('changeGroupbuyInfo', res.data.data);
  },
  // 请求团购套餐详评论信息
  async dispatchGroupbuyComment({ commit }, params) {
    const res = await getGroupbuyComment(params);
    commit('changeGroupbuyComment', res.data.data);
  },
};

export default {
  namespaced,
  state: searchState,
  mutations,
  actions,
};
