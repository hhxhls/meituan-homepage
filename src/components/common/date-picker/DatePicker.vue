<template>
    <div class="date-picker">
        <span class="des dialog-lab">生日</span>
        <div class="picker-box">
            <select
                id="birth-year"
                v-model="year"
                @change="dateSelected">
                <option
                    v-for="y in 80"
                    :key="y"
                    :value="currentYear - y">{{currentYear - y}}</option>
            </select>
            <span class="des">年</span>
            <select
                id="birth-month"
                v-model="month"
                @change="dateSelected">
                <option
                    v-for="m in 12"
                    :key="m"
                    :value="m ">{{m}}</option>
            </select>
            <span class="des">月</span>
            <select
                id="birth-day"
                v-model="day"
                @change="dateSelected">
                <option
                    v-for="d in getDayNumber"
                    :key="d"
                    :value="d">{{d}}</option>
                </select>
            <span class="des">日</span>
        </div>

    </div>
</template>

<script>
import { isLeapYear } from '@/utils/util';

export default {
  props: {
    // 日期选择器初始日期
    initDate: {
      type: String,
      default: '1970-01-01',
    },
  },
  data() {
    return {
      currentYear: 1970, // 当前年份，用于计算列表显示的年份范围
      year: 1970, // 选中的年份
      month: 1, // 选中的月份
      day: 1, // 选中的日期
    };
  },
  created() {
    this.currentYear = new Date().getFullYear();
    this.parseDate(this.initDate);
  },
  methods: {
    parseDate(str) { // 将日期字符串拆解成年月日形式
      if (typeof str !== 'string') {
        return;
      }
      const dateArr = str.split('-');
      this.year = Number(dateArr[0]);
      this.month = Number(dateArr[1]);
      this.day = Number(dateArr[2]);
      console.log(this.day);
    },

    dateToString() { // 将年月日拼接成日期字符串
      return `${this.year}-${this.month}-${this.day}`;
    },

    dateSelected() { // 触发日期选中后的事件回调函数
      const str = this.dateToString();
      this.$emit('datechange', str);
    },
  },
  computed: {
    getDayNumber() { // 获取选中月份的天数
      const isLeap = isLeapYear(this.year);
      const { month } = this;
      const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let ret = daysOfMonth[month - 1];
      if (isLeap && month === 2) {
        ret++;
      }
      return ret;
    },
  },
};
</script>

<style lang="scss">
  @import '@/style/common/date-picker.scss';
</style>
