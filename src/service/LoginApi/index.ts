import request from "@/service";
import type { RegisterType,LoginType } from "./types";

enum loginApi{
  register = '/user/sign_up',
  login = '/user/sign_in',
  logout = '/user/sign_out'
}

export function register(data:RegisterType){
  return request.post({
    url:loginApi.register,
    data
  })
}

export function login(data:LoginType){
  return request.post({
    url:loginApi.login,
    data
  })
}

export function logout(){
  return request.post({
    url:loginApi.logout
  })
}