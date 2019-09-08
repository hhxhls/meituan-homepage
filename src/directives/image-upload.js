// 自定义指令 v-imageupload，控制图片的上传和上传图片后回调函数的调用
export default {
  inserted(el, binding) {
    if (!binding.value) {
      return;
    }

    const file = document.createElement('input');
    file.setAttribute('type', 'file');
    el.addEventListener('click', () => {
      // 触发文件上传选框
      file.click();
    });
    const handler = function handler() {
      const imgFile = file.files[0];
      if (!imgFile) {
        return;
      }
      const reader = new FileReader();
      // 当图片上传完毕时调用自定义指令的绑定函数，并传入filereader读取的data64字符串
      // 因为Vue中methods内的方法会将this绑定为vue实例，所以call的第一参数仅用于占位
      // 在函数中仍可以使用this指代组件实例
      reader.onload = function getUrl(e) {
        const { result } = e.target;
        binding.value.call(null, result);
      };
      reader.readAsDataURL(imgFile);
    };
    file.addEventListener('change', handler);
  },
};
