import {
  getUserOrder,
  getUserFavor,
  getUserVoucher,
  getUserInfo,
} from '@/api/api';

const namespaced = true;
const accountState = {
  userOrder: null, // 用户订单信息
  userFavor: null, // 用户收藏信息
  userVoucher: null, // 用户优惠券信息
  userInfo: null, // 用户详细信息
};

const mutations = {
  // 设置用户订单信息
  changeUserOrder(scopeState, order) {
    const target = scopeState;
    target.userOrder = order;
  },
  // 设置用户收藏信息
  changeUserFavor(scopeState, favor) {
    const target = scopeState;
    target.userFavor = favor;
  },

  // 删除用户收藏信息
  deleteUserFavor(scopeState, type, poiid) {
    const target = scopeState;
    const favor = target.userFavor[type];
    const { list } = favor.details;
    const ret = list.some((item, index) => {
      if (item.poiid === poiid) {
        list.splice(index, 1);
        return true;
      }
      return false;
    });
    if (ret) {
      favor.details.count--;
    }
  },

  // 设置用户优惠券信息
  changeUserVoucher(scopeState, voucher) {
    const target = scopeState;
    target.userVoucher = voucher;
  },
  // 设置用户详细信息
  changeUserInfo(scopeState, info) {
    const target = scopeState;
    target.userInfo = info;
  },
};

const actions = {
  // 请求用户订单信息
  async dispatchUserOrder({ commit }) {
    const res = await getUserOrder();
    commit('changeUserOrder', res.data.data);
  },
  // 请求用户收藏信息
  async dispatchUserFavor({ commit }, params) {
    const res = await getUserFavor(params);
    commit('changeUserFavor', res.data.data);
  },
  // 请求用户优惠券信息
  async dispatchUserVoucher({ commit }) {
    const res = await getUserVoucher();
    commit('changeUserVoucher', res.data.data);
  },
  // 请求用户详细信息
  async dispatchUserInfo({ commit }) {
    const res = await getUserInfo();
    commit('changeUserInfo', res.data.data);
  },
};

export default {
  namespaced,
  state: accountState,
  mutations,
  actions,
};
