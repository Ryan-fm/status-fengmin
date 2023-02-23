import router from "@/router"
import { whiteList } from "@/config/white-list"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import storage from '@/utils/useStorage'
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  // 判断该用户是否登录
  if (storage.get('isCookie')) {
    next()
    NProgress.done()
  } else {
    // 如果没有 Token
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果在免登录的白名单中，则直接进入
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面
      next("/")
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
