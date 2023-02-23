import Request from './request'

const request = new Request({
  baseURL: 'https://127.0.0.1:8081',
  timeout: 10000,
  withCredentials: true,
  headers:{
    'Cookie':document.cookie,
    // Authorization: 'Bearer ' + storage.get('token')
  },
  interceptors: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default request