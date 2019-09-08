<template>
    <div class="cabinet-wrap">
        <div class="top-row">
            <el-carousel height="240px"
                         trigger="hover"
                         autoplay
                         :interval="3000"
                         arrow="hover"
                         :loop="true">
                <el-carousel-item v-for="(item,index) in carouselItems" :key="index">
                    <a :href="item.href" class="item-link">
                        <img :src="item.imgUrl" class="item-image"  alt="">
                    </a>
                </el-carousel-item>
            </el-carousel>
            <a href="/entertainment/" class="cabinet-item">
                <img src="/image/index/cabinet/entertainment.jpg"
                      class="entertainment"  alt="">
            </a>
            <div class="log-info">
                <div class="no-log" v-if="!userBrief">
                    <div class="log-head">
                        <img src="/image/index/default-avatar.jpg" alt="" class="head-img">
                    </div>
                    <p class="greeting">
                        Hi!  你好
                    </p>
                    <router-link :to="{name:'register'}" class="register btn">注册</router-link>
                    <router-link :to="{name:'login'}" class="login btn">立即登录</router-link>
                </div>
                <div class="logged" v-else>
                    <router-link :to="{name:'settings'}" class="settings-link">
                      <i class="log-icon settings"></i>
                    </router-link>
                  <div class="avatar-box">
                    <router-link class="avatar-link" :to="{name:'account'}">
                      <img :src="userBrief.avatarUrl" alt="" class="avatar-img">
                    </router-link>
                    <p class="username">{{userBrief.nickName}}</p>
                  </div>
                  <div class="account-shortcut">
                    <router-link  class="icon-link"
                         v-for="(item,index) in logIconList"
                         :key="index"
                         :to="{name:item.router}">
                          <div class="link-item">
                            <i class="log-icon" :class="[item.className]"></i>
                            <p class="icon-des">{{item.des}}</p>
                          </div>
                    </router-link>
                  </div>
                </div>
            </div>
        </div>
        <div class="bottom-row">
            <a :href="item.href" class="cabinet-item"
                 v-for="(item, index) in bottomCabinet" :key="index">
                <img :src="item.imgUrl"
                      :class="[item.className]"  alt="">
            </a>
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
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      carouselItems: [ // 轮播图对应的静态页面数据
        {
          href: '',
          imgUrl: '/image/index/carousel/hotel.jpg',
        },
        {
          href: '',
          imgUrl: '/image/index/carousel/cuisine.jpg',
        },
        {
          href: '',
          imgUrl: '/image/index/carousel/takeout.jpg',
        },
        {
          href: '',
          imgUrl: '/image/index/carousel/movie.jpg',
        },
        {
          href: '',
          imgUrl: '/image/index/carousel/travelcube.png',
        },
      ],
      logIconList: [ // 登录后的用户功能栏icon静态数据
        {
          des: '我的订单',
          className: 'order',
          router: 'userorders',
        },
        {
          des: '我的收藏',
          className: 'favor',
          router: 'userfavors',
        },
        {
          des: '抵用券',
          className: 'voucher',
          router: 'uservouchers',
        },
        {
          des: '余额',
          className: 'balance',
          router: 'account',
        },
        {
          des: '更多',
          className: 'more',
          router: 'account',
        },
      ],
      bottomCabinet: [ // 底部图片静态数据
        {
          href: '',
          imgUrl: '/image/index/cabinet/hotel.png',
          className: 'hotel',
        },
        {
          href: '/train/',
          imgUrl: '/image/index/cabinet/train.jpg',
          className: 'train',
        },
        {
          href: '',
          imgUrl: '/image/index/cabinet/partner.jpg',
          className: 'partner',
        },
      ],
    };
  },
  computed: {
    ...mapState(['username', 'userBrief']),
  },
  methods: {
    ...mapActions(['dispatchUserBrief']),
  },
  created() {
  },
};
</script>

<style lang = "scss">
    @import '@/style/index/showcabinet.scss';
</style>
