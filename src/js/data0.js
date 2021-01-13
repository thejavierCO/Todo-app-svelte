import {v4} from "uuid"

export class obs{
    /**
     * @param {string|number} id 
     */
    constructor(id){
        this._id = id;
        this._obs = [];
    }
    /**
     * @param {any} data 
     */
    call(data){
        this._obs.forEach(e=>e(data,this.id))
    }
    get id(){
        return this._id;
    }
    get change(){
        return (fn)=>this.change = fn;
    }
    set change(data){
        if(typeof data === "function")this._obs.push(data);
        else throw {error:"require fn"}
    }
}

export class item extends obs{
    constructor(id,data){
        super(id);
        this.data = data;
    }
    get type(){
        if(Array.isArray(this._data))return "array"
        else if(typeof this._data === "object")return "object"
        else return typeof this._data;
    }
    get data(){
        return this._data;
    }
    get length(){
        if(this.type === "array"||this.type === "string"){
            return this._data.length
        }else{
            return new String(this._data).length;
        }
    }
    set data(data){
        const before = this._data;
        if(Array.isArray(data)){
            this._data = data.map(e=>{
                if(e instanceof item)return e;
                else return new item(v4(),e)
            })
        }else if(typeof data === "function")this._data = data(this._data);
        else this._data = data;
        this.call(this._data,before);
    }
    call(data,before){this._obs.forEach(e=>e(data,before,this._id))}
}

export class Storage extends item{
    constructor(id){
        super("home",[]);
        if(id)this._id = id;
    }
    pop(id){
        if(typeof id === "string"||typeof id === "number")return this.data = this.data.filter(e=>e.id===id);
        else{
            let {id} = this.data.pop();
            this.data = this.data.filter(e=>e.id===id)
            return this.data;
        }
    }
    get(posicion){
        if(typeof posicion === "number"){
            return [this.data[posicion]];
        }else if(typeof posicion === "string"){
            let data = this.data.filter(e=>e.id===posicion)
            if(data.length>0)return data;
            else return  undefined;
        }
    }
    push(data){
        const last = this.data;
        let init = new item(v4(),data);
        last.push(init);
        this.data = last;
        return init;
    }
    call(data){
        this._obs.forEach(e=>{
            e(data,this._id)
        })
        return this;
    }
    json(data){
        if(data)return JSON.stringify(data)
        return JSON.stringify(this.data.map(e=>e.data))
    }
    get ids(){return this.data.map(e=>e.id)}
}

export class StorageLocal extends Storage{
    constructor(){
        super("local");
        this.change = (data)=>data.forEach(e=>e.change = (data,defore,id)=>{localStorage.setItem(id,this.json(e.data))})
    }
    push(data){
        let item = super.push(data);
        if(typeof item === "object"||Array.isArray(item)){
            localStorage.setItem(item.id,this.json(data));
        }else{
            localStorage.setItem(item.id,new String(data));
        }
    }
}

export class StorageSession extends Storage{
    constructor(){
        super("session");
        this.change = (data)=>data.forEach(e=>e.change = (data,defore,id)=>{sessionStorage.setItem(id,this.json(e.data))})
    }
    push(data){
        let item = super.push(data);
        if(typeof item === "object"||Array.isArray(item)){
            sessionStorage.setItem(item.id,this.json(data));
        }else{
            sessionStorage.setItem(item.id,new String(data));
        }
    }
}