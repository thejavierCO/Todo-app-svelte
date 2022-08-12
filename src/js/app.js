import {Storage,Store} from "./data"

export class App extends Storage{
    constructor(id,start){
        super();
        this.name = id;
        if(!this.isExistSave) this.save = [];
        this._data = new this._model(this.save,start);
        this._data.subscribe(e=>{this.save = e})
    }
    get update(){
        return (f)=>this._data.subscribe(f);
    }
    get length(){
        return this._data.value.length;
    }
    get data(){
        return this._data.value;
    }
    set data(data){
        this._data.update(_=>data);
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

    set save(data){
        if(Array.isArray(data))localStorage.setItem(this.name,JSON.stringify(data));
        else if(typeof data === "string")localStorage.setItem(this.name,data);
        else localStorage.setItem(this.name,new String(data));
    }
    get save(){
        return JSON.parse(localStorage.getItem(this.name));
    }
    
    get isExistSave(){
        return this.save!==null;
    }
}

export class TaskApp extends Store{}