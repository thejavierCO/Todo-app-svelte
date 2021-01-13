import {v4} from "uuid";

function constantPositive(number,max){
    if(number&&max&&typeof number === "number"&&typeof max === "number"){
        number = parseInt(number)
        if(number<0)return max-(-number);
        else return number;
    }else if(number===0)return 0;else throw {error:"require number"}
}

export class item extends EventTarget{
    constructor(data,update){
        super();
        this._data = data;
        if(typeof update === "function")this.on("update",update);
    }
    on(event,fn){this.addEventListener(event,({detail,currentTarget})=>fn(currentTarget,detail));return this}
    call(event,data){this.dispatchEvent(new CustomEvent(event,{detail:data}));return this;}
    get data(){return this._data}
    set data(data){this.call("update",data);this._data = data}
}

export class Storage{
    constructor(fn){
        this._data = new item([],fn);
    }
    push(data){
        const get = this.data;
        let obj = new item(data);
        get.push({data:obj,id:v4()})
        this.data = get;
        return [
            (a)=>obj.on("update",a),
            (a)=>obj.data = a(obj.data)
        ];
    }
    pop(id){
        const get = this.data;
        if(id){
            this.data = get.filter(({id:posicion})=>posicion!==this.get(id,true));
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
        return this._data.data.map(e=>e.id);
    }
    get data(){
        return this._data.data;
    }
    set data(data){
        this._data.data = data;
    }
}