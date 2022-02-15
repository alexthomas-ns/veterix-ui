import ky, {ResponsePromise} from 'ky'
const client = ky.create({headers:{accept:"application/prs.hal-forms+json"},prefixUrl:"http://localhost:8080"})

function  internalGet(url:string):ResponsePromise{
    return  client.get(url);
}

export function get<T extends Linked>(url: string):LinkedResponse<T>{
    return new LinkedResponse<T>(()=>internalGet(url).json<T>());
}

export function fromEntity<T>(entity:T):LinkedResponse<T>{
    return new LinkedResponse<T>(()=>Promise.resolve().then(()=>entity))
}

function applyTemplate(link:Link,params:object):string{
    let href = link.href;
    if(!link.templated){
        return href;
    }
    const expectedParams =new Set<string>();
    for (const match of href.matchAll(/{([\w-]+)}/g)){
        expectedParams.add(match[1]);
    }
    if(expectedParams.size===0){
        console.warn(`reference marked as templated but no variables found in href 👀. ${href}`)
        return href;
    }
    if(!params){
        throw `when expanding reference template params were ${params}, a value was expected`
    }
    Object.keys(params).forEach(expectedParams.delete)
    if(expectedParams.size>0){
        throw `Params missing ${expectedParams}`
    }
    for(const key in params){
        href = href.replaceAll(`{${key}}`,params[key])
    }

}

export class LinkedResponse<T extends Linked&Embeddible> {
    constructor(private _fetch:()=>Promise<T>){}
    private _instance:T;
    private pendingLocks = [];
    private loading = false;
    private async ensureRequest (){
        if(this.loading){
            const lock = new Promise((res,rej)=>this.pendingLocks.push(res));
            await lock;
        }
        if(!this._instance){
            this.loading=true;
            await this.loadInstance();
            this.loading=false;
            this.pendingLocks.forEach(lock=>lock());
            this.pendingLocks.splice(0);
        }
    }

    private async loadInstance(){
        this._instance = await this._fetch();
    }

    public async getLinks(uncached?:boolean):Promise<T['links']&T['_links']>{
        if(uncached){
            await this.loadInstance();
        }else {
            await this.ensureRequest()
        }
        if(this._instance._links){
            return this._instance._links;
        }
        if(this._instance.links){
            return this._instance.links;
        }
       throw "Unable to find links"
    }

    public async getData(uncached?:boolean):Promise<Readonly<Omit<T, "links"|"_links"|'_embedded'>>> {
        if(uncached){
            await this.loadInstance();
        } else{
            await this.ensureRequest();
        }
        if(this._instance._embedded){
            return this._instance._embedded;
        }
        return this._instance;
    }

    private async resolveReference<M extends Linked>(reference:keyof T["links"]|keyof T['_links'],params?:object):Promise<string>{
        await this.ensureRequest()
        const links = await this.getLinks();
        if(!links[reference]){
            throw `${reference} is not a valid link. Please choose from ${Object.keys(links)}`
        }
        let url = applyTemplate(links[reference],params);
        if(url.startsWith("/")) {
            url = url.substring(1);
        }
        return url;
    }

    public getReference<M extends Linked>(reference:keyof T["links"]|keyof T['_links']):LinkedResponse<M>{
       return new LinkedResponse<M>(()=>this.resolveReference(reference).then(url=>internalGet(url).json<M>()) )
    }

    public async putReference<M> (reference:keyof T["links"]|keyof T['_links'],value:object,params?:object):Promise<M>{
       const putUrl = await this.resolveReference(reference,params);
        return await client.put(putUrl, {json: value}).json<M>();
    }

    public async postReference<M> (reference:keyof T["links"]|keyof T['_links'],value:object,params?:object):Promise<M>{
        const postUrl = await this.resolveReference(reference,params);
        return await client.post(postUrl, {json: value}).json<M>();
    }
}

export interface Link {
    href:string;
    templated?:boolean;
}
type Links = {[key:string]:Link};
export type Linked = {links?:Links} & {_links?:Links}


interface Embeddible{
    _embedded?:never
}