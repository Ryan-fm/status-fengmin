// 深拷贝
const deepClone = (data: any) => {
  if (typeof data !== "object") return data;
  const source: any = Array.isArray(data) ? [] : {};
  for (const i in data) {
    if (typeof data[i] === "object") {
      source[i] = deepClone(data[i]);
    } else {
      source[i] = data[i];
    }
  }
  return source;
};

export default deepClone