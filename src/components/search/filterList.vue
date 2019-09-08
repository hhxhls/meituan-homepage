<template>
    <dl class="filter-wrap" v-show="list.length > 0">
        <dt class="title">
            <span class="title-text">{{title}}</span>
            <span
              class="title-tag"
              :class="{'active-tag': activeTag === -1}"
              @click="ChooseAll">全部</span>
        </dt>
        <div class="list-wrap">
            <div v-for="(item,index) in applyList" :key="index">
                <div class="list-content">
                    <div  class="list-tag"
                          :class="{'with-detail': item.list.length > 0}"
                                    @click="item.list.length === 0 ?tagChoose('全部',index):''">
                                    <a
                                      class="tag-link"
                                      :class="{'active-tag': activeTag === index}"
                                      :key="index">
                                      <span >{{item.currentTitle}}</span>
                                      </a>
                                    </div>
                    <div :class="{'detail-container':true,
                                  'one-child': item.list.length === 1,
                                  'two-children': item.list.length === 2,
                                  'three-children': item.list.length === 3,
                                  }"
                                  v-if="item.list.length > 0"
                                  >
                        <span class="detail-title">{{item.title}}</span>
                        <div class="list-detail">
                            <div v-for ="(i,k) in item.list"
                            :key="k"
                            @click="tagChoose(i.tab,index)"
                             >{{i.tab}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </dl>
</template>

<script>
export default {
  props: {
    title: { // 筛选栏目名称
      type: String,
      required: true,
    },
    list: { // 筛选栏目tag列表
      type: Array,
      required: true,
    },
    filterKey: { // 筛选器标识名
      type: String,
      required: true,
    },
  },

  data() {
    return {
      activeTag: -1, // 选择的tag，-1表示“全部”
      currentTitle: '', // 选中的tag标题
      applyList: [],
    };
  },
  created() {
    this.applyList = Object.assign([], this.list);
    this.applyList.forEach((ele) => {
      const temp = ele;
      temp.currentTitle = temp.title;
    });
  },
  watch: {
    list(newVal) {
      this.applyList = Object.assign([], newVal);
      this.applyList.forEach((ele) => {
        const temp = ele;
        temp.currentTitle = temp.title;
      });
    },
  },
  methods: {
    tagChoose(tab, index) { // 用户选中tag
      const temp = this.applyList;
      const newTitle = tab === '全部' ? temp[index].title : tab;
      this.activeTag = index;
      temp.forEach((ele) => {
        const obj = ele;
        obj.currentTitle = obj.title;
      });
      temp[index].currentTitle = newTitle;
      this.applyList = temp;
      this.currentTitle = newTitle;
      this.updateFilterSelect();
      this.$forceUpdate();
    },
    ChooseAll() { // 用户点击“全部”标签
      this.activeTag = -1;
      this.currentTitle = '全部';
      const temp = this.applyList;
      temp.forEach((ele) => {
        const obj = ele;
        obj.currentTitle = obj.title;
      });
      this.applyList = temp;
      this.updateFilterSelect();
    },
    updateFilterSelect() { // 触发filterselect自定义事件
      const select = this.currentTitle === '全部' ? '' : this.currentTitle;
      this.$emit('filterselect', {
        type: this.filterKey,
        select,
      });
    },
  },
};
</script>

<style lang="scss">
    @import '@/style/search/filter-list.scss';
</style>
