<template>
    <div class="user-favor account-box" v-if="userFavor">
      <div class="favor-head account-head" >
          <ul class="head-list">
            <li
              v-for="(item,index) in userFavor"
              :key="index"
              class="head-tab"
              :class="{active: activeTab === item.cate}"
              @click="changeStatus(index)"
            >
              {{item.text}}
            </li>
          </ul>
      </div>
      <div class="favor-main account-main">
        <div class="favor-item main-item"
           v-for="(item,index) in userFavor[activeTab].details.list"
           :key="index">
        <div class="favor-content">
          <div class="img-box">
            <img :src="item.poimodel.imgurl" alt class="order-favor" />
          </div>
          <div class="favor-info">
              <div class="info-content">
                <p class="title">
                  <span>{{item.poimodel.title}}</span>
                </p>
                <div class="more-infos">
                  <el-rate
                          class="rating"
                          :value ="item.poimodel.avgScore"
                          :colors="['#FF9900','#FF9900','#FF9900']"
                          disabled
                          ></el-rate>
                  <span class="socre infos">{{item.poimodel.avgScore}}分</span>
                  <span class="average-spend infos">人均￥{{item.poimodel.avgPrice}}</span>
                </div>
                  <p class="location">
                    {{item.poimodel.areaName}}
                    {{item.poimodel.cateName}}
                     </p>
                </div>
          </div>
          <div class="btn-box">
            <a :href="`/product/${item.poimodel.poiid}`" class="to-favor">进入商家</a>
              <i class="del" @click="deleteFavor(index)"></i>
          </div>
        </div>
      </div>
       <div class="no-item" v-if="userFavor[activeTab].details.count === 0">
            {{userFavor[activeTab].noitem}}
       </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { deleteUserFavor } from '@/api/api';

export default {
  data() {
    return {
      activeTab: 0, // 当前用户收藏分页
    };
  },
  computed: {
    ...mapState(['username']),
    ...mapState('account', ['userFavor']),
  },
  methods: {
    ...mapActions('account', ['dispatchUserFavor']),
    ...mapMutations('account', ['deleteUserFavor']),
    // 切换用户收藏分页
    changeStatus(index) {
      this.$router.push({
        name: 'userfavors',
        params: {
          status: index,
        },
      });
    },
    // 删除收藏页
    async deleteFavor(index) {
      const item = this.userFavor[this.activeTab].details;
      const cate = this.activeTab;
      const { poiid } = item.list[index].poimodel;
      const res = await deleteUserFavor({
        username: this.username,
        poiid,
        cate,
      });
      if (res.data && res.data.status === 'success') {
        this.deleteUserFavor(cate, poiid);
      }
    },
  },
  watch: {
    // 观测路由的参数变化
    $route(to) {
      this.activeTab = to.params.status;
    },
  },
  created() {
    this.dispatchUserFavor({ username: this.username });
    this.activeTab = this.$route.params.status || 0;
  },
};
</script>

<style lang="scss">
  @import '@/style/account/user-favors.scss';
</style>
