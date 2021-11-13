export class UserImage {
    constructor(public imageId:number, public name:string, public type:string, public picByte:any){}

    getImageString(): string{
        return 'data:image/png;base64,'+this.picByte;

    }
}