// 防抖
let timer: any = null;

const debounce = (fn: Function, delay = 300) => {
  if (timer){
    clearTimeout(timer)
    timer = null
  }
  timer = setTimeout(fn, delay);
};
// let timer:any = null;

// const debounce = (value:any, delay = 0) => {
//   return customRef((track:Function,trigger:Function) => {
//     return {
//       get(){
//         track()
//         return value
//       },
//       set(val){
//         if(timer){
//           clearTimeout(timer)
//           timer = null
//         }
//         timer = setTimeout(() => {
//           value = val
//           trigger()
//         },delay)
//       }
//     }
//   })
// }

export default debounce