<template>
  <el-row class="top">
    <el-col :span="14">
      <div class="left-bar">
        <section class="geo left-item">
          <span class="position-icon"></span>
          <span class="location">{{location}}</span>
          <router-link :to="{name:'change-city'}" class="change-city">切换城市</router-link>
          <div class="near-by">
            [
            <a
              class="near-by-item"
              v-for="(item,index) in nearby"
              :key="index"
              @click="changeLocation(item.location)"
            >{{item.location}}</a>
            ]
          </div>
        </section>
        <section class="user left-item">
          <div class="already-log" v-if="username">
            <router-link :to="{name:'userinfos'}"
                        class="username highlight">{{username}}</router-link>
            <a class="logout" @click="logout">退出</a>
          </div>
          <div class="not-log" v-else>
            <router-link class="login highlight" :to="{name:'login'}">立即登录</router-link>
            <router-link class="register" :to="{name:'register'}">注册</router-link>
          </div>
        </section>
      </div>
    </el-col>
    <el-col :span="10">
      <section class="right-bar">
        <ul class="head-nav">
          <li class="nav-branch with-sub">
            <router-link  :to="{name:'userinfos'}"  class="with-sub">我的美团</router-link>
            <dl class="branch-list">
              <dd>
                <router-link :to="{name:'userorders',params:{status:0}}"
                             class="branch-item">我的订单</router-link>
              </dd>
              <dd>
                <router-link :to="{name:'userfavors',params:{status:0}}"
                             class="branch-item">我的收藏</router-link>
              </dd>
              <dd>
                <router-link :to="{name:'uservouchers',params:{status:0}}"
                             class="branch-item">抵用券</router-link>
              </dd>
              <dd>
                <router-link :to="{name:'settings'}"
                             class="branch-item">账户设置</router-link>
              </dd>
            </dl>
          </li>
          <li class="nav-branch">
            <router-link to="/" class>手机APP</router-link>
          </li>
          <li class="nav-branch with-sub">
            <a href="javascript:void(0)" class>商家中心</a>
            <dl class="branch-list e-buz">
              <dd>
                <a class="branch-item">登录商家中心</a>
              </dd>
              <dd>
                <a class="branch-item">美团智能收银</a>
              </dd>
              <dd>
                <a class="branch-item">我想合作</a>
              </dd>
              <dd>
                <a class="branch-item">手机免费开店</a>
              </dd>
              <dd>
                <a class="branch-item">餐饮代理商招募</a>
              </dd>
              <dd>
                <a class="branch-item">商家申请开票</a>
              </dd>
              <dd>
                <a class="branch-item">免费合作美团排队</a>
              </dd>
            </dl>
          </li>
          <li class="nav-branch with-sub">
            <a href="javascript:void(0)">网站导航</a>
            <div class="branch-list web-map">
              <dl class="cate-list hotel">
                <dt class="cate-title">酒店旅游</dt>
                <dd>
                  <router-link to="/">国际机票</router-link>
                </dd>
                <dd>
                  <router-link to="/">火车票</router-link>
                </dd>
                <dd>
                  <router-link to="/">榛果民宿</router-link>
                </dd>
                <dd>
                  <router-link to="/">经济型酒店</router-link>
                </dd>
                <dd>
                  <router-link to="/">主题酒店</router-link>
                </dd>
                <dd>
                  <router-link to="/">商务酒店</router-link>
                </dd>
                <dd>
                  <router-link to="/">公寓</router-link>
                </dd>
                <dd>
                  <router-link to="/">豪华酒店</router-link>
                </dd>
                <dd>
                  <router-link to="/">客栈</router-link>
                </dd>
                <dd>
                  <router-link to="/">青年旅社</router-link>
                </dd>
                <dd>
                  <router-link to="/">度假酒店</router-link>
                </dd>
                <dd>
                  <router-link to="/">别墅</router-link>
                </dd>
                <dd>
                  <router-link to="/">农家院</router-link>
                </dd>
              </dl>
              <dl class="cate-list food">
                <dt class="category">吃美食</dt>
                <dd>
                  <router-link to="/">烤鱼</router-link>
                </dd>
                <dd>
                  <router-link to="/">特色小吃</router-link>
                </dd>
                <dd>
                  <router-link to="/">烧烤</router-link>
                </dd>
                <dd>
                  <router-link to="/">自助餐</router-link>
                </dd>
                <dd>
                  <router-link to="/">火锅</router-link>
                </dd>
                <dd>
                  <router-link to="/">代金券</router-link>
                </dd>
              </dl>
              <dl class="cate-list movie">
                <dt>看电影</dt>
                <dd>
                  <router-link to="/">热映电影</router-link>
                </dd>
                <dd>
                  <router-link to="/">热门影院</router-link>
                </dd>
                <dd>
                  <router-link to="/">热映电影口碑榜</router-link>
                </dd>
                <dd>
                  <router-link to="/">最受期待电影</router-link>
                </dd>
                <dd>
                  <router-link to="/">国内票房榜</router-link>
                </dd>
                <dd>
                  <router-link to="/">北美票房榜</router-link>
                </dd>
                <dd>
                  <router-link to="/">电影排行榜</router-link>
                </dd>
              </dl>
              <dl class="cate-list app">
                <dt>手机应用</dt>
                <dd>
                  <a href>
                    <img
                      class="appicon"
                      src="/image/site-header/meituan.png"
                      title="美团app"
                      alt="美团app"
                    >
                  </a>
                </dd>
                <dd>
                  <a href>
                    <img
                      class="appicon"
                      src="/image/site-header/waimai.png"
                      title="外卖app"
                      alt="外卖app"
                    >
                  </a>
                </dd>
                <dd>
                  <a href>
                    <img
                      class="appicon"
                      src="/image/site-header/zhenguo.png"
                      title="榛果app"
                      alt="榛果app"
                    >
                  </a>
                </dd>
                <dd>
                  <a href>
                    <img
                      class="appicon"
                      src="/image/site-header/dianping.png"
                      title="点评app"
                      alt="点评app"
                    >
                  </a>
                </dd>
                <dd>
                  <a href>
                    <img
                      class="appicon"
                      src="/image/site-header/maoyan.png"
                      title="猫眼app"
                      alt="猫眼app"
                    >
                  </a>
                </dd>
              </dl>
            </div>
          </li>
        </ul>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { getCurrentLocation } from '@/api/api';
import { checkStorageExpire, removeDataStorage } from '@/utils/util';

export default {
  computed: {
    ...mapState(['location', 'nearby', 'username']),
  },
  methods: {
    ...mapMutations(['changeLocation', 'changeNearby', 'changeUsername']),
    ...mapActions(['dispatchUserBrief']),
    // 初始化当前城市信息
    initCurrentCity() {
      getCurrentLocation().then((res) => {
        const { city, nearby } = res.data.data;
        this.changeLocation(city);
        this.changeNearby(nearby);
      });
    },
    // 初始化用户登录信息
    initUserLog() {
      const username = this.$readCache('username');
      if (username) {
        const nowTime = new Date().getTime() / 1000;
        const isExpire = checkStorageExpire(nowTime, username.time);
        if (!isExpire) {
          this.dispatchUserBrief();
          this.changeUsername(username.name);
        } else {
          removeDataStorage('username');
        }
      }
    },
    // 用户退出登录
    logout() {
      this.changeUsername(null);
      this.$removeCache('username');
      this.$router.push({ name: 'index' });
      if (this.$router.history.current.name === 'index') { // 如果位于index页面,需要刷新页面来更新组件
        window.location.reload();
      }
    },
  },
  created() {
    this.initCurrentCity();
    this.initUserLog();
  },
};
</script>

<style lang = "scss">
@import "@/style/header/top.scss";
</style>
