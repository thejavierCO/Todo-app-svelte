import { writable } from "svelte/store"
import { v4 as uuidv4 } from "uuid";

export class dbStore extends EventTarget {
  constructor(fnsDefaultStore) {
    super();
    this.store = writable([], fnsDefaultStore);
    this.on("Item",({detail:{type,data}})=>{
      this.store.update(e=>{
        this.emit(type, data)
        switch(type){
          case "add":return [...e,data];
          case "del":return e.filter(e=>e.id!=data.id);
          case "edit":
            return e.map(e=>{
              let {id,data:item} = data;
              if(e.id==id)Object.keys(item).forEach((k) => (e[k] != item[k])?e[k] = item[k]:"");
              return e;
            })
          case "clear":return [];
          default:return e;
        }
      })
    })
  }
  add(data) {
    let { id } = data;
    if (!id) data.id = uuidv4();
    this.emit("Item", {type:"add",data});
    return this;
  }
  del(id) {
    this.emit("Item", {type:"del",data:{id}});
    return this;
  }
  edit(id, data) {
    this.emit("Item", {type:"edit",data:{id,data}});
    return this;
  }
  clear(){
    this.emit("Item", {type:"clear",data:null});
    return this;
  }
  emit(name, data) {
    if (data) return this.dispatchEvent(new CustomEvent(name, { detail: data ,cancelable: true}))
    else return this.dispatchEvent(new Event(name, {cancelable: true}))
  }
  on(name, callback) {
    this.addEventListener(name, callback);
    return this;
  }
}

export class localStorageDb {
  constructor() {
    this.keys = [];
    this.storageChange(({ key, newValue }) => {
      if(key != null){
        try{
          this.get(key).start({type:"updateStorage",data:newValue});
        }catch(e){
          console.error(e)
        }
      }else this.keys.forEach(({ start }) => start({type:"clear",data:null}))
    })
  }
  storageChange(fns) {
    window.addEventListener("storage", fns);
  }
  use(key, start) {
    if (typeof key !== "string") throw "require key type string"
    start({type:"init",data:localStorage.getItem(key)})
    this.keys.push({ key, start })
    return this;
  }
  get(key) {
    let item = this.keys.filter(e => e.key == key);
    if (item.length != 1) throw "not exist key in localstore"
    return { start: (data) => item[0].start(data) };
  }
}

export class dbStoreUseLocalStorage extends dbStore {
  constructor(fnsUnsuscribe) {
    super(fnsUnsuscribe);
    this.keysStore = new localStorageDb();
    this.keysStore.use("store", ({ type, data }) => {
      switch (type) {
        case "init":
          if(data == null)localStorage.setItem("store","[]");
          else this.store.set(JSON.parse(data));
          break;
        case "updateStorage":
          this.store.set(JSON.parse(data));
          break;
        case "updateStore":
          localStorage.setItem("store", data);
          break;
        case "clear":
          this.clear();
          break;
      }
    })
    this.Destroy = this.store.subscribe((data) => this.keysStore.get("store").start({type:"updateStore",data:JSON.stringify(data)}))
  }
}