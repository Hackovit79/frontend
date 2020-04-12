import {User} from './user'

export class Meetup {
    id:string;
    user:User = null;
    title:string = "";
    description:string= "";
    avatar:string = "";
    links: link[] = [];
    start:Date = null;
    end:Date = null;
    categories:string[] = [];
    subcategories:string[] = [];
    isLive:boolean = false;
    constructor() {
        this["@type"] = "Meetup"
      }
}

export class link{
    platform:string;
    url:string;
}
