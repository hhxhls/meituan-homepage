import {
  getProductInfo,
  getProductComment,
  getProductNearby,
  toggleCommentLike,
} from '@/api/api';

const namespaced = true;
const searchState = {
  productInfo: {}, // 商铺详细信息
  productComment: {}, // 商铺客户评论
  productNearby: [], //  附近商铺
};

const mutations = {
  // 设置商铺详细信息
  changeProductInfo(scopeState, productInfo) {
    const target = scopeState;
    target.productInfo = productInfo;
  },
  // 设置商铺客户评论
  changeProductComment(scopeState, comment) {
    const target = scopeState;
    target.productComment = comment;
  },
  // 设置附近商铺信息
  changeProductNearby(scopeState, nearby) {
    const target = scopeState;
    target.productNearby = nearby;
  },
  // 改变页面中用户对某条评论的点赞/取消
  changeCommentLike(scopeState, res) {
    const list = scopeState.productComment.comments;
    const target = scopeState;
    if (!res.did) {
      return;
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i].did === res.did) {
        list[i].alreadyZzz = res.like;
        break;
      }
    }
    target.productComment.comments = list;
  },
};

const actions = {
  // 请求商铺信息
  async dispatchProductInfo({ commit }) {
    const res = await getProductInfo();
    commit('changeProductInfo', res.data.data);
  },
  // 请求商铺客户评论
  async dispatchProductComment({ commit }, params) {
    const res = await getProductComment(params);
    commit('changeProductComment', res.data.data);
  },
  // 请求附近商铺信息
  async dispatchProductNearby({ commit }) {
    const res = await getProductNearby();
    commit('changeProductNearby', res.data.data);
  },
  // 发送对某条评论的点赞/取消信息，并返回后台的确认信息
  async dispatchCommentLikeToggle({ commit }, params) {
    const res = await toggleCommentLike(params);
    commit('changeCommentLike', res.data.data);
  },
};

export default {
  namespaced,
  state: searchState,
  mutations,
  actions,
};
