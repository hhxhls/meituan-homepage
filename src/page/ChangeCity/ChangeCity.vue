<template>
  <div class="change-city-main">
    <el-row class="selector-wrap with-bottom-line">
      <div for class="choose-area">
        <h4>按省份选择：</h4>
        <div class="selectors">
          <c-select class="province choose"
                    placeholder="省份"
                    :optionList="provinceList"
                    selectName="province"
                    :dropDown="provinceDropDown"
                    @menudrop="onMenuDrop"
                    @menublur="onMenuBlur"
                    @selected="onProvinceSelected($event)"
                    ></c-select>
          <c-select class="city choose"
                    placeholder="城市"
                    :optionList="cityLists"
                    selectName="city"
                    :dropDown="cityDropDown"
                    :disabled="!provinceSelected"
                    @selected="onCityChange"
                    @menudrop="onMenuDrop"
                    @menublur="onMenuBlur"
                    ></c-select>
        </div>
      </div>
      <div for class="search-area">
        <h4>直接搜索：</h4>
        <el-input v-model="searchCity"
                  placeholder="请输入城市中文或拼音"
                  class="city-input"
                  @focus="searchCityFocus"
                  @blur="searchCityBlur"
                  @input="searchCityInput($event)"
        ></el-input>
        <div class="city-suggest-wrap" v-if="citySuggestionDropDown">
          <ul class="city-suggestion">
            <li class="city"
                v-for="(item,index) in citySuggestion"
                :key="index"
            >
              <a @click.prevent="onCityChange(item.districtName || item.cityName)">
                {{item.districtName || item.cityName}}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </el-row>
    <el-row class="keywords-wrap">
      <dl class="hot-city tag-list-wrap">
        <dt>热门城市：</dt>
        <dl>
          <dd v-for="(item,index) in hotCity" :key="index">
            <a @click.prevent="onCityChange(item.text)">{{item.text}}</a>
          </dd>
        </dl>
      </dl>
      <dl class="history-city tag-list-wrap">
        <dt>最近访问：</dt>
        <dl>
          <dd v-for="(item,index) in historyCity" :key="index">
            <a @click.prevent="onCityChange(item.text)">{{item}}</a>
          </dd>
        </dl>
      </dl>
    </el-row>
    <el-row class="alphabet-wrap">
      <dl class="top-list tag-list-wrap">
        <dt>按拼音首字母选择：</dt>
        <dl>
          <dd v-for="(item, index) in cityAlphabet.alphabet" :key="index">
            <a :href="`#city-${item}`" class="letter">{{item}}</a>
          </dd>
        </dl>
      </dl>
      <div class="detail-wrap">
        <dl
          class="detail-list"
          :id="`city-${item.alphabet}`"
          v-for="(item,index) in cityAlphabet.detail"
          :key="index">
          <dt class="tag-title">{{item.alphabet}}</dt>
          <dl class="tag-list">
            <dd class="tag-item" v-for="(i,k) in item.list" :key="k">
              <a @click.prevent="onCityChange(i.location)"
                 :class="{hotCity: i.hotCity}">{{i.location}}</a>
            </dd>
          </dl>
        </dl>
      </div>
    </el-row>
  </div>
</template>

<script>
import CSelect from '@/components/common/select/Select.vue';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    CSelect,
  },
  data() {
    return {
      provinceDropDown: false, // 控制省份列表下拉框
      cityDropDown: false, // 控制城市列表下拉框
      citySuggestionDropDown: false, // 控制城市搜索推荐列表下拉框
      provinceSelected: false, // 是否已选定省份
      searchCity: '', // 用户输入的搜索城市名
      selectedProvince: '', // 当前选定省份
    };
  },
  methods: {
    ...mapMutations(['setHistoryCity', 'updateHistoryCity', 'changeLocation']),
    ...mapActions('changeCity', ['dispatchProvinceList',
      'dispatchCityList',
      'dispatchCityAlphabet',
      'dispatchHotCity',
      'dispatchCitySuggestion',
    ]),
    // 选定城市后进行页面跳转
    onCityChange(city) {
      this.changeLocation(city);
      this.updateHistoryCity(city);
      this.$router.push({
        path: '/index',
      });
    },
    // 选择框下拉时触发，保证只有一个选择框处于下拉状态
    onMenuDrop(listName) {
      if (listName === 'province') {
        this.provinceDropDown = true;
        this.cityDropDown = false;
      } else {
        this.provinceDropDown = false;
        this.cityDropDown = true;
      }
    },

    // 鼠标点击选择器外时关闭选择器
    onMenuBlur(listName) {
      if (listName === 'province') {
        this.provinceDropDown = false;
      } else {
        this.cityDropDown = false;
      }
    },

    // 选定省份后获得城市列表
    onProvinceSelected(province) {
      this.provinceSelected = true;
      this.dispatchCityList({ province });
    },

    // 显示城市搜索提示信息
    searchCityFocus() {
      if (this.searchCity) {
        this.citySuggestionDropDown = true;
      }
    },
    // 鼠标点击城市搜索框外时关闭提示栏
    searchCityBlur() {
      this.citySuggestionDropDown = false;
    },
    // 用户键入信息时请求提示关键字
    searchCityInput(keyword) {
      if (!keyword) {
        this.citySuggestionDropDown = false;
        return;
      }
      this.citySuggestionDropDown = true;
      this.dispatchCitySuggestion({ keyword });
    },
  },
  computed: {
    ...mapState(['historyCity']),
    ...mapState('changeCity', {
      provinceList: state => state.provinceList,
      cityLists: state => state.cityLists,
      cityAlphabet: state => state.cityAlphabet,
      hotCity: state => state.hotCity,
      citySuggestion: state => state.citySuggestion,
    }),
  },
  created() {
    this.dispatchProvinceList();
    this.dispatchCityAlphabet();
    this.dispatchHotCity();
  },
};
</script>

<style lang = 'scss'>
@import "@/style/change-city/change-city.scss";
</style>
