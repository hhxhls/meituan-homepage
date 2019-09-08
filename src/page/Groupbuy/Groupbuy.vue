<template>
    <div class="groupbuy-page" v-if="groupbuyInfo">
        <section class="page-crumbs" >
            <c-crumb
                :crumb-list="[
                {text:'美食',path:'/'},
                {text:'火锅',path:'/search?key=火锅'},
                {text: groupbuyInfo.productName,path:''},
                {text: groupbuyInfo.pathName,path:''},
                ]"
                class="crumb"
            ></c-crumb>
        </section>
        <section class="-wrap">
            <c-groupbuy-card
                :gid="groupbuyInfo.gid"
                :titleImgUrl="groupbuyInfo.titleImgUrl"
                :chooseLimit="groupbuyInfo.chooseLimit"
                :productName="groupbuyInfo.productName"
                :menuName="groupbuyInfo.menuName"
                :services="groupbuyInfo.services"
                :gbPrice="groupbuyInfo.gbPrice"
                :value="groupbuyInfo.value"
                :sold="groupbuyInfo.sold"
                :otherMenus="groupbuyInfo.otherMenus"
                :validDays="groupbuyInfo.validDays"
                :gurantee="groupbuyInfo.gurantee"
            ></c-groupbuy-card>
        </section>
        <section class="groupbuy-detail-wrap">
        <c-scroll-container
            :tab-list="tabList">
          <c-scroll-section
              :title="'使用门店'">
              <div class="shop-box section-box">
                <a  href="" class="shop-info"
                    v-for="(item,index) in groupbuyInfo.appliedShop"
                    :key="index"
                    :src="item.src">
                    <p class="shop-name">{{item.shopName}}</p>
                    <div class="rate">
                      <el-rate
                      :value ="item.score"
                      :colors="['#FF9900','#FF9900','#FF9900']"
                      disabled
                      ></el-rate>
                      <span>{{item.score}}分</span>
                    </div>
                    <p class="tel">电话: {{item.tel}}</p>
                    <p class="address">地址: {{item.address}}</p>
                </a>
              </div>
          </c-scroll-section>
          <c-scroll-section
              :title="'套餐详情'">
            <div class="order-table section-bpx">
                <div class="table-title">
                    <div class="left">套餐内容</div>
                    <div class="right">
                        <span>单价</span>
                        <span>数量/规格</span>
                        <span>小计</span>
                    </div>
                </div>
                <div class="sub-menu"
                    v-for="(item,index) in groupbuyInfo.details"
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
                    <span class="total-value">价值: ￥{{groupbuyInfo.value}}</span>
                    <span class="total-price">美团价<b>￥{{groupbuyInfo.gbPrice}}</b></span>
                </div>
            </div>
          </c-scroll-section>
          <c-scroll-section
              :title="'购买须知'">
          <div class="buy-noti ">
            <div class="noti-content section-box">
                <div class="valid-day sub">
                    <p>有效期</p>
                    <p class="des-text">{{groupbuyInfo.validDays && groupbuyInfo.validDays.from}}
                                        至 {{groupbuyInfo.validDays && groupbuyInfo.validDays.to}}
                                      （周末、法定节假日通用）
                    </p>
                </div>
                <div class="valid-time sub">
                    <p>使用时间</p>
                    <p class="des-text">{{groupbuyInfo.validDays && groupbuyInfo.validTime.from}}
                                        -{{groupbuyInfo.validDays && groupbuyInfo.validTime.to}}</p>
                </div>
                <div class="gb-rules sub">
                    <p>使用规则</p>
                    <p class="des-text">团购用户不可同时享受商家其他优惠 酒水饮料等问题，请致电商家
                        咨询，以商家反馈为准 如部分菜品因时令或其他不可抗因素导致无
                        法提供，商家会用等价菜品替换，具体事宜请与商家协商，不可使用包间，无需预约，消费高峰期可能需要等位，每张美团券建议4人使用，
                        商家提供免费WiFi，堂食外带均可，可免费打包</p>
                </div>
            </div>
             <div class="display-img">
                <div class="outer-title">图文详情</div>
                <div class="section-box img-box">
                  <div class="detail-img"
                    v-for="(item,index) in groupbuyInfo.gbDishs"
                    :key="index">
                      <img :src="item.url" alt="">
                      <p class="dish-name">{{item.name}}</p>
                  </div>
                  <div class="other-img"
                    v-for="(i,k) in groupbuyInfo.otherImg"
                    :key="'img' + k">
                      <img :src="i" alt="">
                  </div>
                </div>
             </div>
          </div>
          </c-scroll-section>
          <c-scroll-section
              :title="''">
            <c-comment-box
              v-if="groupbuyComment"
              :comment-list="groupbuyComment"
              @querycomment="commentChange"
            ></c-comment-box>
          </c-scroll-section>
          </c-scroll-container>
        </section>
        <section class="groupbuy-comment-wrap">
        </section>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CCrumb from '@/components/common/crumb/Crumb.vue';
import CGroupbuyCard from '@/components/groupbuy/groupbuy-card/GroupbuyCard.vue';
import CScrollContainer from '@/components/groupbuy/scroll-tab/ScrollContainer.vue';
import CScrollSection from '@/components/groupbuy/scroll-tab/ScrollSection.vue';
import CCommentBox from '@/components/common/comment-box/CommentBox.vue';

export default {
  data() {
    return {
      tabList: [
        '使用门店',
        '套餐详情',
        '购买须知',
        '用户评价',
      ],
    };
  },
  components: {
    CCrumb,
    CGroupbuyCard,
    CScrollContainer,
    CScrollSection,
    CCommentBox,
  },
  computed: {
    ...mapState('groupbuy', ['groupbuyInfo', 'groupbuyComment']),
  },
  methods: {
    ...mapActions('groupbuy', ['dispatchGroupbuyInfo', 'dispatchGroupbuyComment']),
    commentChange({
      page, sort, imgOnly, tag,
    }) {
      this.dispatchGroupbuyComment({
        page,
        sort,
        imgOnly,
        tag,
      });
    },
  },
  created() {
    this.dispatchGroupbuyInfo();
    this.dispatchGroupbuyComment({ page: 1 });
  },
};
</script>

<style lang = "scss">
    @import '@/style/groupbuy/groupbuy.scss';
</style>
