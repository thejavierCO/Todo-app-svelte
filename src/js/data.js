export class observer{
    constructor(start){
        this.end = ()=>{}
        if(typeof start === "function")this.end = start(this);
        this.obs = [];
    }
    add(el){
        let id = this.obs.length;
        el.id = id;
        if(el.type==="function"){
            return this.obs.push(el);
        }else if(el.type==="object"){
            let {call} = el.call;
            if(call){el.call = call;el.type = "function";
            }else console.error({error:"not exist call function in\n",element:el.call});
        }else if(el.type==="class"){
            let {call} = new el.call(this);
            if(call){el.call = call;el.type = "function";
            }else console.error({error:"not exist call function in\n",element:el.call})
        }else console.error({error:`not process type ${el.type}`,element:el.call});
        this.obs.push(el);
    }
    /**
     * @param {Function|Object} c callback
     */
    subscribe(c){
        this.add({
            call:c,
            type:/(class)/i.test(c)?"class":Array.isArray(c)?"array":typeof c
        });
        return ()=>this.unsubscribe(id);
    }
    /**
     * @param {number} c id
     */
    unsubscribe(c){
        this.obs = this.obs.filter(obs=>obs.id!==c);
        if(typeof this.end === "function")this.end(this);
    }
    /**
     * @param {any} value send data
     */
    call(value){
        this.obs.forEach(e=>{
            if(e.type==="function")e.call(value)
            else{
                console.warn(`not process element`,e);
                this.unsubscribe(e.id)
            }
        })
    }
}

export class Data extends observer{
    constructor(data,start){
        super();
        this._value = data;
        if(typeof start === "function")this.end = start({value:this.value});
    }
    get value(){
        return this._value;
    }
    set value(data){
        try{
            if(typeof data === "function")this._value = data(this.value);
            else this._value = data;
            this.call(this.value);
        }catch(error){
            this.call({error,info:{value:this.value,data}})
        }
    }
    get change(){
        return (f)=>{this.subscribe(f);return this;};
    }
}

export class Storage{
    constructor(model){
        this._model = model||Data;
        this._data = [];
    }
    add(key,data=undefined){
        if(data instanceof this._model){
            this.get(key)===undefined?this._data.push({[key]:data,id:this._data.length}):null;
        }else{
            this.get(key)===undefined?this._data.push({[key]:new this._model(data),id:this._data.length}):null;
        }
        return this;
    }
    get(key){
        let data = this._data.filter(e=>e[key]?true:false)
        if(data.length>=1)return data[0][key];
        return undefined;
    }
    put(key,data){
        if(typeof data === "function"){
            let element = this.get(key);
            return element.value = data(element);
        }else{
            throw {error:"require function"}
        }
    }
    get length(){
        return this._data.length;
    }
}

export class App extends Storage{
    constructor(id,start,model){
        super(model)
        this.id = id;
        this.add(id,new this._model([],start))
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