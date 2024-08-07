
export interface MetaData {
    id: string;
    rarity: number;
    google_drive_id: string;
    meta: {
        name: string;
        attributes: Array<{
            trait_type: string;
            value: string;
        }>;
    };
}
export var filtes:filer[] = [{names:"female grey" , cate:[]}, {names:"female white" , cate:[]}, {names:"male grey" , cate:[]},{names:"male white" , cate:[]}];


export interface TraitsData {
    [key: string]: string[];
}

export interface  filer {
    names:string;
    cate:categoriey[]
}

interface categoriey {
    name:string
    trats:string[]
}
export interface collection{
    name:string;
    supply:number;
    configurations:configuration[];
}

export interface configuration{
    name:string;
    categories:categoriy[]
}

export interface categoriy{
    name:string;
    operation: string
    traits:trait[]
}

export interface trait{
    name:string;
    count:number;
    id:string
}