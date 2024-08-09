import { writable, get as getStoreData } from "svelte/store"
import { v4 as uuidv4 } from "uuid";

export class dbStore extends EventTarget {
  constructor(fnsDefaultStore) {
    super();
    this.store = writable([], fnsDefaultStore);
    this.on("Item", ({ detail: { type, data } }) => {
      this.store.update(e => {
        this.emit(type, data)
        switch (type) {
          case "add": return [...e, data];
          case "del": return e.filter(e => e.id != data.id);
          case "edit":
            return e.map(e => {
              let { id, data: item } = data;
              if (e.id == id) Object.keys(item).forEach((k) => (e[k] != item[k]) ? e[k] = item[k] : "");
              return e;
            })
          case "clear": return [];
          case "insert":
            if (Array.isArray(data)) return data;
            else throw "require array for insert data"
          default: return e;
        }
      })
    })
  }
  get() {
    return getStoreData(this.store)
  }
  add(data) {
    let { id } = data;
    if (!id) data.id = uuidv4();
    this.emit("Item", { type: "add", data });
    return this;
  }
  del(id) {
    this.emit("Item", { type: "del", data: { id } });
    return this;
  }
  edit(id, data) {
    this.emit("Item", { type: "edit", data: { id, data } });
    return this;
  }
  clear() {
    this.emit("Item", { type: "clear", data: null });
    return this;
  }
  insert(data) {
    this.emit("Item", { type: "insert", data });
    return this;
  }
  emit(name, data) {
    if (data) return this.dispatchEvent(new CustomEvent(name, { detail: data, cancelable: true }))
    else return this.dispatchEvent(new Event(name, { cancelable: true }))
  }
  on(name, callback) {
    this.addEventListener(name, callback);
    return this;
  }
}

export class localStorageDb extends EventTarget{
  constructor() {
    super();
    this.keys = [];
    if(window)window.addEventListener("storage",(e)=>this.emit("storageChange",e))
    this.on("storageChange",({detail:{ key, newValue, oldValue }}) => {
      try{
        if (key != null) this.get(key).start({ type: "updateStorage", data: newValue });
        else this.keys.forEach(({ start }) => start({ type: "clear", data: null }))
      }catch(err){
        console.error(e);
      }
    })
  }
  use(key, start) {
    if (typeof key !== "string") throw "require key type string"
    start({ type: "init", data: localStorage.getItem(key) })
    this.keys = [...this.keys, { key, start }]
    return this;
  }
  get(key) {
    let item = this.keys.find(e => e.key == key);
    if (item) return item
    else throw "not exist elemment"
  }
  emit(name, data) {
    if (data) return this.dispatchEvent(new CustomEvent(name, { detail: data, cancelable: true }))
    else return this.dispatchEvent(new Event(name, { cancelable: true }))
  }
  on(name, callback) {
    this.addEventListener(name, callback);
    return this;
  }
}

export class dbStoreUseLocalStorage extends dbStore {
  constructor(fnsUnsuscribe) {
    super((setInternalStore)=>{
      this.localStorageKeys = new localStorageDb();
      this.localStorageKeys.use("store", ({ type, data }) => {
        let setLocalStore = (data) => localStorage.setItem("store", data);
        let getLocalStore = () => localStorage.getItem("store");
        switch (type) {
          case "init":
            if(getLocalStore()==null)setLocalStore("[]");
            else setInternalStore(JSON.parse(getLocalStore()));
            break;
          case "updateStorage":
            setInternalStore(JSON.parse(data))
            break;
          case "updateStore":
            setLocalStore(data);
            break;
          case "clear":
            setInternalStore([])
            break;
        }
      })
      this.Destroy = this.store.subscribe((data) => {
        if (JSON.stringify(data) != localStorage.getItem("store")) {
          this.localStorageKeys.get("store")
            .start({
              type: "updateStore",
              data: JSON.stringify(data)
            })
        }
      })
      return fnsUnsuscribe
    });
  }
}