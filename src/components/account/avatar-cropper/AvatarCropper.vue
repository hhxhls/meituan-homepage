<template>
    <div class="crop-container">
        <div class="crop-board">
            <img :src="source" alt="" ref="img">
        </div>
        <div class="avatar-preview" ref="preview"></div>
    </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

export default {
  props: {
    source: { // 用于裁剪的图片素材
      type: String,
    },
  },
  data() {
    return {
      cropper: null, // 裁剪插件实例数据
    };
  },
  mounted() {
    const { img } = this.$refs;
    const { preview } = this.$refs;
    const cropperOption = {
      // restrict select box to not exceed cropper img
      viewMode: 1,
      // choose to not use dragMode
      dragMode: 'none',
      // set initialratio to 1
      initialAspectRatio: 1,
      // limit aspectRatio always to be 1
      aspectRatio: 1,
      data: null,
      preview,
      responsive: true,
      restore: false,
      modal: true,
      guides: false,
      center: false,
      highlight: true,
      // disable grid background
      background: false,
      autoCropArea: 0.5,
      movable: false,
      zoomable: false,
      // minContainerWidth:300,
      // minContainerHeight:300,
      minCropBoxWidth: 102,
      minCropBoxHeight: 102,
      ready() {
        this.cropper.crop();
      },
    };
    img.onload = () => {
      this.cropper = new Cropper(img, cropperOption);
    };
  },
};
</script>

<style lang="scss">
    @import '@/style/account/avatar-cropper.scss';
</style>
