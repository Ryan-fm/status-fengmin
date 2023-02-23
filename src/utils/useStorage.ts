// 本地缓存
const storage = {
    set(key:string,value:any){
        localStorage.setItem(key,JSON.stringify(value))
    },
    get(key:string){
        return JSON.parse(localStorage.getItem(key)!)
    },
    remove(key:string){
        localStorage.removeItem(key)
    },
    clear(){
        localStorage.clear()
    }
}

export default storage