import {writable,readable,get,derived} from "svelte/store"

export class observer extends readable{
    constructor(start){
        super();
        if(typeof start === "function")this.obs = writable([],start);
        else this.obs = writable([])
    }
    /**
     * @param {Function} c callback
     */
    subscribe(c){
        let id = this.obs.length;
        this.obs.push({call:c,id});
        return ()=>this.unsubscribe(id);
    }
    /**
     * @param {number} c id
     */
    unsubscribe(c){
        this.obs = this.obs.filter(obs=>obs.id!==c);
        if(typeof this.end === "function")this.end(this);
    }
    call(){
        this.obs.forEach(e=>e.call(this.value))
    }
}

export class Data extends observer{
    constructor(data,start){
        super();
        this._value = data;
        if(typeof start === "function")this.end = start(this.value);
    }
    update(data){
        if(typeof data === "function"){
            this._value = data(this.value);
            this.call();
        }
        return this._value;
    }
    get value(){
        return this._value;
    }
    get change(){
        return (f)=>{
            this.subscribe(f);
            return this;
        };
    }
}

export class Storage{
    constructor(){
        this._data = [];
        this._model = Data;
    }
    use(model){
        this._model = model;
    }
    add(key,data=undefined){
        if(data instanceof this._model){
            this.get(key)===undefined?this._data.push({[key]:data,id:this.data.length}):null;
        }else{
            this.get(key)===undefined?this._data.push({[key]:new this._model(data),id:this.data.length}):null;
        }
        return this;
    }
    get(key){
        let data = this.data.filter(e=>e[key]?true:false)
        if(data.length>=1)return data[0][key];
        else return undefined;
    }
    put(key,data){
        if(typeof data === "function"){
            let element = this.get(key);
            return element.update(data);
        }else{
            throw {error:"require function"}
        }
    }
}

export class Store extends EventTarget{
    constructor(data){
        super();
        this._data = writable([]);
        this._data.subscribe((a)=>{
            this.dispatchEvent(new CustomEvent("change",{detail:a}))
        })
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
}