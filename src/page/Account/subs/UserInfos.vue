<template>
  <div class="user-info">
    <div class="user-card">
      <div class="infos">
        <div class="info-box">
          <div class="avatar-box">
            <router-link :to="{name:'settings'}" class="avatar-link">
              <img :src="userInfo.avatarUrl" alt class="avatar-img" />
            </router-link>
          </div>
          <div class="info-brief">
            <a href class="setting-link">
                {{userInfo.nickName}}
            </a>
            <p class="account-value">
              <span class="des">我的余额: </span>
              <span class="value"> ￥{{userInfo.growthValue}}</span>
              <span class="dot">  ·   </span>
              <a href class="value-charge">充值卡充值</a>
            </p>
          </div>
        </div>
        <a href class="to-setting">个人信息设置 ></a>
      </div>
      <div class="fn-box">
          <ul class="fn-list">
              <li class="fn-item"
                 v-for="(item,index) in iconList"
                 :key="index">
                    <a  @click.prevent="toOrders(index)">
                        <i :class="[item.icon]"></i>
                        <span>{{item.des}}</span>
                    </a>
                 </li>
          </ul>
      </div>
    </div>
    <div class="like-box">
        <p class="like-titles">
            <span class="title">猜你喜欢</span>
            <span class="sub-title">为您甄选最合适的</span>
        </p>
        <ul class="like-item-list">
            <li class="like-item">
                <c-display-card
                v-for="(item,index) in userLike.details"
                :key="index"
                v-bind="item"
                :itemLink="`/product/${item.itemId}`"
                width="25%"
                :rateText="`${item.commentNum}个评价`"
                :rateScore="Number(item.score)"
                :subTitle="item.areaName"
                :currentPrice="item.lowPrice"
                priceDesc="起"
                :hoverEffect="true"
              ></c-display-card>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import CDisplayCard from '@/components/common/display-card/DisplayCard.vue';
import { mapState, mapActions } from 'vuex';


export default {
  components: {
    CDisplayCard,
  },
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      iconList: [
        {
          des: '全部订单',
          icon: 'orders',
        },
        {
          des: '待付款',
          icon: 'waitingpay',
        },
        {
          des: '待使用',
          icon: 'unused',
        },
        {
          des: '待评论',
          icon: 'comment',
        },
        {
          des: '退款/售后',
          icon: 'refund',
        },
      ],
    };
  },
  computed: {
    ...mapState(['userLike']),
  },
  methods: {
    ...mapActions(['dispatchUserLike']),
    // 根据点击的icon判断进入order页面的status，并进入页面
    toOrders(status) {
      this.$router.push({
        name: 'userorders',
        params: {
          status,
        },
      });
    },
  },
  created() {
    this.dispatchUserLike();
  },
};
</script>

<style lang="scss">
  @import '@/style/account/user-infos.scss';
</style>
