import {login} from "./app"
import {showConnect,AppConfig,UserSession} from "@stacks/connect";
import {Profile} from "@stacks/profile";
import {Storage as Sg} from "@stacks/storage";
let {force} = login;


class File{
    constructor(name,data,storage){
        this.ctrl = storage;
        this.name = name;
        this._data = undefined;
        storage.getFile(this.name)
        .then(e=>{storage.putFile(name,data)})
        .catch(e=>storage.putFile(name,data))
        .then(e=>{this.storage = storage})
    }
    get data(){
        return this._data;
    }
    set data(data){
        this._data = data;
        this.storage.putFile(this.name,data);
    }
}

export class Storage extends Sg{
    async Files(){
        let files = [];
        return await this.listFiles(e=>{files.push(e);return true}).then(e=>files);
    }
    async File(name,data){
        return new File(name,data,this)
    }
    async Del(name){
        return this.deleteFile(name)
    }
}

/**
 * factory auth config
 */
export class AuthConfig{
    /**
     * @param {{
     *      appDetails:{
     *          name:string,
     *          icon:string
     *      },
     *      redirectTo:string,
     *      finished:()=>void,
     *      userSession:UserSession
     * }} config 
     */
    constructor(config){
        let {
            appDetails = {
                name:"my-app",
                icon:window.location.origin+"/icon.svg"
            },
            redirectTo = "/",
            finished = ()=>window.location.reload(),
            userSession = new UserSession()
        } = config;
        this.appDetails = appDetails;
        this.redirectTo = redirectTo;
        this.finished = finished;
        this.userSession = userSession;
    }
}
/**
 * factory Auth
 */
export class Auth{
    /**
     * @param {App} app 
     */
    constructor(app){
        let {icon,name,userSession} = app;
        this.AuthConfig = new AuthConfig({
            appDetails:{name,icon},
            userSession,
            finished:()=>force(true)
        });
        this.userSession = userSession;
        force(this.islogin);
    }
    login(){
        showConnect(this.AuthConfig)
    }
    exit(){
        this.userSession.signUserOut();
        force(this.islogin);
    }
    get islogin(){
        return this.userSession.isUserSignedIn();
    }
    get pendingLogin(){
        return this.userSession.isSignInPending();
    }
    get user(){
        return this.userSession.loadUserData();
    }
    get profile(){
        return new Profile(this.user.profile)
    }
    get Storage(){
        return new Storage({userSession:this.userSession})
    }
}
/**
 * factory app
 */
export class App extends AppConfig{
    constructor(name,icon){
        super(['store_write', 'publish_data']);
        this.name = name;
        this.icon = icon||`${window.location.origin}/icon.svg`;
        this.userSession = new UserSession({appConfig:this})
    }
    get auth(){return new Auth(this)}
}