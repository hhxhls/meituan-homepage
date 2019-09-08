<template>
  <div class="index">
    <el-row class="outlink-wrap">
          <div class="outlink-bar">
              <div class="outlink-content">
                <a v-for="(item,index) in outLinks"
                   :key="index"
                   :href="item.href"
                   :class="[item.className]"
                >
                  {{item.name}}
                </a>
              </div>
        </div>
    </el-row>
    <el-row class="banner-container">
      <c-menu></c-menu>
      <c-show-cabinet></c-show-cabinet>
    </el-row>
    <el-row class="category-list">
      <c-category-bar :title=" elegant && elegant.title || ''"
                      :tags="elegant && elegant.tags || []"
                      class="elegant">
        <template v-slot:cardlist>
          <div v-if="elegant">
            <c-display-card
              v-for="(item,index) in elegant.details"
              :key="index"
              :itemLink="item.itemLink"
              :imgLink="item.imgLink"
              :title="item.title"
              :hostAvatarUrl="item.hostAvatarUrl"
              :rateScore="item.rateScore"
              :subTitle="item.subTitle"
              :tags="item.tags"
              :currentPrice="item.currentPrice"
              :oldPrice="item.oldPrice"
              :priceDesc="item.priceDesc"
              :bottomInfo="item.bottomInfo"
              :soldout="item.soldout"
              width="33%"
              height="290px"
              :hoverEffect="true"
              priceStyle="gold"
            ></c-display-card>
          </div>
        </template>
      </c-category-bar>
      <c-category-bar :title="discount && discount.title || ''"
                      :tags="discount && discount.tags || []"
                      class="discount">
        <template v-slot:cardlist>
          <div class="category-bar" v-if="discount">
            <c-display-card
              v-for="(item,index) in discount.details"
              :key="index"
              :itemLink="item.itemLink"
              :imgLink="item.imgLink"
              :title="item.title"
              :hostAvatarUrl="item.hostAvatarUrl"
              :rateScore="item.rateScore"
              :subTitle="item.subTitle"
              :tags="item.tags"
              :currentPrice="item.currentPrice"
              :oldPrice="item.oldPrice"
              :priceDesc="item.priceDesc"
              :bottomInfo="item.bottomInfo"
              :soldout="item.soldout"
              :hoverEffect="true"
              height="290px"
              width="233px"
            ></c-display-card>
          </div>
        </template>
      </c-category-bar>
      <c-category-bar :title="movie && movie.title || ''"
                      :tags="movie && movie.tags || []"
                      class="movie">
        <template v-slot:cardlist>
          <div class="category-bar">
            <div
              v-if="movie"
              class="poster-wrapper"
              :class="{'next-page':movieNext > 0,'to-end':movieNext > 1}"
            >
              <c-movie-poster
                v-for="(item,index) in movie.details"
                :key="index"
                :img="item.img"
                :filmMarl="item.filmMarl"
                :globalReleased="item.globalReleased"
                :sc="item.sc"
                :wish="item.wish"
                :nm="item.nm"
                :href="`https://maoyan.com/films/${item.id}`"
              ></c-movie-poster>
            </div>
          </div>
          <div class="btn left-btn"
                @click="changeMoviePage('prev')">
            <span class="arrow"></span>
          </div>
          <div class="btn right-btn"
                @click="changeMoviePage('next')">
            <span class="arrow"></span>
          </div>
        </template>
      </c-category-bar>
      <c-category-bar :title="zhenguo && zhenguo.title || ''"
                      :tags="zhenguo && zhenguo.tags || []"
                      class="zhenguo">
        <template v-slot:cardlist>
          <div class="category-bar" v-if="zhenguo">
            <c-display-card
              v-for="(item,index) in zhenguo.details"
              :key="index"
              :imgLink="item.imgLink"
              :title="item.title"
              :hostAvatarUrl="item.hostAvatarUrl"
              :rateScore="item.rateScore"
              :tags="item.tags"
              :oldPrice="item.oldPrice"
              :priceDesc="item.priceDesc"
              :bottomInfo="item.bottomInfo"
              :soldout="item.soldout"
              :itemLink="`https://phoenix.meituan.com/housing/${item.productId}`"
              width="33%"
              imgWidth="370px"
              :subTitle="`整套${item.layoutRoom}居室·可住
                          ${item.maxGuestNumber}人 | ${item.locationArea || ''}`"
              :currentPrice="item.price"
            ></c-display-card>
          </div>
        </template>
      </c-category-bar>
      <c-category-bar :title="userLike.title" :tags="userLike.tags" class="like">
        <template v-slot:cardlist>
          <div class="category-bar">
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
              width="20%"
              :rateText="`${item.commentNum}个评价`"
              :rateScore="Number(item.score)"
              :subTitle="item.areaName"
              :currentPrice="item.lowPrice"
              priceDesc="起"
              :hoverEffect="true"
            ></c-display-card>
          </div>
        </template>
      </c-category-bar>
      <c-category-bar :title="hotNav.title" :tags="hotNav.tags" class="bottom-nav">
        <template v-slot:cardlist>
          <ul class="nav-wraper">
            <li v-for="(item,index) in hotNav.details"
                :key="index"
                class="nav-bar">
                  <dl class="nav-content" >
                    <dt class="list-title">{{item.title}}</dt>
                    <dl :class="{'last': (index === hotNav.details.length -1)}">
                        <dd
                          v-for="(i,k) in item.tabList"
                          :key="k" >
                          <a href="javascript:void(0)">{{i.tab}}
                            <i v-if="i.hot">HOT</i>
                          </a>
                          </dd>
                    </dl>
                  </dl>
                </li>
          </ul>
        </template>
      </c-category-bar>
    </el-row>
  </div>
</template>

<script>
import CMenu from '@/components/index/menu/Menu.vue';
import CShowCabinet from '@/components/index/showcabinet/ShowCabinet.vue';
import CCategoryBar from '@/components/index/categorybar/CategoryBar.vue';
import CDisplayCard from '@/components/common/display-card/DisplayCard.vue';
import CMoviePoster from '@/components/common/movie-poster/MoviePoster.vue';
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      outLinks: [
        { name: '美团外卖', href: '/', className: 'takeout' },
        { name: '猫眼电影', href: '/', className: 'movie' },
        { name: '美团酒店', href: '/', className: 'hotel' },
        { name: '民宿／公寓', href: '/', className: 'zhenguo' },
        { name: '商家入驻', href: '/', className: 'business' },
        { name: '美团公益', href: '/', className: 'charity' },
      ], //  站外链接静态数据
      movieNext: 0, // “猫眼电影”电影海报页数
    };
  },
  computed: {
    ...mapState('index', ['elegant', 'discount', 'movie', 'zhenguo']),
    ...mapState(['userLike', 'hotNav']),
  },
  methods: {
    ...mapActions('index',
      ['dispatchElegant', 'dispatchDiscount', 'dispatchMovie', 'dispatchZhenguo']),
    ...mapActions(['dispatchHotNav', 'dispatchUserLike']),
    // 改变“猫眼电影”海报页面
    changeMoviePage(page) {
      if (page === 'next') {
        if (this.movieNext < 2) {
          this.movieNext += 1;
        }
      } else if (page === 'prev') {
        if (this.movieNext > 0) {
          this.movieNext -= 1;
        }
      }
    },
  },
  components: {
    CMenu,
    CShowCabinet,
    CCategoryBar,
    CDisplayCard,
    CMoviePoster,
  },
  created() {
    this.dispatchElegant();
    this.dispatchDiscount();
    this.dispatchMovie();
    this.dispatchZhenguo();
    this.dispatchHotNav();
    this.dispatchUserLike();
  },
};
</script>

<style lang = "scss">
@import "@/style/index/index.scss";
</style>
