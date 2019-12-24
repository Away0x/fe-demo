export const getCount = (count: number) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 10000) + "万";
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
}

export const debounce = (func: Function, delay: number) => {
  let timer: any;
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
      clearTimeout(timer);
    }, delay);
  }
};

// 判断一个对象是否为空
export const isEmptyObject = (obj: object) => !obj || Object.keys(obj).length === 0;
