import {writable,readable,derived,get} from "svelte/store";
import {v4} from "uuid"

const eventLogin = ()=>{
    let {subscribe,update,set} = writable(false);
    return {
        subscribe,
        force:(data)=>{
            if(typeof data === "boolean"){
                set(data)
            }else{
                console.warn("not is boolean")
            }
        }
    }
}

const createStorage = ()=>{
    let {subscribe,update,set} = writable([]);
    return {
        subscribe,
        push:(data)=>update(e=>{
            data.id = v4();
            e.push(data);
            return e;
        }),
        pop:(id)=>update(e=>e.filter(e=>e.id!==id))
    }
}

export const login = eventLogin();

export const tasks = createStorage();