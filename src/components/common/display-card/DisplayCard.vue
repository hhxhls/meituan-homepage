<template>
    <a :href="itemLink"
        :class="{'display-card-wrap':true,'with-hover':hoverEffect}"
        :style="{width:width,height:height}">
        <div class="img-cover">
            <img :src="imgLink" class="title-img" :style="{width:imgWidth}"/>
        </div>
        <h4 class="title">{{title}}</h4>
        <div class="des">
            <div class="rating" v-if="rateScore">
                <el-rate v-if="rateScore"
                        v-model="rateScore"
                        :colors="['#FF9900','#FF9900','#FF9900']"
                        disabled
                        ></el-rate>
                <span class="comments">{{rateText}}</span>
            </div>
            <span class="sub-title">{{subTitle}}</span>
        </div>
        <div class="tags" v-if="tags">
            <span class="tag-item"
                  v-for="(item,index) in tags"
                  :key="index"
                  :style="{color:item.color}"
                >{{item.tag}}</span>
        </div>
        <div class="bottom-info">
            <div class="left" :class="[priceStyle]">
                 <span class="price-mark">￥</span>
                 <span class="price">{{soldout === true ?'抢光了':currentPrice}}</span>
                 <span v-if="priceDesc" class="price-type">{{priceDesc}}</span>
                 <span class="old-price" v-if="oldPrice">{{oldPrice}}</span>
            </div>
            <div class="right">
                <span class="bottom-des" v-if="bottomInfo">{{bottomInfo}}</span>
            </div>
        </div>
        <img :src="hostAvatarUrl" alt="" class="head-img"  v-if="hostAvatarUrl">
    </a>
</template>

<script>
export default {
  props: {
    height: { // 卡片高度
      type: String,
      default: '',
    },
    width: { // 卡片宽度
      type: String,
      default: '',
    },
    imgWidth: { // 卡片图片宽度
      type: String,
      default: '',
    },
    itemLink: { // 卡片链接地址
      type: String,
      required: true,
    },
    imgLink: { // 图片链接地址
      type: String,
      required: true,
    },
    title: { // 卡片标题
      type: String,
      required: true,
    },
    hostAvatarUrl: { // 民宿店主的美团头像
      type: String,
      default: '',
    },
    rateScore: { // 卡片项目的用户评分
      type: Number,
      validator(value) {
        return value >= 0 && value <= 5;
      },
    },
    rateText: { // 用户评分的文字说明
      type: String,
    },
    subTitle: { // 卡片副标题或说明
      type: String,
    },
    tags: { // 卡片tag说明
      type: Array,
    },
    currentPrice: { // 折扣后价格
      type: [String, Number],
      required: true,
    },
    oldPrice: { // 折扣前价格
      type: String,
    },
    priceDesc: { // 价格描述文字
      type: String,
    },
    bottomInfo: { // 卡片底部附加信息
      type: String,
    },
    soldout: { // 卡片中的商品是否已销售完
      type: Boolean,
      default: false,
    },
    hoverEffect: { // 是否添加卡片的hover效果
      type: Boolean,
      default: false,
    },
    priceStyle: { // 卡片价格附加样式类名
      type: String,
      default: '',
    },
  },
};
</script>

<style lang = "scss">
    @import '../../../style/common/display-card.scss';
</style>
