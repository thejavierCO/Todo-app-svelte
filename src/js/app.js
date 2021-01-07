import {Data} from "./data"

export class UselocalStorage extends Data{
    /**
     * @param {any} data add default data
     * @param {(data:UselocalStorage)=>()=>any} start initial function and return end message
     * @param {{
     *      key:string
     * }} options config
     */
    constructor(data,start,options){
        super(data,start);
        this.end = ()=>console.log("end");
        this.key = "data";
        if(typeof options === "object"&&!Array.isArray(options)){
            let {key} = options;
            if(typeof key === "string")this.key = key;
        }
        if(this.isExistItem)this._value = this.save;
        else this.save = data;
        this.change(e=>this.save = e)
    }
    get isExistItem(){
        return this.save===null?false:true;
    }
    get save(){
        return JSON.parse(localStorage.getItem(this.key))
    }
    set save(data){
        if(typeof data === "object"||Array.isArray(data)){
            localStorage.setItem(this.key,JSON.stringify(data));
        }else if(typeof data === "function"){
            localStorage.setItem(this.key,data(this));
        }else{
            localStorage.setItem(this.key,data);
        }
    }
}

export class App{
    constructor(id,start,model){
        this.name = id;
        this._model = model;
        this._data = new this._model([],start);
    }
    get update(){
        return (f)=>this._data.change(f);
    }
    get length(){
        return this._data.value.length;
    }
    get data(){
        return this._data.value;
    }
    set data(data){
        this._data.value = data;
    }
    get item(){
        return (id)=>this._data.value.filter(e=>e.id===id)
    }
    set item(data){
        let {name,description,id=this.length} = data;
        id = parseInt(id);
        let all = this._data.value;
        let exist = false;
        all.map(e=>id===e.id?
        ((task)=>{
            if(name!=="")task.name = name;
            if(description!=="")task.description = description;
            exist = true;
            return e;
        })(e):
        ((task)=>task)(e))
        if(!exist){
            all.push({name,description,id,date:new Date()})
        }
        this.data = all;
    }
}