import {writable,get} from "svelte/store";
import { v4 } from "uuid";

function constantPositive(number,max){
    if(number&&max&&typeof number === "number"&&typeof max === "number"){
        number = parseInt(number)
        if(number<0)return max-(-number);
        else return number;
    }else if(number===0)return 0;else throw {error:"require number"}
}

export class item{
    constructor(data,id){
        this.id = id||v4();
        this._data = writable(data)
    }
    change(fn){
        return this.data.subscribe(fn)
    }
    update(fn){
        return this.data.update(fn)
    }
    get data(){
        return get(this._data);
    }
    set data(data){
        this._data.set(data);
    }
}

export class Storage extends item{
    constructor(){super([],"home")}
    push(data){
        this._data.update(e=>{e.push(new item(data));return e;});
        return this;
    }
    pop(id){
        const get = this.data;
        if(id){
            const data = get.filter(({id:posicion})=>posicion!==this.get(id,true));
            if(data.length===this.data.length)throw {error:"not exist"}
            else this.data = data;
        }else{
            get.pop();
            this.data = get;
        }
        return this;
    }
    get(id,onlyid=false){
        if(typeof id === "string"||typeof id === "number"){
            if(typeof id === "number"){
                id = constantPositive(id,this.data.length)
            }
            const getid = this.ids.filter((a,b)=>a===id||b===id)
            if(getid.length>0){
                if(typeof id === "number"&&onlyid===true){
                    return getid[0]
                }else if(typeof id === "string"&&onlyid===true){
                    return getid[0]
                }
                return this.data.filter(e=>e.id===getid[0]).map(e=>e.data)[0];
            }else{
                return null;
            }
        }else{
            throw {error:"require string or number"}
        }
    }
    get ids(){
        return this.data.map(e=>e.id);
    }
}