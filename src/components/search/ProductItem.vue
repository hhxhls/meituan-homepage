<template>
    <div class="product-item-wrap">
        <div class="product-item">
            <router-link class="img-box" :to="{name:'product',params:{id:id}}">
                <span class="product-rank">{{rank}}</span>
                <img :src="imageUrl" alt="" class="product-img">
            </router-link>
            <div class="info-box">
                <div :class="{'basic-des':true, 'with-deal':(deals && deals.length > 0)}">
                    <router-link class="title"
                                 :to="{name:'product',params:{id:id}}">{{title}}</router-link>
                    <div class="rate-block">
                        <el-rate
                            v-model="avgscore"
                            :colors="['#FF9900','#FF9900','#FF9900']"
                            disabled
                            class="rate-items"
                        ></el-rate>
                        <span  class="rate-items">{{ comment }}</span>
                        <span  class="rate-items">{{ avgscore }}分</span>
                        <span  class="rate-items comments">{{ comments }}人评论</span>
                    </div>
                    <p class="sub-title">
                        <span class="area">
                            <span>{{backCateName}}</span>|<span>{{areaname}}</span>
                        </span>
                        <span class="address">{{address}}</span>
                    </p>
                    <p class="price">
                        <span>人均￥{{Math.round(avgprice)}}</span>
                    </p>
                </div>
                <ul class="deal-container">
                    <li class="dicount-item"
                        v-for="(item,index) in deals"
                        :key="index">
                        <a class="deal-link" :href="`/groupbuy/d${item.id}`"
                           v-show="dealDroped || index < 2">
                            <p class="title">{{item.title}}</p>
                            <p class="deal-info">
                                <span class="price">￥{{Math.round(item.price)}}</span>
                                <span class="old-price">￥{{Math.round(item.value)}}</span>
                                <span class="sold">已售{{Math.round(item.sales)}}</span>
                            </p>
                        </a>
                    </li>
                    <li v-if="deals && deals.length > 2"
                        class="add-toggle"
                        @click="dealDroped = !dealDroped">
                        <span class="before-drop drop-ctrl"
                             v-show="!dealDroped"
                             >更多{{deals.length - 2}}个优惠</span>
                        <span class="after-drop drop-ctrl"
                             v-show="dealDroped"
                             >收起</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    id: { // 商铺id
      type: Number,
      required: true,
    },
    imageUrl: { // 商铺展示图片
      type: String,
      required: true,
    },
    title: { // 商铺名
      type: String,
      required: true,
    },
    avgscore: { // 客户评分
      type: Number,
      required: true,
      validator(value) {
        return value >= 0 && value <= 5;
      },
    },
    comments: { // 评论个数
      type: Number,
    },
    backCateName: { // 商铺类别名
      type: String,
    },
    areaname: { // 区域名
      type: String,
    },
    address: { // 商铺地址
      type: String,
    },
    avgprice: { // 人均消费
      type: Number,
      required: true,
    },
    deals: { // 商品套餐数组
      type: Array,
    },
    rank: { // 产品搜索序列号
      type: Number,
    },
  },
  computed: {
    comment() { // 客户评分描述文字
      let text;
      const score = this.avgscore;
      if (score <= 1) {
        text = '极差';
      } else if (score <= 2) {
        text = '失望';
      } else if (score <= 3) {
        text = '一般';
      } else if (score <= 4) {
        text = '不错';
      } else if (score <= 4.5) {
        text = '好';
      } else {
        text = '很好';
      }
      return text;
    },
  },
  data() {
    return {
      dealDroped: false, // 是否加载详细的套餐列表
    };
  },
};
</script>

<style lang="scss">
    @import '@/style/search/product-item.scss';
</style>
