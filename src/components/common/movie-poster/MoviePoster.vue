<template>
    <a href="" class="movie-poster">
        <img :src="img" alt="" class="poster-img">
        <img :src="`/image/index/movie/${filmMarl}.png`" alt="" class="movie-mark" v-if="filmMarl">
        <div class="movie-info">
            <div class="score info-top" v-if="globalReleased">
                观众评
                <span> {{sc}}</span>
            </div>
            <div class="booking info-top" v-else>
                <span>{{wish}}</span>
                观众人想看
            </div>
            <div class="info-bottom">
                <span class="movie-name">{{nm}}</span>
                <span class="movie-booking">{{globalReleased ? '购票':'预售'}}</span>
            </div>
        </div>
    </a>
</template>

<script>
export default {
  props: {
    img: { // 海报图片地址
      type: String,
      required: true,
    },
    href: { // 海报链接地址
      type: String,
      required: true,
    },
    filmMarl: { // 电影标签 如 iMax
      type: String,
      default: '',
    },
    globalReleased: { // 是否已经上映
      type: Boolean,
      required: true,
    },
    sc: { // 当前评分
      type: Number,
      required: true,
    },
    wish: { // 有多少人想看
      type: Number,
      required: true,
    },
    nm: { // 电影名称
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
    @import '@/style/common/movie-poster.scss';
</style>
