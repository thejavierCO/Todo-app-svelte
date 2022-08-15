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
        this.dispatchEvent(new CustomEvent(evt,{detail:data}))
        return this;
    }
}

export class Store extends Item{
    constructor(data){
        super([]);
        if(Array.isArray(data))this.data = data.map((e,i)=>{
            let res = {};
            if(typeof e === "object")if(!e.id)res.id = i;else res.id = e.id;
            res.data = new Item(e);
            return res;
        });
    }
    add(data){
        this.data.push({
            id:this.data.length,
            data:new Item(data)
        })
        this.emit("change",this.data);
        return this;
    }
    get(id){
        return this.data.filter(a=>a.id==id)[0].data;
    }
    del(id){
        this.data = this.data.filter(a=>a.id!==id);
        this.emit("delete",{id});
        this.emit("change",this.data);
        return this;
    }
    export(){
        return this.data.map(e=>e.data.data);
    }
}