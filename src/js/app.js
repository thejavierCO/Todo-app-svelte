export class app{
    constructor(tasks=[]){
        if(!Array.isArray(tasks))throw {error:"require array"};
        tasks = JSON.stringify(tasks);
        if(!this.existSave)localStorage.setItem("tasks",tasks);
    }
    getTask(name){
        if(this.existSave){
            let [task] = this.tasks.filter(e=>e.name==name);
            if(task&&task.name){
                return this.tasks.filter(e=>e.name==name);
            }else{
                throw {error:"not exist task"}
            }
        }else throw {error:"not exist save"}
    }
    delTask(name){
        let [task] = this.getTask(name);
        let result = JSON.stringify(this.tasks.filter(e=>e.name!==task.name));
        localStorage.setItem("tasks",result);
        return result;
    }
    putTask(name,description){
        let [task] = this.getTask(name);
        let result = JSON.stringify(this.tasks.filter(e=>e.name!==task.name));
        result.push({name,description})
        localStorage.setItem("tasks",result);
        return result
    }
    setTask(name,description="not description"){
        try{
            if(typeof name === "undefined")throw {error:"not defined name"}
            let [task] = this.getTask(name);
            if(task&&task.name)throw {error:"exist task"}
        }catch(err){
            if(err.error&&err.error === "not exist task"){
                let tasks = this.tasks;
                if(typeof description !== "string")description = new String(description);
                tasks.push({name,description,time:new Date(),id:this.length});
                localStorage.setItem("tasks",JSON.stringify(tasks))
                return tasks;
            }else if(err.error){
                throw err.error;
            }else{
                throw {error:err,status:"check"}
            }
        }
    }
    get tasks(){
        if(this.existSave)return JSON.parse(localStorage.getItem("tasks"))
        else throw {error:"not exist save"}
    }
    get length(){
        if(this.existSave)return this.tasks.length;
        else throw {error:"not exist save"}
    }
    get existSave(){
        return localStorage.getItem("tasks")!==null;
    }
}