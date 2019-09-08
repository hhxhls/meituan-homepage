<template>
    <div class="user-comments">
        <p class="comment-title">
            <span class="title-text">{{commentList.total}}条网友评论</span>
            <span class="sort">
                <a :class="{'by-quality':true,'active':commentOrder ==='default'}"
                    @click="changeSort('default')">质量排序</a>
                <a :class="{'by-time':true,'active':commentOrder==='time'}"
                    @click="changeSort('time')"> 时间排序</a>
            </span>
        </p>
        <div class="comment-container">
            <ul class="tag-list">
                <li
                  class="tag"
                  :class="{'choose':filterTagType === index}"
                v-for="(item,index) in commentList.tags"
                :key="index"
                @click="changeTagFilter(index)"
                >{{item.tag}}({{item.count}})</li>
            </ul>
            <div class="img-only"
                 @click="toggleImgOnly">
                <span
                      class="tick"
                      :class="{'ticked':imageCommentOnly}"
                ></span>
                只看有图片的评论
            </div>
            <ul class="common-list">
                <li
                v-for="(item,index) in displayComments"
                :key="index"
                class="comment-item"
                >
                    <div class="avatar-box">
                        <img :src="item.userUrl" alt="" class="avatar">
                    </div>
                    <div class="comment-box">
                    <p class="user-name">{{item.userName}}</p>
                    <p  class="rate-with-date">
                        <el-rate class="rate"
                        :value="(item.star / 10)"
                            disabled
                        ></el-rate>
                        <span class="date">{{getDate(item.commentTime)}}</span>
                    </p>
                    <div class="comment-detail">
                        {{item.comment}}
                    </div>
                    <div class="merchant-reply" v-if="item.merchantComment">
                        商家回复: {{item.merchantComment}}
                    </div>
                    <div class="image-box" v-if="item.picUrls && item.picUrls.length > 0">
                        <img  v-for="(img,i) in item.picUrls"
                            :key="i"
                            :src="img.url || img" class="commnet-image">
                    </div>
                    <div class="like-bar">
                        <span class="iike-item"
                              :class="{'liked':item.alreadyZzz}"
                              @click="userLikeChange(item.did,item.alreadyZzz)">
                            <i class="like-icon"></i>
                            <span>赞</span>
                        </span>
                    </div>
                    </div>
                </li>
            </ul>
          <section class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pageItemNumber"
              :total="commentList.total"
              :current-page="currentPage"
              :pager-count="7"
              @current-change="pageChange"
            >
            </el-pagination>
          </section>
        </div>

    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    commentList: { // 评论列表数据
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      commentOrder: 'default', // 评论排列顺序
      pageItemNumber: 10, // 每页评论次数
      imageCommentOnly: false, // 是否只展示带图片的评论
      filterTagType: -1, // 过滤评论的tag，-1代表显示全部
      currentPage: 1, // 当前页数
    };
  },
  computed: {
    ...mapState(['username']),
    displayComments() { // 页面中经过滤和排序后显示的评论列表
      let list = this.sortComment(this.commentList.comments);
      list = this.filterComment(list);
      return list;
    },
  },
  methods: {
    ...mapActions('product', ['dispatchCommentLikeToggle']),
    getDate(time) { // 根据时间戳获得评论日期
      const timeStamp = Number(time);
      if (Number.isNaN(timeStamp)) {
        return time;
      }
      const year = new Date(timeStamp).getFullYear();
      const month = new Date(timeStamp).getMonth() + 1;
      const date = new Date(timeStamp).getDate();
      return `${year}年${month}月${date}日`;
    },
    sortComment(commentList) { // 对页面进行排序
      const temp = Object.assign([], commentList);
      if (this.commentOrder === 'time') {
        temp.sort((a, b) => b.commentTime - a.commentTime);
      }
      return temp;
    },
    filterComment(commentList) { // 过滤评论
      let list = Object.assign([], commentList);
      if (this.imageCommentOnly === true) {
        list = list.filter(ele => ele.picUrls && ele.picUrls.length !== 0);
      }
      return list;
    },
    changeSort(type) { // 改变排列顺序类型
      this.commentOrder = type;
      this.queryComment();
    },
    toggleImgOnly() { // 改变是否只显示带图片的信息
      this.imageCommentOnly = !this.imageCommentOnly;
      this.queryComment();
    },
    changeTagFilter(index) { // 改变过滤tag
      if (this.filterTagType === index) {
        this.filterTagType = -1;
      } else {
        this.filterTagType = index;
      }
      this.queryComment();
    },
    pageChange(current) {
      this.currentPage = current;
      this.queryComment();
    },
    queryComment() { // 请求过滤和排序后的评论，由于部分美团的接口未暴露，此处只做演示
      const page = this.currentPage;
      const tag = this.filterTagType === -1 ? '' : this.commentList.tags[this.filterTagType].tag;
      const sort = this.commentOrder;
      const imgOnly = this.imageCommentOnly;
      this.$emit('querycomment', {
        page,
        tag,
        sort,
        imgOnly,
      });
    },
    userLikeChange(did, like) { // 处理对评论的点赞 / 取消点赞
      this.dispatchCommentLikeToggle({
        did,
        like,
        username: this.username,
      });
    },
  },
};
</script>

<style lang="scss">
    @import '@/style/common/comment-box.scss';
</style>
