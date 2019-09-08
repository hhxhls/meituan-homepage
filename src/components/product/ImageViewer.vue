<template>
    <div :class="{'image-viewer':true,'show':show}">
      <div class="main-wrap">
        <div class="showcage">
            <div class="close"
                @click="closeViewer"
            >
                <span class="close-btn"></span>
            </div>
            <div class="main-img-container">
                <img class="main-img" :src="showImgUrl">
                 <div class="assist-text">
                     <span>{{activePage}} / {{totalPage}}</span>
                 </div>
            </div>
            <div :class="{'btn': true, 'left-btn': true,disabled: activePage === 1}"
                @click="prevPage(activePage == 1,1);changeImageUrl()"
              >
                 <span class="arrow"></span>
             </div>
             <div :class="{'btn': true, 'right-btn': true,disabled: activePage === totalPage}"
                  @click="nextPage(activePage  === totalPage,1);changeImageUrl()">
                 <span class="arrow"></span>
             </div>
        </div>
        <div class="thumb-container">
            <ul class="thumb-list" v-if="list">
                <li v-for="(item,index) in getPageArray"
                    :key="index"
                    :class="{thumb:true,active: activePage == item.id}"
                    @click="thumbFocus(item.id);changeImageUrl()">
                    <img class="thumb-img"
                        :src="item.url">
                </li>
            </ul>
            <div :class="{'btn': true, 'left-btn': true,disabled: activePage < 5}"
                 @click="prevPage(activePage < 5,2)">
                 <span class="arrow"></span>
             </div>
             <div :class="{'btn': true, 'right-btn': true,disabled: activePage > totalPage - 3}"
                 @click="nextPage(activePage > totalPage - 3,2)">
                 <span class="arrow"></span>
             </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    imgList: { // 预览图片列表
      type: Array,
      require: true,
    },
    initImg: { // 初始预览图片
      type: Number,
      require: true,
    },
    show: { // 由父组件控制是否显示预览
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      list: [], // 绑定页面ID后的图片数组
      showLimit: 6, // 缩略图个数限制
      activePage: 1, // 当前选中的缩略图
      totalPage: 0, // 预览图片总数
      showImgUrl: '', // 当前预览图片地址
    };
  },
  computed: {
    getPageArray() { // 根据预览图片总数，缩略图个数限制和当前选中的缩略图渲染缩略图数组
      const arr = [];
      if (this.totalPage <= this.showLimit) {
        for (let i = 1; i <= this.totalPage; i++) {
          arr.push(this.list[i - 1]);
        }
      } else if (this.activePage < 4) {
        for (let i = 1; i <= this.showLimit; i++) {
          arr.push(this.list[i - 1]);
        }
      } else if (this.totalPage - this.activePage <= 2) {
        for (let i = this.totalPage; i >= this.totalPage - 4; i--) {
          arr.unshift(this.list[i - 1]);
        }
      } else {
        for (let i = this.activePage - 2; i <= this.activePage + 3; i++) {
          arr.push(this.list[i - 1]);
        }
      }
      return arr;
    },
  },
  watch: {
    initImg(newVal) {
      this.activePage = newVal;
      this.showImgUrl = this.list[newVal - 1].url;
    },
    imgList(newVal) {
      if (newVal.length === 0) {
        return;
      }
      this.totalPage = newVal.length;
      this.list = this.bindThumbId();
      this.activePage = this.initImg;
      this.showImgUrl = this.list[this.activePage - 1].url;
    },
  },
  methods: {
    closeViewer() { // 关闭图片预览器
      this.$emit('viewerclose');
    },
    thumbFocus(index) { // 选中某张缩略图
      this.activePage = index;
    },
    bindThumbId() { // 为各图片添加缩略图id
      const arr = [];
      this.imgList.forEach((ele, index) => {
        const obj = {};
        obj.url = ele;
        obj.id = index + 1;
        arr.push(obj);
      });
      return arr;
    },
    changeImageUrl() { // 改变当前预览的图片地址
      this.showImgUrl = this.list[this.activePage - 1].url;
    },
    prevPage(disabled, step) { // 点击上一页缩略图按钮
      if (!disabled) {
        this.activePage = this.activePage - step;
      }
    },
    nextPage(disabled, step) { // 点击下一页缩略图按钮
      if (!disabled) {
        this.activePage = this.activePage + step;
      }
    },
  },
  created() {

  },
};
</script>

<style lang="scss">
    @import '@/style/product/image-viewer.scss';
</style>
