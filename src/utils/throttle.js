export default function (fn, wait = 200, delay = 50, context = this) {
  let timer = null;
  let originTime = new Date().getTime;
  const decoratedFn = function decoratedFn() {
    fn.call(context);
    originTime = new Date().getTime;
  };
  return function callback() {
    const nowTime = new Date().getTime;
    clearTimeout(timer);
    if (nowTime - originTime > wait) {
      decoratedFn();
    } else {
      timer = setTimeout(decoratedFn, delay);
    }
  };
}
