interface RegisterType {
  usrname:string|undefined,
  password:string|number|undefined,
  retype:string|number|undefined
}

interface LoginType {
  usrname:string|undefined,
  password:string|number|undefined
}

export type {RegisterType,LoginType}