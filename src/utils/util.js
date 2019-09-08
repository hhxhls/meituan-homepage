
const storageLimit = 86400;
function debounce(callback, timeWait) {
  let timer = null;
  return function fn() {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(callback, timeWait);
  };
}

function setDataStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

function getDataStorage(name) {
  let ret;
  const cache = localStorage.getItem(name);
  try {
    ret = JSON.parse(cache);
  } catch (e) {
    ret = cache;
  }

  return ret;
}
function removeDataStorage(name) {
  localStorage.removeItem(name);
  return true;
}

function throttle(fn, time = 50, maxLog = 200, context = this) {
  // eslint-disable-next-line no-unused-vars
  let timer = null;
  let prevTime = new Date().getTime();
  // eslint-disable-next-line func-names
  const decoratedFn = function () {
    fn.call(context);
    prevTime = new Date().getTime();
  };
  return function callback() {
    const nowTime = new Date().getTime();
    if (nowTime - prevTime > maxLog) {
      decoratedFn();
    } else {
      // 会被反复覆盖
      timer = setTimeout(decoratedFn, time);
    }
  };
}

function isLeapYear(year) {
  if (year % 4 !== 0) {
    return false;
  } if (year % 100 === 0 && year % 400 !== 0) {
    return false;
  }
  return true;
}

function getDate(timeStr) {
  const timeStamp = Number(timeStr);
  const year = new Date(timeStamp).getFullYear();
  const month = new Date(timeStamp).getMonth() + 1;
  const date = new Date(timeStamp).getDate();
  return `${year}年${month}月${date}日`;
}

function getElementAbsolutePosition(element) {
  let absoluteX = element.offsetLeft;
  let absoluteY = element.offsetTop;
  let currentParent = element.offsetParent;
  while (currentParent !== null) {
    absoluteX += currentParent.offsetLeft;
    absoluteY += currentParent.offsetTop;
    currentParent = currentParent.offsetParent;
  }
  return { x: absoluteX, y: absoluteY };
}

function checkStorageExpire(nowTime, recordTime) {
  return nowTime - recordTime > storageLimit;
}

export {
  debounce,
  setDataStorage,
  getDataStorage,
  throttle,
  isLeapYear,
  getElementAbsolutePosition,
  getDate,
  checkStorageExpire,
  removeDataStorage,
};
