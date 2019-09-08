<template>
  <div class="user-orders account-box" v-if="userOrder">
    <div class="order-head account-head">
      <ul class="head-list">
        <li
          v-for="(item,index) in userOrder"
          :key="index"
          class="head-tab"
          :class="{active: activeTab === item.cate}"
          @click="changeStatus(index)"
        >
          {{item.text}}
          <span
            v-if="item.details.total > 0 && index !== 0">
            {{item.details.total}}
          </span>
        </li>
      </ul>
    </div>
    <div class="order-main account-main">
      <div class="order-item main-item"
           v-for="(item,index) in userOrder[activeTab].details.orders"
           :key="index">
        <div class="order-content">
          <a class="img-box" :href="item.orderDetail">
            <img :src="item.dealpic" alt class="order-image" />
          </a>
          <div class="order-info">
              <div class="info-content">
                <p class="title">
                  <a :href="item.orderDetail">{{item.title}}</a>
                </p>
                <div class="more-infos">
                  <p class="infos">{{item.orderinfo[0]}}</p>
                  <p class="infos">{{item.orderinfo[1]}}</p>
                </div>
              </div>
          </div>
          <div class="price">{{item.orderinfo[2]}}</div>
          <div class="statu">{{item.showstatus}}</div>
        </div>
      </div>
       <div class="no-item" v-if="userOrder[activeTab].details.total === 0">
            {{userOrder[activeTab].noitem}}
       </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      activeTab: 0, // 当前用户订单分页
    };
  },
  computed: {
    ...mapState(['username']),
    ...mapState('account', ['userOrder']),
  },
  watch: {
    $route(to) {
      this.activeTab = to.params.status;
    },
  },
  methods: {
    ...mapActions('account', ['dispatchUserOrder']),
    // 改变页面status，切换分页
    changeStatus(index) {
      this.$router.push({
        name: 'userorders',
        params: {
          status: index,
        },
      });
    },
  },
  created() {
    this.dispatchUserOrder({ username: this.username });
    this.activeTab = this.$route.params.status || 0;
  },
};
</script>

<style lang="scss">
@import "@/style/account/user-orders.scss";
</style>
