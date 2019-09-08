<template>
    <div>
        <c-top/>
        <c-search-bar/>
    </div>
</template>

<script>
import CTop from './subs/Top.vue';
import CSearchBar from './subs/SearchBar.vue';

export default {
  components: {
    CTop,
    CSearchBar,
  },
};
</script>

<style lang = "scss">
  @import "@/style/header/header.scss";
</style>
