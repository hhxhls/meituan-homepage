<template>
    <div class="product-detail">
        <div class="left">
            <div class="up-bar">
                <p class="title">
                    {{brandName}}
                    <span>
                        <i  class='icon'
                        :style="{'background':
                        'url(/image/icons/food-security.png'}"></i>
                        食品安全档案
                    </span>
                </p>
                <p class="basic-info">
                    <el-rate
                        :value="score"
                        disabled
                        :colors="['#FF9900','#FF9900','#FF9900']"
                    ></el-rate>
                    <span class="score-texts">{{score}}分</span>
                    <span>人均￥{{avgPrice}}</span>
                </p>
            </div>
            <div class="middle-bar">
                <p class="address">地址：{{address}}</p>
                <p class="tel">电话：{{tel}}</p>
                <p class="open-time">
                    <span
                     v-for="(item,index) in openTime"
                     :key="index"
                    >营业时间：{{item.daysFrom}}至{{item.daysTo}}
                      {{item.timeFrom}}-{{item.timeTo}}</span>
                </p>
            </div>
            <div class="bottom-bar">
                <div class="tag"
                     v-for="(item,name,index) in tags"
                     :key="index">
                    <img :src="`/image/icons/${name}.png`" alt="">
                    <span>{{(tagMapping && tagMapping[name]) || ''}}</span>
                </div>
            </div>
        </div>
        <div class="right">
            <img :src="coverImg"
                  class="show-img"
                  @click="toggleImageViewer(1)">
            <ul class="thumb-list">
                <li class="thumb-container"
                  v-for="(item,index) in swiperImgs"
                  v-show="index < 4"
                  :key="index"
                >
                  <img
                      :src="item"
                       @click="toggleImageViewer(index + 1)"
                      class="thumb">
                </li>
            </ul>
        </div>
        <c-image-viewer
          :img-list="swiperImgs"
          :show="showImageViewer"
          :initImg  ="initViewerImg"
          @viewerclose="toggleImageViewer"
        ></c-image-viewer>
    </div>
</template>

<script>
import { tagMapping } from './utils';
import CImageViewer from './ImageViewer.vue';

export default {
  components: {
    CImageViewer,
  },
  props: {
    brandName: { // 商铺名
      type: String,
      require: true,
    },
    score: { // 客户评分
      type: Number,
      require: true,
    },
    avgPrice: { // 人均消费
      type: Number,
      require: true,
    },
    address: { // 商家地址
      type: String,
      require: true,
    },
    tel: { // 商家电话
      type: String,
      require: true,
    },
    openTime: { // 商铺营业时间
      type: Array,
      require: true,
    },
    tags: { // 提供的服务tags
      type: Object,
      require: true,
    },
    coverImg: { // 展示栏图片
      type: String,
      require: true,
    },
    swiperImgs: { // 展示栏缩略图
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      tagMapping, // 服务说明文字静态数据
      showImageViewer: false, // 打开图片预览器
      initViewerImg: 1, // 初始预览器图片
    };
  },
  methods: {
    toggleImageViewer(index) { // 开启 / 关闭 图片预览器
      this.showImageViewer = !this.showImageViewer;
      if (index) {
        this.initViewerImg = index;
      }
    },
  },
  created() {
  },
};
</script>

<style lang="scss">
    @import '@/style/product/product-card.scss';
</style>
