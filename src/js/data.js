import { get, writable } from "svelte/store";

export class Item extends EventTarget{
    constructor(data){
        super();
        this._data = writable(data);
        this._data.subscribe(e=>this.emit("update",e))
    }
    get data(){
        return get(this._data);
    }
    set data(data){
        this._data.update(_=>data);
    }
    on(evt,fn){
        this.addEventListener(evt,fn);
        return this;
    }
    emit(evt,data){
        this.dispatchEvent(
            data?
            new CustomEvent(evt,{detail:data}):
            new Event(evt)
        )
        return this;
    }
}

export class Store extends Item{
    constructor(data){
        super([]);
        if(Array.isArray(data))this.import(data);
    }
    use(config){
        let {store,key} = config;
        if(!key)key = "data";
        const condi = ({
            local:localStorage,
            session:sessionStorage
        })[store]
        
        condi?((a)=>{
            const data = a.getItem(key);
            if(data)this.import(data)
            else a.setItem(key,JSON.stringify([]))
        })(condi):false;

        this.on("change",({target})=>condi?
        condi.setItem(key,JSON.stringify(target.export())):
        false
        )
        return this;
    }
    add(data){
        this.data.push({
            id:this.data.length,
            data:new Item(data)
        })
        this.emit("change",{add:this.data});
        return this;
    }
    get(id){
        let data = this.data.filter(a=>a.id===id)
        if(data[0])return data[0].data;
        else this.emit("error",new Error("not exist item"));
    }
    del(id){
        this.data = this.data.filter(a=>a.id!==id);
        this.emit("change",{del:id});
        return this;
    }
    export(){
        return this.data.map(e=>e.data.data);
    }
    import(data){
        if(typeof data === "string"){
            this.import(JSON.parse(data))
        }else if(Array.isArray(data)){
            this.data = data.map((e,i)=>{
                let res = {};
                if(!e.id)res.id = i;else res.id = e.id;
                res.data = new Item(e);
                res.data.on("update",({detail})=>this.emit("change",{item:{data:detail,id:i}}))
                return res;
            });
            this.emit("change",{import:this.data});
        }else throw new Error("require string or array");
        return this;
    }
}