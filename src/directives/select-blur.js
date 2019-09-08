export default {
  bind(el, binding) {
    document.addEventListener('click', binding.value);
  },
};
