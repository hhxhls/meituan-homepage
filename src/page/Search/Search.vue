<template>
  <div class="search-page" id="search-page">
    <el-row class="crumb">
      <c-crumb
        :crumb-list="[{text:keyword,path:`/search?key=${keyword}`}]"
      ></c-crumb>
    </el-row>
    <el-row class="search-body">
      <main class="product-content">
        <section class="product-filter">
          <div class="chosen-filters" v-if="chosenTags.length > 0">
              <label>已选条件</label>
              <div class="tag-list">
                <a href="javascript:void(0)"
                   class="tags"
                   v-for="(item,index) in chosenTags"
                   :key="index"
                   @click="dismissChosenTag(index)">
                    <span>{{item.tag}}</span>
                </a>
                <span class="clear-all"
                      @click="dismissChosenTag">· 清除全部</span>
              </div>
          </div>
          <div class="fiter-area">
                <c-filter-list
                  title="分类"
                  :list="searchFilters.cate || []"
                  filter-key="cate"
                  ref="cate"
                  @filterselect="onFilterSelect"
                ></c-filter-list>
                <c-filter-list
                  title="区域"
                  :list="searchFilters.area || []"
                  filter-key="area"
                  ref="area"
                  @filterselect="onFilterSelect"
                ></c-filter-list>
            <div class="location-filter"></div>
          </div>
        </section>
        <section class="result-list-wrap" id="search-top">
          <div class="search-sort">
            <div class="sort-tags">
              <span :class="{'active':item.active,
                            'price-default': item.status === 'default',
                            'price-ascendant': item.status === 'ascendant',
                            'price-descendant': item.status === 'descendant',}"
                    v-for="(item,index) in sortTags"
                    :key="index"
                    @click="onSortChange(index)"
              >{{item.text}}</span>
            </div>
          </div>
          <div class="result-list" >
            <div class="list-content">
              <c-product-item
                v-for="(item,index) in resolvedList"
                :id="item.id"
                :imageUrl="item.imageUrl"
                :title="item.title"
                :avgscore="item.avgscore"
                :comments="item.comments"
                :backCateName="item.backCateName"
                :areaname="item.areaname"
                :address="item.address"
                :avgprice="item.avgprice"
                :deals="item.deals"
                :rank="index + 1"
                :key="index"
              ></c-product-item>
            </div>
          </div>
        </section>
        <section class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pageItemNumber"
              :total="searchPageList.totalCount"
              :current-page="currentPage"
              :pager-count="7"
              @current-change="pageChange"
            >
            </el-pagination>
        </section>
        <section class="bottom-nav"></section>
      </main>
      <aside class="aside-box">
        <div class="map">
          地图暂不提供
        </div>
        <div class="recommand-wrap">
          <p class="title">猜你喜欢</p>
          <div class="recommand-list">
            <c-display-card
              v-for="(item,index) in userLike.details"
              :key="index"
              :imgLink="item.imgLink"
              :title="item.title"
              :hostAvatarUrl="item.hostAvatarUrl"
              :tags="item.tags"
              :oldPrice="item.oldPrice"
              :bottomInfo="item.bottomInfo"
              :soldout="item.soldout"
              :itemLink="`/product/${item.itemId}`"
              width="100%"
              :rateText="`${item.commentNum}个评价`"
              :rateScore="Number(item.score)"
              :subTitle="item.areaName"
              :currentPrice="item.lowPrice"
              priceDesc="起"
            ></c-display-card>
          </div>
        </div>
      </aside>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { getElementAbsolutePosition } from '@/utils/util';

import CDisplayCard from '@/components/common/display-card/DisplayCard.vue';
import CCrumb from '@/components/common/crumb/Crumb.vue';
import CProductItem from '@/components/search/ProductItem.vue';
import CFilterList from '@/components/search//filterList.vue';

export default {
  data() {
    return {
      keyword: '', // 搜索页面关键字
      chosenTags: [], // 用户选中的筛选tag
      sortType: 'auto', // 搜索列表排序方式
      sortTags: [
        { text: '智能排序', type: 'auto', active: true },
        {
          text: '价格排序', type: 'price', active: false, status: 'default',
        },
        { text: '人气最高', type: 'hot', active: false },
        { text: '评价最高', type: 'rate', active: false },
      ], // 排序方式的静态页面数据
      querySettings: {}, // 页面搜索的query信息
      currentPage: 1, // 当前页数
      pageItemNumber: 32, // 每页显示的项目数
    };
  },
  computed: {
    ...mapState(['location', 'userLike']),
    ...mapState('search', ['searchPageList', 'searchFilters']),
    // 经过过滤和排序后的搜索列表
    resolvedList() {
      return this.sortPageList();
    },
  },
  components: {
    CProductItem,
    CDisplayCard,
    CFilterList,
    CCrumb,
  },
  methods: {
    ...mapActions(['dispatchUserLike']),
    ...mapActions('search', ['dispatchPageList', 'dispatchSearchFilter']),
    // 改变页面排序
    onSortChange(index) {
      const currentTag = this.sortTags[index];
      for (let i = 0; i < this.sortTags.length; i++) {
        this.$set(this.sortTags[i], 'active', false);
      }
      this.$set(currentTag, 'active', true);
      if (currentTag.status) {
        this.priceSortToggle(currentTag);
      } else {
        this.sortType = currentTag.type;
        this.$set(this.sortTags[1], 'status', 'default');
        this.$set(this.sortTags[1], 'text', '价格排序');
      }
    },
    // 改变价格排序的顺序
    priceSortToggle(priceTag) {
      switch (priceTag.status) {
        case 'default':
          this.$set(priceTag, 'status', 'ascendant');
          this.$set(priceTag, 'text', '价格最低');
          break;
        case 'ascendant':
          this.$set(priceTag, 'status', 'descendant');
          this.$set(priceTag, 'text', '价格最高');
          break;
        case 'descendant':
          this.$set(priceTag, 'status', 'ascendant');
          this.$set(priceTag, 'text', '价格最低');
          break;
        default:
          break;
      }
      this.sortType = 'price';
    },
    // 用户点击筛选tag时对数据进行筛选，由于美团没有暴露filter tag的数据接口，这里仅提供标签的选中效果
    onFilterSelect({ type, select }) {
      if (select) {
        this.$set(this.querySettings, type, select);
        this.addFilterTag(type, select);
      } else {
        this.$delete(this.querySettings, type);
        this.chosenTags.some((tabItem, i) => {
          const isMatch = tabItem.type === type;
          if (isMatch) {
            this.dismissChosenTag(i);
          }
          return isMatch;
        });
      }
    },
    // 对列表进行排序
    sortPageList() {
      const sortedList = Object.assign([], this.searchPageList.searchResult);
      let { sortType } = this;
      switch (this.sortType) {
        case 'auto':
          break;
        case 'price':
          if (this.sortTags[1].status === 'ascendant') {
            sortedList.sort((a, b) => b.lowestprice - a.lowestprice);
          } else if (this.sortTags[1].status === 'descendant') {
            sortedList.sort((a, b) => a.lowestprice - b.lowestprice);
          }
          sortType += `-${this.sortTags[1].status}`;
          break;
        case 'hot':
          sortedList.sort((a, b) => b.comments - a.comments);
          break;
        case 'rate':
          sortedList.sort((a, b) => b.avgscore - a.avgscore);
          break;
        default:
          break;
      }
      this.$set(this.querySettings, 'sort', sortType);
      return sortedList;
    },
    // 添加或更改搜索栏目头部的过滤标签
    addFilterTag(type, tag) {
      const tags = this.chosenTags;
      const isTypeExist = tags.some((tagItem, index) => {
        const exist = tagItem.type === type;
        if (exist) {
          this.$set(this.chosenTags, index, {
            type,
            tag,
          });
        }
        return exist;
      });
      if (!isTypeExist) {
        this.chosenTags.push({
          type,
          tag,
        });
      }
    },
    // 移除搜索栏目头部的过滤标签
    dismissChosenTag(index) {
      if (typeof index === 'number') {
        const { type } = this.chosenTags[index];
        const ref = this.$refs[type];
        this.resetTag(ref);
        this.chosenTags.splice(index, 1);
        this.$delete(this.querySettings, type);
        this.currentPage = 1;
      } else {
        const tags = this.chosenTags;
        const { length } = tags;
        tags.forEach((tagItem) => {
          const { type } = tagItem;
          const ref = this.$refs[type];
          this.resetTag(ref);
          this.$delete(this.querySettings, type);
        });
        tags.splice(0, length);
        this.currentPage = 1;
      }
    },
    // 对过滤标签进行重置
    resetTag(ref) {
      const target = ref;
      target.activeTag = -1;
      target.applyList.forEach((ele) => {
        const temp = ele;
        temp.currentTitle = temp.title;
      });
    },
    // 改变页数
    pageChange(current) {
      this.backToSearchTop();
      this.currentPage = current;
      this.dispatchPageList({
        ...this.querySettings,
        page: current,
      });
    },
    // 返回搜索栏目头部
    backToSearchTop() {
      const searchTopDom = document.getElementById('search-top');
      const { y } = getElementAbsolutePosition(searchTopDom);
      window.scrollTo(0, y);
    },
  },
  watch: {
    // 当页面的过滤和排序选项改变时请求数据，由于一些接口没有暴露，无法获得各商铺的过滤tag，在这里仅做演示，排序由前端代码完成
    querySettings: {
      handler(newVal) {
        this.dispatchPageList({ ...newVal });
        this.currentPage = 1;
      },
      deep: true,
    },
  },
  created() {
    const queryStr = window.decodeURI(window.location.search);
    this.keyword = queryStr.replace('?key=', '');
    this.dispatchPageList({ keyword: this.keyword });
    this.dispatchSearchFilter(this.keyword);
    this.dispatchUserLike();
  },
};
</script>

<style lang="scss">
@import "@/style/search/search.scss";
</style>
