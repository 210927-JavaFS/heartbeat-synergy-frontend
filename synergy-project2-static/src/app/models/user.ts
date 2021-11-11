import { UserImage } from "./user-image";

export class User {

    constructor(public userId:number, public username:string, public password:string, public firstName:string, public lastName:string, 
        public profileDescription:string, public playlist:string, public anthem:string, 
        public topArtists:any[], public topGenres:any[], public images:UserImage[]){}
}
