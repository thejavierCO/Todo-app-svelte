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
    constructor(id,model){
        super(model);
        this.id = id;
    }
    get update(){
        return (f)=>this.get(this.id).change(f);
    }
    get length(){
        return this.get(this.id).value.length;
    }
    get data(){
        return this.get(this.id).value;
    }
    set data(data){
        this.put(this.id,_=>data)
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
        if(!exist){
            all.push({name,description,id,date:new Date()})
        }
        this.data = all;
    }
}