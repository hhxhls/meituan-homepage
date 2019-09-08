<template>
    <div class="product">
        <section class="page-crumbs">
            <c-crumb
                :crumb-list="[
                {text:'美食',path:'/'},
                {text:'火锅',path:'/search?key=火锅'},
                ]"
                class="crumb"
            ></c-crumb>
        </section>
        <section class="product-info-card">
            <c-product-card
                :brand-name="productInfo.brandName"
                :score="productInfo.score"
                :avg-prove="productInfo.avgPrice"
                :address="productInfo.address"
                :tel="productInfo.tel"
                :open-time="productInfo.openTime"
                :tags="productInfo.tags"
                :cover-img="productInfo.coverImg"
                :swiper-imgs="productInfo.swiperImgs"
            ></c-product-card>
        </section>
        <section class="product-info">
          <main class="main-info">
            <div class="discounts">
                <p class="title">商家团购及优惠</p>
                <div class="logged" v-if="username">
                  <dl class="groupbuy-list">
                    <dt class="sub-title">
                      {{productInfo.groupBuys && productInfo.groupBuys.length}}款堂食套餐</dt>
                    <dd
                      v-for="(item,index) in productInfo.groupBuys"
                      :key="index"
                      class="detail-wrap"
                      @click="openDetailWindow(index)"
                    >
                      <div class="gb-detail">
                        <div class="img-box">
                          <img :src="item.imgUrl" alt="" class="gb-img">
                        </div>
                        <div class="detail-info">
                          <p class="gb-title">{{item.title}}
                            <i class="gb-icon"></i>
                          </p>
                          <p class="sold">已售{{item.sold}}</p>
                          <p class="price-info">
                              <span class="current">
                                  <span class="mark">￥</span>
                                  <span class="current-price">{{item.price}}</span>
                              </span>
                            <span class="shop">
                                 门市价￥{{item.shopPrice}}
                               </span>
                          </p>
                        </div>
                      </div>
                      <div class="buy-now">立即抢购</div>
                    </dd>
                  </dl>
                  <dl class="voucher-list">
                    <dt class="sub-title">
                      {{productInfo.vouchers && productInfo.vouchers.length}}张代金券</dt>
                    <dd
                      v-for="(item,index) in productInfo.vouchers"
                      :key="index"
                      class="detail-wrap">
                      <div class="vt-detail">
                        <div class="vt-img">
                          <div class="vt-price">
                            <span class="mark">￥</span>
                            <span class="price">{{item.price}}</span>
                          </div>
                          <div class="vt-value">
                            代{{item.value}}元代金券
                          </div>
                        </div>
                        <div class="detail-info">
                          <p class="detail-title">
                            {{item.price}}元 代{{item.value}}元代金券
                          </p>
                          <p class="sold">已售{{item.sold}}</p>
                        </div>
                      </div>
                      <div class="buy-now">立即抢购</div>
                    </dd>
                  </dl>
                  <div class="gb-detail-window"
                       :class="{'open':groupbuyShow}">
                    <div class="content-wrap">
                      <c-groupbuy-detail
                        @closedetail="closeDetailWindow"
                        v-bind="currentGroupbuy"
                      ></c-groupbuy-detail>
                    </div>
                  </div>
                </div>
                <div class="no-log" v-else>
                  <img src="/image/product/no-log-voucher.png" alt="" class="no-log-img">
                    <p class="des">请登录后查看详细团购优惠</p>
                    <router-link :to="{name:'login'}" class="login">立即登录</router-link>
                </div>
            </div>
            <div class="recommend-dish">
              <p class="title">推荐菜</p>
               <div class="recommend-detail">
                  <ul class="dish-img-list" v-if="productInfo.recommend">
                    <li
                      class="dish-img-item"
                      v-for="(item,index) in productInfo.recommend.displayDish"
                      :key="index">
                        <img :src="item.imgUrl ||
                              '/image/product/default-dish.png'" class="dish-img" alt="">
                        <div class="dish-des">
                          {{item.name}} {{item.price? `￥${item.price}`:''}}
                        </div>
                    </li>
                </ul>
                  <ul class="other-dish" v-if="productInfo.recommend">
                      <li
                      v-for="(item,index) in productInfo.recommend.otherDish"
                      :key="index">{{item}}</li>
                  </ul>
               </div>
            </div>
            <c-comment-box
              :comment-list="productComment"
              @querycomment="commentChange"
            ></c-comment-box>
          </main>
           <aside class="recommends">
            <div class="recommend-wrap">
              <p class="title">猜你喜欢</p>
              <div class="recommend-list">
                <c-display-card
                  v-for="(item,index) in userLike.details"
                  :key="index"
                  v-bind="item"
                  :itemLink="`/product/${item.itemId}`"
                  width="100%"
                  :subTitle="item.areaName"
                  :currentPrice="item.lowPrice"
                  priceDesc="起"
                ></c-display-card>
              </div>
            </div>
           </aside>
        </section>
        <section class="nearby-shops">
            <p class="title">附近商家</p>
            <div class="nearby-wrap">
              <c-display-card
                  v-for="(item,index) in productNearby"
                  :key="index"
                  :itemLink="`/product/${item.id}`"
                  :imgLink="item.headIcon"
                  :title ="item.name"
                  width="20%"
                  :subTitle="`${item.score}分   ${item.sold}人消费`"
                  :currentPrice="item.lowestPrice"
                  priceDesc="起"
                ></c-display-card>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getDate } from '@/utils/util';
import CCrumb from '@/components/common/crumb/Crumb.vue';
import CProductCard from '@/components/product/ProductCard.vue';
import CGroupbuyDetail from '@/components/product/GroupbuyDetail.vue';
import CDisplayCard from '@/components/common/display-card/DisplayCard.vue';
import CCommentBox from '@/components/common/comment-box/CommentBox.vue';

export default {
  data() {
    return {
      groupbuyShow: false, // 显示团购弹窗
      commentOrder: 'default', // 客户评论排序
      imageCommentOnly: false, // 筛选带图片的评论
      currentGroupbuy: {
        imgUrl: '',
        title: '',
        sold: 0,
        price: 0,
        shopPrice: 0,
        menus: [],
        validDay: {
          from: '',
          to: '',
        },
        validTime: {
          from: '',
          to: '',
        },
        actualImgs: [],
      }, // 当前选中的团购信息
    };
  },
  components: {
    CCrumb,
    CProductCard,
    CGroupbuyDetail,
    CDisplayCard,
    CCommentBox,
  },
  computed: {
    ...mapState('product', ['productInfo', 'productComment', 'productNearby']),
    ...mapState(['userLike', 'username']),
  },
  methods: {
    ...mapActions(['dispatchUserLike']),
    ...mapActions('product', ['dispatchProductInfo', 'dispatchProductComment', 'dispatchProductNearby']),
    getDate,
    openDetailWindow(index) { // 开启团购详情页面
      this.groupbuyShow = true;
      this.currentGroupbuy = this.productInfo.groupBuys[index];
    },
    closeDetailWindow() { // 关闭团购详情页面
      this.groupbuyShow = false;
    },
    commentChange({ // 根据筛选结果获得评论信息
      page, sort, imgOnly, tag,
    }) {
      this.dispatchProductComment({
        page,
        sort,
        imgOnly,
        tag,
      });
    },
  },
  created() {
    this.dispatchProductInfo();
    this.dispatchProductComment({ page: 1 });
    this.dispatchProductNearby();
    this.dispatchProductInfo();
    this.dispatchUserLike();
  },
};
</script>

<style lang="scss">
    @import '@/style/product/product.scss';
</style>
