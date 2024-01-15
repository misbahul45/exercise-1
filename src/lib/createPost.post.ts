import { IsNotEmpty } from "class-validator";

export class CreatePost{
    @IsNotEmpty()
    title:string;
    body:string;
}