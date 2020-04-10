import {User} from './user'

export interface Meetup {
    id:number,
    user:User,
    title:string,
    description:string,
    img:string,
    links: link[],
    start:Date,
    end:Date,
    categories:string[],
    subcategories:string[],
}

export interface link{
    platform:string,
    url:string,
}
