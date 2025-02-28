function debounce(fn: any, delay: number) {
  let timer: any;

  return function (...args: any) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export default debounce;
