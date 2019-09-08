<template>
    <div class="groupbuy-detail">
        <div class="head sub-section">
            <img :src="imgUrl" alt="" class="gb-img">
             <div class="gb-summary">
                 <p class="summary-title">{{title}}</p>
                 <div class="prices">
                     <span class="current-price">
                         <span class="mark">￥</span>
                         <span class="number">{{price}}</span>
                     </span>
                     <span class="shop-price">门店价￥{{shopPrice}}</span>
                 </div>
                 <div class="btn-bar">
                     <div class="buy-now">
                         立即抢购
                     </div>
                     <div class="check-detail">
                         查看详情
                     </div>
                 </div>
             </div>
        </div>
        <div class="order-detail sub-section">
            <p class="des">本单详情</p>
            <div class="order-table">
                <div class="table-title">
                    <div class="left">套餐内容</div>
                    <div class="right">
                        <span>单价</span>
                        <span>数量/规格</span>
                        <span>小计</span>
                    </div>
                </div>
                <div class="sub-menu"
                    v-for="(item,index) in menus"
                    :key="index"
                >
                    <dt>{{item.subName}}</dt>
                    <dl>
                        <dd v-for="(i,k) in item.list"
                            :key="k">
                            <span class="dish-name">{{i.dish}}</span>
                            <div class="price-detail">
                                <span>￥{{i.price}}</span>
                                <span>{{i.number}}{{i.unit}}</span>
                                <span class="unit-count">￥{{i.number * i.price}}</span>
                            </div>
                        </dd>
                    </dl>
                </div>
                <div class="total-count">
                    <span class="total-value">价值: ￥{{shopPrice}}</span>
                    <span class="total-price">美团价<b>￥{{price}}</b></span>
                </div>
            </div>
        </div>
        <div class="buy-noti sub-section">
            <p class="des">购买须知</p>
            <div class="noti-content">
                <div class="valid-day sub">
                    <p>有效期</p>
                    <p class="des-text">{{validDay.from}} 至 {{validDay.to}} （周末、法定节假日通用）</p>
                </div>
                <div class="valid-time sub">
                    <p>使用时间</p>
                    <p class="des-text">{{validTime.from}}-{{validTime.to}}</p>
                </div>
                <div class="gb-rules sub">
                    <p>使用规则</p>
                    <p class="des-text">团购用户不可同时享受商家其他优惠 酒水饮料等问题，请致电商家
                        咨询，以商家反馈为准 如部分菜品因时令或其他不可抗因素导致无
                        法提供，商家会用等价菜品替换，具体事宜请与商家协商，不可使用包间，无需预约，消费高峰期可能需要等位，每张美团券建议4人使用，
                        商家提供免费WiFi，堂食外带均可，可免费打包</p>
                </div>
            </div>
        </div>
        <div class="photo sub-section">
            <div class="des">美团实拍</div>
             <ul class="img-list">
                 <li class="img-wrap"
                     v-for="(item,index) in actualImgs"
                     :key="index">
                    <img :src="item"
                    class="actual-img">
                </li>
             </ul>
        </div>
        <div class="check-gb-detail sub-section">
            <div class="check-detail">
                查看 {{title}} 全部详情
            </div>
        </div>
        <div
            class="closed"
            @click.stop="closeWindow"
        ></div>
    </div>
</template>

<script>
export default {
  props: {
    title: { // 团购标题
      type: String,
      required: true,
    },
    imgUrl: { // 团购封面图标
      type: String,
      required: true,
    },
    sold: { // 是否售罄
      type: Number,
      required: true,
    },
    price: { // 团购价格
      type: Number,
      required: true,
    },
    shopPrice: { // 门市价
      type: Number,
      required: true,
    },
    menus: { // 团购套餐列表
      type: Array,
      required: true,
    },
    validDay: { // 有效日期
      type: Object,
      required: true,
    },
    validTime: { // 一日内可使用团购的有效时段
      type: Object,
      required: true,
    },
    actualImgs: { // 实拍图片预览的图片数组
      type: Array,
      required: true,
    },
  },
  methods: {
    closeWindow() { // 关闭团购详情窗口
      this.$emit('closedetail');
    },
  },
};
</script>

<style lang="scss">
    @import '@/style/product/groupbuy-detail.scss';
</style>
