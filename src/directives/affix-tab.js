import { throttle } from '@/utils/util';
// 自定义指令 v-affixtab， 将一个tab栏目绑定各tab对应的内容主体，并跟随页面滚动到各内容主体切换tab栏目

export default {
  // 控制tab导航栏的固定和浮动
  inserted(el, binding) {
    function affixPostionChange() {
      const container = el.parentElement;
      const headToClientTop = el.offsetTop - window.pageYOffset;
      if (headToClientTop < 0) {
        el.classList.add('fixed');
        el.classList.remove('default');
      }
      if (container.offsetTop - window.pageYOffset >= 0) {
        el.classList.add('default');
        el.classList.remove('fixed');
      }
    }

    // 控制tab栏目的切换
    function tabShift() {
      const container = el.parentElement;
      const sectionClass = binding.value || '.scroll_section';
      const scrollEles = container.querySelectorAll(sectionClass);
      const tabs = el.querySelectorAll('.tab-item');
      tabs.forEach((tab, index) => {
        const ele = scrollEles[index];
        const eleSize = window.getComputedStyle(ele);
        const vBorder = parseFloat(eleSize.borderTop)
                                + parseFloat(eleSize.borderBottom);
        const vMargin = parseFloat(eleSize.marginTop)
                                + parseFloat(eleSize.marginBottom);
        const headToClientTop = ele.offsetTop - window.pageYOffset;
        const bottomToClientTop = headToClientTop + ele.offsetHeight + vBorder
                                            + vMargin;
        if (headToClientTop <= 0 && bottomToClientTop > 0) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
    }
    window.addEventListener('scroll', throttle(tabShift));
    window.addEventListener('scroll', throttle(affixPostionChange));
  },
};
