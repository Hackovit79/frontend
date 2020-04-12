import {User} from './user'

export class Meetup {
    id:string;
    user:string = null;
    title:string = "";
    description:string= "";
    img:any = "";
    links: link[] = [];
    start:Date = null;
    end:Date = null;
    categories:string[] = [];
    subcategories:string[] = [];
    isLive:boolean = false;
    has_img:Boolean;
    constructor() {
        this["@type"] = "Meetup"
      }
}

export class link{
    platform:string;
    url:string;
}
