import {v4} from "uuid"

export class obs extends EventTarget{
    /**
     * @param {string|number} id 
     */
    constructor(id){
        super();
        this._id = id||v4();
        this._obs = [];
    }
    /**
     * set event in storage
     * @param {string} event name event
     * @param {Function} fn run function in call
     */
    on(event,fn){
        if(fn){
            this.addEventListener(event,({detail})=>fn(detail));
        }else{
            return new Promise((res,rej)=>{this.addEventListener(event,({detail})=>res(detail))})
        }
    }
    /**
     * @param {string} event 
     * @param {any} data 
     */
    call(event,data){
        if(data){
            this.dispatchEvent(new CustomEvent(event,{detail:data}))
        }else{
            this.dispatchEvent(new Event(event))
        }
    }
    /**
     * @returns {string}
     */
    get id(){
        return this._id;
    }
}

export class item extends obs{
    constructor(data){
        super("item_"+v4());
        this.data = data;
    }
}