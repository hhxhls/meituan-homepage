<template>
  <div class="user-voucher account-box" v-if="userVoucher">
    <div class="voucher-head account-head">
      <ul class="head-list">
        <li
          v-for="(item,index) in userVoucher"
          :key="index"
          class="head-tab"
          :class="{active: activeTab === item.cate}"
          @click="changeStatus(index)"
        >{{item.text}}</li>
      </ul>
    </div>
    <div class="voucher-main account-main">
      <div
        class="voucher-item"
        v-for="(item,index) in userVoucher[activeTab].details.list"
        :key="index">
          <div class="voucher-card">
            <div class="card-head">
               <div class="card-box">
                  <i class="back-icon"></i>
                   <p class="price">
                     <span class="mark">￥</span>
                     <span class="number">{{item.value}}</span>
                   </p>
                   <div class="more-info">
                      <p class="type">{{item.voucheTypeDesc}}</p>
                      <p class="valid-time">有效期至： {{getDate(item.endTime * 1000)}}</p>
                   </div>
               </div>
            </div>
            <div class="card-body">
              <p class="title">{{item.title}}</p>
              <p class="des">{{item.vdescription}}</p>
               <i class="expire" v-if="activeTab === 1"></i>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      activeTab: 0, // 当前用户优惠券分页
    };
  },
  computed: {
    ...mapState(['username']),
    ...mapState('account', ['userVoucher']),
  },
  watch: {
    $route(to) {
      this.activeTab = to.params.status;
    },
  },
  methods: {
    ...mapActions('account', ['dispatchUserVoucher']),
    // 改变当前分页
    changeStatus(index) {
      this.$router.push({
        name: 'uservouchers',
        params: {
          status: index,
        },
      });
    },
    // 根据数据中的时间戳获得优惠券有效日期
    getDate(time) {
      const timeStamp = Number(time);
      if (Number.isNaN(timeStamp)) {
        return time;
      }
      const year = new Date(timeStamp).getFullYear();
      const month = new Date(timeStamp).getMonth() + 1;
      const date = new Date(timeStamp).getDate();
      return `${year}-${month}-${date}`;
    },
  },
  created() {
    this.dispatchUserVoucher({ username: this.username });
    this.activeTab = this.$route.params.status || 0;
  },
};
</script>

<style lang="scss">
@import "@/style/account/user-vouchers.scss";
</style>
