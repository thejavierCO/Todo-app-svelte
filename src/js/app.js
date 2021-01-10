import {Data,Storage} from "./data"

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
        try{
            return JSON.parse(localStorage.getItem(this.key))
        }catch(err){
            if(/(Unexpected token \/ in JSON at position)/i.test(err.message)){
                return localStorage.getItem(this.key)
            }else{
                throw {error:err}
            }
        }
    }
    set save(data){
        try{
            if(typeof data === "object"||Array.isArray(data)){
                localStorage.setItem(this.key,JSON.stringify(data));
            }else if(typeof data === "function"){
                localStorage.setItem(this.key,data(this));
            }else{
                localStorage.setItem(this.key,data);
            }
        }catch(err){
            console.warn(err);
        }
    }
}

export class App extends Storage{
    set id(id){
        if(typeof id === "string"){
            this._id = id;
            this.add(id,[])
        }
    }
    get id(){
        return this._id;
    }
    get update(){
        return (f)=>this.get(this.id).change(f);
    }
    get length(){
        if(this.id)return this.get(this.id).value.length;
        else throw {error:"not defined id"}
    }
    get data(){
        if(this.id)return this.get(this.id).value;
        else throw {error:"not defined id"}
    }
    set data(data){
        if(this.id)return this.put(this.id,_=>data);
        else throw {error:"not defined id"}
    }
    get item(){
        return (id)=>this.data.filter(e=>e.id===id)
    }
    set item(data){
        let {name,description,id=this.length} = data;
        id = parseInt(id);
        let all = this.data;
        let exist = false;
        all.map(e=>id===e.id?
        ((task)=>{
            if(name!=="")task.name = name;
            if(description!=="")task.description = description;
            exist = true;
            return e;
        })(e):e)
        if(!exist)all.push({name,description,id,date:new Date()})
        this.data = all;
    }
}