const prefix = "code_hub";

export const setLocal = (k, v) => {
  window.localStorage.setItem(`${prefix}_${k}`, JSON.stringify(v));
};

export const getLocal = (k) => {
  const itemStr = window.localStorage.getItem(`${prefix}_${k}`);
  return itemStr ? JSON.parse(itemStr) : null;
};
