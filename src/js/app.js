import {writable} from "svelte/store"

export class app{
    constructor(name,defaultData=[]){
        this.name = name;
        if(Array.isArray(defaultData)){
            this._data = writable(defaultData,()=>!this.isExistSave?localStorage.setItem(name,defaultData):"")
            this.update.subscribe(e=>{localStorage.setItem(name,e)})
        }
    }
    get length(){
        return this.data.length;
    }
    get data(){
        return JSON.parse(localStorage.getItem(this.name))
    }
    set data(data){
        localStorage.setItem(this.name,data);
        this._data.update(_=>data);
    }
    get item(){
        return (id)=>this.data.filter(e=>e.id===id);
    }
    set item(data){
        let {name,description} = data;
        let all = this.data;
        console.log(all.map(e=>{
            let {name:n,description:d} = e;
            if(name===n&&description===d){
                e.name = name;
                e.description = description;
                return e;
            }
        }))
        all.push({name,description,date:new Date(),id:this.length})
        localStorage.setItem(this.name,all);
        this._data.update(_=>all);
    }
    get update(){
        return (fn)=>this._data.subscribe(fn);
    }
    get isExistSave(){
        return localStorage.getItem(this.name);
    }
}