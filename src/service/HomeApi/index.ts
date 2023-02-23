import request from "@/service";
import type { } from "./types";

enum loginApi{
  getWebsocket = '/service'
}

export function getWebsocket(){
  return request.post({
    url:loginApi.getWebsocket
  })
}
