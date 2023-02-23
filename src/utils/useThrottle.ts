// 节流
let timer:any = null

const throttle = (fn:Function,delay=300) => {
  if (!timer){
    timer = setTimeout(() => {
      fn()
      clearTimeout(timer)
      timer = null
    },delay)
  }
}

export default throttle