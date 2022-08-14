import {writable,readable,get,derived} from "svelte/store"

export class Store extends EventTarget{
    constructor(data){
        super();
        this._data = writable([],(set)=>{
            if(Array.isArray(data))set(data);
            else if(typeof data !== undefined) Error("require array");
        });
        this._data.subscribe((a)=>{this.emit("change",a)})
    }
    get data(){
        return get(this._data)
    }
    set data(a){
        this._data.set(a)
    }
    add(item){
        this._data.update((data)=>{data.push(item);return data;})
    }
    on(evt,fn){this.addEventListener(evt,fn);}
    emit(evt,data){this.dispatchEvent(new CustomEvent(evt,{detail:data}))}
}