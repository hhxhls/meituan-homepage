<template>
    <div class="account">
        <div class="page-main">
            <div class="left-bar">
                <div class="left-menus">
                    <dl v-for="(item,index) in menuList"
                        class="menu-item"
                        :class="{gap:item.groupStart}"
                        :key="index"
                    >
                        <dt class="list-title">
                           <router-link :to="{
                                              name:item.url,
                                              params:{
                                                status:0
                                                }
                                              }">{{item.tab}}</router-link>
                        </dt>
                        <dl class="sub-list">
                            <dt class="sub-item"
                                v-for="(sub,i) in item.children"
                                :key="i">
                                  <router-link :to="{name:item.url,params:{status:sub.status}}"
                                    >{{sub.tab}}</router-link>
                                    <i class="arrow-right"></i>
                              </dt>
                        </dl>
                    </dl>
                </div>
                <div class="app">
                    <div class="qrcode-box">
                        <img src="/image/common/download-qr.png" alt="" class="qrcode">
                    </div>
                    <p>美团APP手机版</p>
                    <p class="des">
                        <span class="highlight">一元起</span>
                        <span class="normal">吃喝玩乐</span>
                    </p>
                </div>
            </div>
             <div class="page-info" v-if="userBrief">
                <router-view :user-info ="userBrief"></router-view>
             </div>
        </div>
        <div class="bottom-navi">
          <c-category-bar :title="hotNav.title" :tags="[]" class="bottom-nav">
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
        </div>
    </div>
</template>

<script>
import CCategoryBar from '@/components/index/categorybar/CategoryBar.vue';
import { mapState, mapActions } from 'vuex';


export default {
  components: {
    CCategoryBar,
  },
  data() {
    return {
      // 用户页面侧边栏的静态数据
      menuList: [
        {
          tab: '我的美团',
          url: 'userinfos',
          groupStart: true,
          children: [],
        },
        {
          tab: '我的订单',
          url: 'userorders',
          children: [
            {
              status: 0,
              tab: '全部订单',
            },
            {
              status: 1,
              tab: '待付款',
            },
            {
              status: 2,
              tab: '待使用',
            },
            {
              status: 3,
              tab: '待评价',
            },
            {
              status: 4,
              tab: '退款/售后',
            },
          ],
        },
        {
          tab: '我的收藏',
          url: 'userfavors',
          groupStart: true,
          children: [
            {
              status: 0,
              tab: '收藏的商家',
            },
            {
              status: 1,
              tab: '收藏的团购',
            },
          ],
        },
        {
          tab: '抵用券',
          url: 'uservouchers',
          groupStart: true,
          children: [
            {
              status: 0,
              tab: '可用券',
            },
            {
              status: 1,
              tab: '失效券 ',
            },
          ],
        },
        {
          tab: '个人信息',
          url: 'settings',
          groupStart: true,
          children: [
            {
              status: 0,
              tab: '账户设置',
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState(['userBrief', 'hotNav']),
  },
  methods: {
    ...mapActions(['dispatchHotNav', 'dispatchUserBrief']),
  },
  created() {
    this.dispatchUserBrief();
    this.dispatchHotNav();
  },
};
</script>

<style lang="scss">
    @import '@/style/account/account.scss';
</style>
