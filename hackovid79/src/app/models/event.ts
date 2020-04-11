import {User} from './user'

export interface Meetup {
    id:number,
    user:User,
    title:string,
    description:string,
    avatar:string,
    links: link[],
    start:Date,
    end:Date,
    categories:string[],
    subcategories:string[],
    isLive:boolean;
}

export interface link{
    platform:string,
    url:string,
}
