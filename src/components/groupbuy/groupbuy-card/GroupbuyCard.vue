<template>
    <div class="groupbuy-card">
        <div class="image-box">
            <img :src="titleImgUrl" alt="" class="gb-img">
        </div>
         <div class="detail-box">
             <h4 class="title">{{productName}}</h4>
             <p class="sub-title">
                 仅售{{gbPrice}}元！最高价值{{value}}元的{{menuName}}，
                 <span v-for="(item,index) in mappingServices"
                        :key="index">{{item}}</span>
            </p>
            <div class="price-related">
                <div class="left">
                    <span class="line-title">团购价</span>
                    <span class="current-price">
                        <em class="mark">¥</em>
                        <span class="number">{{gbPrice}}</span>
                    </span>
                    <span class="shop-price">最高门店价¥{{value}}</span>
                    <span class="discount">{{discount}}折</span>
                </div>
                <div class="right sold">
                    已售{{sold}}
                </div>
            </div>
            <dl class="packages">
                <dt class="line-title">套餐</dt>
                 <dl>
                    <dd v-for="(item,index) in otherMenus"
                    :key="index"
                     class="package-tag"
                    :class="{'chosen':currentGroupbuy === item.gid}"
                    @click="shiftGroupbuy(item.gid)"
                    >
                     {{ item.type === 'package' ? `${item.price}元${item.headCount}人餐`:
                                 `${item.price}代${item.value}元券` }}</dd>
                 </dl>
            </dl>
            <p class="order-num">
                <span class="line-title">数量</span>
                <span class="counter">
                  <button class="change-buy-number left"
                          :class="{disabled:orderNumber <= 1}"
                          @click="reduceOrderNumber"
                  >-</button>
                  <input type="text"
                         class="order-number"
                         :value="orderNumber"
                         @input="inputOrderNumber"
                  >
                  <button class="change-buy-number right"
                          :class="{disabled:orderNumber >= chooseLimit}"
                          @click="addOrderNumber"
                  >+</button>
                </span>
            </p>
            <p class="valid-days">
                <span class="line-title">有效期</span>
                <span class="period">{{validDays.from}}-{{validDays.to}}</span>
            </p>
            <p class="btn-line">
                <span class="buy-now">立刻抢购</span>
            </p>
            <p class="gurantee">
                <span class="line-title">服务承诺</span>
                <span class="tags">
                    <span v-for="(item,index) in gurantee"
                          :key="index">
                            {{item}}
                            <i v-if="index !== gurantee.length - 1">|</i>
                          </span>
                </span>
            </p>
         </div>
    </div>
</template>

<script>
import utils from './utils';

export default {
  props: {
    gid: { // 团购id
      type: Number,
      required: true,
    },
    titleImgUrl: { // 团购预览
      type: String,
      required: true,
    },
    chooseLimit: { // 购买限额
      type: Number,
      required: true,
    },
    productName: { // 团购的产品名
      type: String,
      required: true,
    },
    menuName: { // 套餐名
      type: String,
      required: true,
    },
    services: { // 提供的服务
      type: Object,
      required: true,
    },
    gbPrice: { // 团购价格
      type: Number,
      required: true,
    },
    value: { // 团购产品的价值
      type: Number,
      required: true,
    },
    sold: { // 是否售罄
      type: Number,
      required: true,
    },
    otherMenus: { // 本商铺的其他套餐列表
      type: Array,
      required: true,
    },
    validDays: { // 团购优惠有效期
      type: Object,
      required: true,
    },
    gurantee: { // 服务承诺列表
      type: Array,
      required: true,
    },

  },
  data() {
    return {
      orderNumber: 1, // 套餐购买数量
      currentGroupbuy: 0, // 当前套餐标签
    };
  },
  computed: {
    discount() { // 计算后的折扣
      return Math.ceil(this.gbPrice / this.value * 100) / 10;
    },
    mappingServices() { // 将提供的服务转换成字符串数列
      const arr = [];
      const { services } = this;
      const propArr = Object.keys(services);
      propArr.forEach((ele) => {
        if (services[ele]) {
          arr.push(utils.serviceMap[ele]);
        }
      });
      arr[arr.length - 1] = arr[arr.length - 1].replace('，', '。');
      return arr;
    },
  },
  methods: {
    shiftGroupbuy(gid) { // 改变套餐标签
      this.currentGroupbuy = gid;
    },
    addOrderNumber() { // 增加套餐购买数量
      if (this.orderNumber < this.chooseLimit) {
        this.orderNumber++;
      }
    },
    reduceOrderNumber() { // 减少套餐购买数量
      if (this.orderNumber > 1) {
        this.orderNumber--;
      }
    },
    inputOrderNumber(e) { // 对用户输入的套餐购买数量进行数据有效性限制
      const { value } = e.target;
      const currentNum = this.orderNumber;
      const num = Number(value);
      if (Number.isNaN(num) || value === '') {
        e.target.value = currentNum;
      } else if (num >= 1 && num <= this.chooseLimit) {
        this.orderNumber = num;
      } else if (num < 1) {
        this.orderNumber = 1;
      } else if (num > this.chooseLimit) {
        this.orderNumber = this.chooseLimit;
      }
    },
  },
  created() {
    this.currentGroupbuy = this.gid;
  },
};
</script>

<style lang="scss">
    @import '@/style/groupbuy/groupbuy-card.scss';
</style>
