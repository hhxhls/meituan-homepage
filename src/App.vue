<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'app',
  created() {
    const historySearch = this.$readCache('historySearch') || [];
    const historyCity = this.$readCache('historyCity') || [];
    this.setHistorySearch(historySearch);
    this.setHistoryCity(historyCity);
  },
  methods: {
    ...mapMutations(['setHistorySearch', 'setHistoryCity']),
  },
};
</script>

<style lang = "scss">

</style>
